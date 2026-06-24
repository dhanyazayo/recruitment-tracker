import { Candidate, CandidateStatus, Prisma, Recruiter, RecruiterRole, RecruiterStatus, Stage } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { calculateSlaStatus } from '../constants/sla.js';
import {
  getRecruiterRoleLabel,
  getRecruiterStatusLabel,
  parseRecruiterRole,
  parseRecruiterStatus,
} from '../constants/recruiterRoles.js';
import { AppError } from './candidateService.js';

type RecruiterWithCandidates = Recruiter & {
  candidates: Pick<Candidate, 'id' | 'currentStage' | 'stageEnteredAt' | 'status'>[];
};

function isRejectedCandidate(
  candidate: Pick<Candidate, 'currentStage' | 'status'>,
): boolean {
  return (
    candidate.status === CandidateStatus.Rejected || candidate.currentStage === Stage.REJECTED
  );
}

function computeRecruiterMetrics(
  candidates: Pick<Candidate, 'currentStage' | 'stageEnteredAt' | 'status'>[],
) {
  let activeCandidates = 0;
  let selectedCount = 0;
  let rejectedCount = 0;
  let slaOnTrack = 0;
  let slaTracked = 0;

  for (const candidate of candidates) {
    if (isRejectedCandidate(candidate)) {
      rejectedCount += 1;
    } else if (candidate.currentStage === Stage.SELECTED) {
      selectedCount += 1;
    } else {
      activeCandidates += 1;
    }

    if (isRejectedCandidate(candidate) || candidate.currentStage === Stage.SELECTED) {
      continue;
    }

    const sla = calculateSlaStatus(candidate.currentStage, candidate.stageEnteredAt);
    if (sla.status !== null) {
      slaTracked += 1;
      if (sla.status === 'on-track') {
        slaOnTrack += 1;
      }
    }
  }

  const terminalCount = selectedCount + rejectedCount;
  const conversionRate =
    terminalCount > 0 ? Math.round((selectedCount / terminalCount) * 1000) / 10 : null;

  const slaCompliancePercent =
    slaTracked > 0 ? Math.round((slaOnTrack / slaTracked) * 1000) / 10 : null;

  return {
    activeCandidates,
    selectedCount,
    conversionRate,
    slaCompliancePercent,
  };
}

function formatRecruiter(recruiter: RecruiterWithCandidates, includePhone = false) {
  const metrics = computeRecruiterMetrics(recruiter.candidates);

  return {
    id: recruiter.id,
    name: recruiter.name,
    email: recruiter.email,
    role: getRecruiterRoleLabel(recruiter.role),
    roleValue: recruiter.role,
    team: recruiter.team,
    phone: includePhone ? recruiter.phone : undefined,
    status: getRecruiterStatusLabel(recruiter.status),
    statusValue: recruiter.status,
    ...metrics,
    createdAt: recruiter.createdAt,
    updatedAt: recruiter.updatedAt,
  };
}

const recruiterInclude = {
  candidates: {
    select: {
      id: true,
      currentStage: true,
      stageEnteredAt: true,
      status: true,
    },
  },
} satisfies Prisma.RecruiterInclude;

export async function listRecruiters() {
  const recruiters = await prisma.recruiter.findMany({
    include: recruiterInclude,
    orderBy: { name: 'asc' },
  });

  return recruiters.map((recruiter) => formatRecruiter(recruiter));
}

export async function getRecruiterById(id: string) {
  const recruiter = await prisma.recruiter.findUnique({
    where: { id },
    include: {
      ...recruiterInclude,
      candidates: {
        select: {
          id: true,
          name: true,
          role: true,
          currentStage: true,
          stageEnteredAt: true,
          status: true,
        },
        orderBy: { updatedAt: 'desc' },
      },
    },
  });

  if (!recruiter) {
    return null;
  }

  const metrics = computeRecruiterMetrics(recruiter.candidates);

  return {
    ...formatRecruiter(recruiter, true),
    phone: recruiter.phone,
    candidates: recruiter.candidates
      .filter((candidate) => candidate.status !== CandidateStatus.Rejected)
      .map((c) => ({
        id: c.id,
        name: c.name,
        role: c.role,
        currentStage: c.currentStage,
      })),
    ...metrics,
  };
}

function validateEmail(email: string) {
  const trimmed = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    throw new AppError(400, 'A valid email address is required.');
  }
  return trimmed;
}

function validateName(name: string) {
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    throw new AppError(400, 'Name must be at least 2 characters.');
  }
  return trimmed;
}

export async function createRecruiter(data: {
  name: string;
  email: string;
  role: string;
  team?: string;
  phone?: string;
  status?: string;
}) {
  const name = validateName(data.name);
  const email = validateEmail(data.email);
  const role = parseRecruiterRole(data.role);
  if (!role) {
    throw new AppError(400, 'Invalid role. Choose Recruiter, Senior Recruiter, Recruiting Lead, or HR.');
  }

  const status =
    data.status === undefined
      ? RecruiterStatus.ACTIVE
      : (parseRecruiterStatus(data.status) ?? RecruiterStatus.ACTIVE);

  const existing = await prisma.recruiter.findUnique({ where: { email } });
  if (existing) {
    throw new AppError(409, 'A recruiter with this email already exists.');
  }

  const recruiter = await prisma.recruiter.create({
    data: {
      name,
      email,
      role,
      team: data.team?.trim() || null,
      phone: data.phone?.trim() || null,
      status,
    },
    include: recruiterInclude,
  });

  const formatted = formatRecruiter(recruiter, true);
  return {
    id: formatted.id,
    name: formatted.name,
    email: formatted.email,
    role: formatted.role,
    team: formatted.team,
    status: formatted.status,
    createdAt: formatted.createdAt,
  };
}

export async function updateRecruiter(
  id: string,
  data: {
    name?: string;
    email?: string;
    role?: string;
    team?: string | null;
    phone?: string | null;
    status?: string;
  },
) {
  const existing = await prisma.recruiter.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(404, 'Recruiter not found');
  }

  if (data.email) {
    const email = validateEmail(data.email);
    const duplicate = await prisma.recruiter.findFirst({
      where: { email, NOT: { id } },
    });
    if (duplicate) {
      throw new AppError(409, 'A recruiter with this email already exists.');
    }
  }

  if (data.name) {
    validateName(data.name);
  }

  let role: RecruiterRole | undefined;
  if (data.role !== undefined) {
    const parsedRole = parseRecruiterRole(data.role);
    if (!parsedRole) {
      throw new AppError(400, 'Invalid role.');
    }
    role = parsedRole;
  }

  let status: RecruiterStatus | undefined;
  if (data.status !== undefined) {
    const parsedStatus = parseRecruiterStatus(data.status);
    if (!parsedStatus) {
      throw new AppError(400, 'Invalid status.');
    }
    status = parsedStatus;
  }

  const recruiter = await prisma.recruiter.update({
    where: { id },
    data: {
      name: data.name?.trim(),
      email: data.email ? validateEmail(data.email) : undefined,
      role,
      team: data.team === undefined ? undefined : data.team?.trim() || null,
      phone: data.phone === undefined ? undefined : data.phone?.trim() || null,
      status,
    },
    include: recruiterInclude,
  });

  return formatRecruiter(recruiter, true);
}

export async function deactivateRecruiter(id: string) {
  const existing = await prisma.recruiter.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(404, 'Recruiter not found');
  }

  const recruiter = await prisma.recruiter.update({
    where: { id },
    data: { status: RecruiterStatus.INACTIVE },
    include: recruiterInclude,
  });

  return formatRecruiter(recruiter, true);
}

export async function assignCandidatesToRecruiter(
  recruiterId: string,
  candidateIds: string[],
) {
  const recruiter = await prisma.recruiter.findUnique({ where: { id: recruiterId } });
  if (!recruiter) {
    throw new AppError(404, 'Recruiter not found');
  }

  if (recruiter.status === RecruiterStatus.INACTIVE) {
    throw new AppError(
      400,
      'Cannot assign candidates to an inactive recruiter. Reactivate the recruiter first.',
    );
  }

  if (!candidateIds.length) {
    throw new AppError(400, 'At least one candidate must be selected.');
  }

  const candidates = await prisma.candidate.findMany({
    where: { id: { in: candidateIds } },
    select: { id: true },
  });

  if (candidates.length !== candidateIds.length) {
    throw new AppError(400, 'One or more candidates were not found.');
  }

  await prisma.candidate.updateMany({
    where: { id: { in: candidateIds } },
    data: { recruiterId },
  });

  return { success: true, assignedCount: candidateIds.length };
}

export async function assertRecruiterActiveForAssignment(recruiterId: string | null | undefined) {
  if (!recruiterId) {
    return;
  }

  const recruiter = await prisma.recruiter.findUnique({ where: { id: recruiterId } });
  if (!recruiter) {
    throw new AppError(404, 'Recruiter not found');
  }

  if (recruiter.status === RecruiterStatus.INACTIVE) {
    throw new AppError(
      400,
      'Cannot assign candidates to an inactive recruiter.',
    );
  }
}
