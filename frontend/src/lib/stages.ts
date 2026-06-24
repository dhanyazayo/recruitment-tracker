export const STAGE_OPTIONS = [
  { value: "FOUND", label: "Found" },
  { value: "INITIAL_DISCUSSION", label: "Initial Discussion" },
  { value: "FIRST_ROUND", label: "First Round" },
  { value: "SECOND_ROUND", label: "Second Round" },
  { value: "HR_ROUND", label: "HR Round" },
  { value: "SELECTED", label: "Selected" },
  { value: "REJECTED", label: "Rejected" },
] as const;

const STAGE_LABELS = Object.fromEntries(
  STAGE_OPTIONS.map((option) => [option.value, option.label]),
) as Record<string, string>;

export function getStageLabel(stage: string): string {
  return STAGE_LABELS[stage] ?? stage;
}

const PIPELINE_ORDER = [
  "FOUND",
  "INITIAL_DISCUSSION",
  "FIRST_ROUND",
  "SECOND_ROUND",
  "HR_ROUND",
  "SELECTED",
] as const;

const TERMINAL_STAGES = new Set(["SELECTED", "REJECTED"]);

export function getNextStage(current: string): string | null {
  if (TERMINAL_STAGES.has(current)) {
    return null;
  }
  if (current === "HR_ROUND") {
    return "SELECTED";
  }
  const index = PIPELINE_ORDER.indexOf(current as (typeof PIPELINE_ORDER)[number]);
  if (index === -1 || index >= PIPELINE_ORDER.length - 1) {
    return null;
  }
  return PIPELINE_ORDER[index + 1];
}
