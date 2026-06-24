import { Stage } from '@prisma/client';
import { NON_REJECTED_CANDIDATE_WHERE } from '../constants/candidateStatus.js';
import { prisma } from '../lib/prisma.js';
import { calculateSlaStatus, isAtRisk, SLA_TARGETS, SlaStatus } from '../constants/sla.js';
import { getStageLabel } from '../constants/stages.js';

export type SlaCandidateEntry = {
  id: string;
  name: string;
  role: string;
  recruiter: string;
  currentStage: string;
  stage: Stage;
  daysInStage: number;
  slaTarget: number | null;
  daysRemaining: number | null;
  overdueDays: number | null;
  status: SlaStatus | null;
};

function formatSlaCandidate(candidate: {
  id: string;
  name: string;
  role: string;
  recruiter: { name: string } | null;
  currentStage: Stage;
  stageEnteredAt: Date;
}): SlaCandidateEntry {
  const sla = calculateSlaStatus(candidate.currentStage, candidate.stageEnteredAt);

  return {
    id: candidate.id,
    name: candidate.name,
    role: candidate.role,
    recruiter: candidate.recruiter?.name ?? 'Unassigned',
    currentStage: getStageLabel(candidate.currentStage),
    stage: candidate.currentStage,
    daysInStage: sla.daysInStage,
    slaTarget: sla.slaTarget,
    daysRemaining: sla.daysRemaining,
    overdueDays: sla.overdueDays,
    status: sla.status,
  };
}

export async function getSlaStatus() {
  const candidates = await prisma.candidate.findMany({
    where: {
      ...NON_REJECTED_CANDIDATE_WHERE,
      currentStage: {
        notIn: [Stage.SELECTED, Stage.REJECTED],
      },
    },
    include: { recruiter: true },
    orderBy: { stageEnteredAt: 'asc' },
  });

  const entries = candidates.map(formatSlaCandidate);

  const breached = entries.filter((item) => item.status === 'breached');
  const approaching = entries.filter((item) => item.status === 'approaching');
  const onTrack = entries.filter((item) => item.status === 'on-track');

  return {
    summary: {
      total: entries.length,
      onTrack: onTrack.length,
      approaching: approaching.length,
      breached: breached.length,
    },
    slaTargets: Object.entries(SLA_TARGETS).map(([stage, targetDays]) => ({
      stage: getStageLabel(stage as Stage),
      targetDays,
    })),
    breached,
    approaching,
    onTrack,
    candidates: entries,
  };
}

export async function getAtRiskCount() {
  const candidates = await prisma.candidate.findMany({
    where: {
      ...NON_REJECTED_CANDIDATE_WHERE,
      currentStage: {
        notIn: [Stage.SELECTED, Stage.REJECTED],
      },
    },
    select: {
      currentStage: true,
      stageEnteredAt: true,
    },
  });

  return candidates.filter((candidate) => {
    const { status } = calculateSlaStatus(candidate.currentStage, candidate.stageEnteredAt);
    return isAtRisk(status);
  }).length;
}
