import {
  Candidate,
  CandidateStatus,
  Feedback,
  Job,
  Prisma,
  Recruiter,
  Stage,
} from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import {
  buildCandidateStatusWhere,
  CandidateStatusFilter,
} from '../constants/candidateStatus.js';
import { calculateSlaStatus } from '../constants/sla.js';
import { getStageLabel, parseStage, TERMINAL_STAGES } from '../constants/stages.js';
import { assertRecruiterActiveForAssignment } from './recruiterService.js';

type CandidateWithRelations = Candidate & {
  job: Job;
  feedback: Feedback[];
  recruiter: Recruiter | null;
};

export type CandidateResponse = ReturnType<typeof formatCandidate>;

function formatCandidate(candidate: CandidateWithRelations) {
  const sla = calculateSlaStatus(candidate.currentStage, candidate.stageEnteredAt);
  const hasFeedbackForCurrentStage = candidate.feedback.some(
    (item) => item.stage === candidate.currentStage,
  );

  return {
    id: candidate.id,
    name: candidate.name,
    email: candidate.email,
    role: candidate.role,
    stage: getStageLabel(candidate.currentStage),
    currentStage: candidate.currentStage,
    recruiter: candidate.recruiter?.name ?? 'Unassigned',
    recruiterId: candidate.recruiterId,
    job: {
      id: candidate.job.id,
      title: candidate.job.title,
      department: candidate.job.department,
    },
    stageEnteredAt: candidate.stageEnteredAt,
    daysInStage: sla.daysInStage,
    slaStatus: sla.status,
    slaTarget: sla.slaTarget,
    daysRemaining: sla.daysRemaining,
    overdueDays: sla.overdueDays,
    hasPendingFeedback: !TERMINAL_STAGES.includes(candidate.currentStage) && !hasFeedbackForCurrentStage,
    status: candidate.status,
    statusTag: candidate.statusTag,
    createdAt: candidate.createdAt,
    updatedAt: candidate.updatedAt,
  };
}

const CANDIDATE_STATUS_VALUES = new Set<string>(Object.values(CandidateStatus));

function parseCandidateStatus(value: string): CandidateStatus | null {
  return CANDIDATE_STATUS_VALUES.has(value) ? (value as CandidateStatus) : null;
}

const candidateInclude = {
  job: true,
  feedback: true,
  recruiter: true,
} satisfies Prisma.CandidateInclude;

export async function listCandidates(statusFilter: CandidateStatusFilter = 'active') {
  const candidates = await prisma.candidate.findMany({
    where: buildCandidateStatusWhere(statusFilter),
    include: candidateInclude,
    orderBy: { updatedAt: 'desc' },
  });

  return candidates.map(formatCandidate);
}

export async function getCandidateById(id: string) {
  const candidate = await prisma.candidate.findUnique({
    where: { id },
    include: {
      ...candidateInclude,
      stageHistory: { orderBy: { movedAt: 'desc' } },
    },
  });

  if (!candidate) {
    return null;
  }

  return {
    ...formatCandidate(candidate),
    stageHistory: candidate.stageHistory.map((entry) => ({
      id: entry.id,
      fromStage: entry.fromStage ? getStageLabel(entry.fromStage) : null,
      toStage: getStageLabel(entry.toStage),
      movedAt: entry.movedAt,
      notes: entry.notes,
    })),
    feedback: candidate.feedback
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())
      .map((item) => ({
        id: item.id,
        stage: getStageLabel(item.stage),
        interviewerName: item.interviewerName,
        rating: item.rating,
        content: item.content,
        submittedAt: item.submittedAt,
      })),
  };
}

export async function createCandidate(data: {
  name: string;
  email?: string;
  role: string;
  recruiterId?: string;
  jobId?: string;
  stage?: Stage | string;
}) {
  let jobId = data.jobId;
  if (!jobId) {
    const defaultJob = await prisma.job.findFirst({ orderBy: { createdAt: 'asc' } });
    if (!defaultJob) {
      throw new AppError(400, 'No jobs available. Seed the database first.');
    }
    jobId = defaultJob.id;
  } else {
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new AppError(404, 'Job not found');
    }
  }

  await assertRecruiterActiveForAssignment(data.recruiterId);

  const stage =
    typeof data.stage === 'string'
      ? parseStage(data.stage) ?? Stage.FOUND
      : (data.stage ?? Stage.FOUND);

  const candidate = await prisma.candidate.create({
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      recruiterId: data.recruiterId ?? null,
      jobId,
      currentStage: stage,
      stageEnteredAt: new Date(),
      stageHistory: {
        create: {
          fromStage: null,
          toStage: stage,
          notes: 'Candidate created',
        },
      },
    },
    include: candidateInclude,
  });

  return formatCandidate(candidate);
}

export async function updateCandidate(
  id: string,
  data: {
    name?: string;
    email?: string | null;
    role?: string;
    recruiterId?: string | null;
    jobId?: string;
    stage?: Stage | string;
    status?: CandidateStatus | string;
    statusTag?: string | null;
  },
) {
  const existing = await prisma.candidate.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(404, 'Candidate not found');
  }

  if (data.jobId) {
    const job = await prisma.job.findUnique({ where: { id: data.jobId } });
    if (!job) {
      throw new AppError(404, 'Job not found');
    }
  }

  if (data.recruiterId !== undefined && data.recruiterId !== existing.recruiterId) {
    await assertRecruiterActiveForAssignment(data.recruiterId);
  }

  const stage =
    data.stage === undefined
      ? undefined
      : typeof data.stage === 'string'
        ? parseStage(data.stage)
        : data.stage;

  if (data.stage !== undefined && !stage) {
    throw new AppError(400, `Invalid stage: ${data.stage}`);
  }

  let resolvedStatus: CandidateStatus | undefined;
  if (data.status !== undefined) {
    const parsedStatus =
      typeof data.status === 'string' ? parseCandidateStatus(data.status) : data.status;
    if (!parsedStatus) {
      throw new AppError(400, `Invalid status: ${data.status}`);
    }
    resolvedStatus = parsedStatus;
  }

  const candidate = await prisma.$transaction(async (tx) => {
    if (stage && stage !== existing.currentStage) {
      await tx.stageHistory.create({
        data: {
          candidateId: id,
          fromStage: existing.currentStage,
          toStage: stage,
          notes: 'Updated via candidate edit',
        },
      });
    }

    return tx.candidate.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        recruiterId: data.recruiterId,
        jobId: data.jobId,
        ...(stage
          ? {
              currentStage: stage,
              stageEnteredAt: new Date(),
            }
          : {}),
        ...(resolvedStatus !== undefined ? { status: resolvedStatus } : {}),
        ...(data.statusTag !== undefined ? { statusTag: data.statusTag } : {}),
      },
      include: candidateInclude,
    });
  });

  return formatCandidate(candidate);
}

export async function deleteCandidate(id: string) {
  const existing = await prisma.candidate.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(404, 'Candidate not found');
  }

  await prisma.candidate.delete({ where: { id } });
  return { success: true };
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
