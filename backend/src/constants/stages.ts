import { Stage } from '@prisma/client';

export const STAGE_ORDER: Stage[] = [
  Stage.FOUND,
  Stage.INITIAL_DISCUSSION,
  Stage.FIRST_ROUND,
  Stage.SECOND_ROUND,
  Stage.HR_ROUND,
  Stage.SELECTED,
];

export const TERMINAL_STAGES: Stage[] = [Stage.SELECTED, Stage.REJECTED];

export const ACTIVE_STAGES: Stage[] = STAGE_ORDER.filter(
  (stage) => !TERMINAL_STAGES.includes(stage),
);

export const STAGE_LABELS: Record<Stage, string> = {
  [Stage.FOUND]: 'Found',
  [Stage.INITIAL_DISCUSSION]: 'Initial Discussion',
  [Stage.FIRST_ROUND]: 'First Round',
  [Stage.SECOND_ROUND]: 'Second Round',
  [Stage.HR_ROUND]: 'HR Round',
  [Stage.SELECTED]: 'Selected',
  [Stage.REJECTED]: 'Rejected',
};

export const STAGE_COLORS: Record<Stage, string> = {
  [Stage.FOUND]: 'bg-gray-400',
  [Stage.INITIAL_DISCUSSION]: 'bg-blue-400',
  [Stage.FIRST_ROUND]: 'bg-purple-400',
  [Stage.SECOND_ROUND]: 'bg-indigo-400',
  [Stage.HR_ROUND]: 'bg-green-400',
  [Stage.SELECTED]: 'bg-emerald-400',
  [Stage.REJECTED]: 'bg-red-400',
};

export function getStageLabel(stage: Stage): string {
  return STAGE_LABELS[stage];
}

export function parseStage(value: string): Stage | null {
  const trimmed = value.trim();
  const aliases: Record<string, Stage> = {
    INITIAL: Stage.INITIAL_DISCUSSION,
    FIRST: Stage.FIRST_ROUND,
    SECOND: Stage.SECOND_ROUND,
    HR: Stage.HR_ROUND,
  };

  const normalized = trimmed.toUpperCase().replace(/\s+/g, '_');
  if (aliases[normalized]) {
    return aliases[normalized];
  }

  if (Object.values(Stage).includes(normalized as Stage)) {
    return normalized as Stage;
  }

  const byLabel = Object.entries(STAGE_LABELS).find(
    ([, label]) => label.toLowerCase() === trimmed.toLowerCase(),
  );

  return byLabel ? (byLabel[0] as Stage) : null;
}

export function getNextStage(current: Stage): Stage | null {
  if (TERMINAL_STAGES.includes(current)) {
    return null;
  }

  if (current === Stage.HR_ROUND) {
    return Stage.SELECTED;
  }

  const index = STAGE_ORDER.indexOf(current);
  if (index === -1 || index >= STAGE_ORDER.length - 1) {
    return null;
  }

  return STAGE_ORDER[index + 1];
}

export function isValidTransition(from: Stage, to: Stage): boolean {
  if (TERMINAL_STAGES.includes(from)) {
    return false;
  }

  if (to === Stage.REJECTED) {
    return true;
  }

  return getNextStage(from) === to;
}
