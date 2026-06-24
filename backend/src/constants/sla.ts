import { Stage } from '@prisma/client';

export type SlaStatus = 'on-track' | 'approaching' | 'breached';

export const SLA_TARGETS: Partial<Record<Stage, number>> = {
  [Stage.FOUND]: 2,
  [Stage.INITIAL_DISCUSSION]: 4,
  [Stage.FIRST_ROUND]: 7,
  [Stage.SECOND_ROUND]: 5,
  [Stage.HR_ROUND]: 3,
};

export const SLA_STATUS_COLORS: Record<SlaStatus, string> = {
  'on-track': 'green',
  approaching: 'yellow',
  breached: 'red',
};

export function getDaysInStage(stageEnteredAt: Date, now = new Date()): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = now.getTime() - stageEnteredAt.getTime();
  return Math.max(0, Math.floor(diff / msPerDay));
}

export function getSlaTarget(stage: Stage): number | null {
  return SLA_TARGETS[stage] ?? null;
}

export function calculateSlaStatus(
  stage: Stage,
  stageEnteredAt: Date,
  now = new Date(),
): {
  status: SlaStatus | null;
  daysInStage: number;
  slaTarget: number | null;
  daysRemaining: number | null;
  overdueDays: number | null;
} {
  const daysInStage = getDaysInStage(stageEnteredAt, now);
  const slaTarget = getSlaTarget(stage);

  if (slaTarget === null) {
    return {
      status: null,
      daysInStage,
      slaTarget: null,
      daysRemaining: null,
      overdueDays: null,
    };
  }

  const daysRemaining = slaTarget - daysInStage;

  if (daysRemaining < 0) {
    return {
      status: 'breached',
      daysInStage,
      slaTarget,
      daysRemaining,
      overdueDays: Math.abs(daysRemaining),
    };
  }

  if (daysRemaining <= 1) {
    return {
      status: 'approaching',
      daysInStage,
      slaTarget,
      daysRemaining,
      overdueDays: null,
    };
  }

  return {
    status: 'on-track',
    daysInStage,
    slaTarget,
    daysRemaining,
    overdueDays: null,
  };
}

export function isAtRisk(status: SlaStatus | null): boolean {
  return status === 'approaching' || status === 'breached';
}
