import { API_URL, ApiError } from "@/lib/api";
import { getClientCandidate } from "@/lib/clientApi";
import { getNextStage, getStageLabel } from "@/lib/stages";
import type { CandidateDetail, FeedbackEntry } from "@/lib/types";

export const FEEDBACK_REQUIRED_MESSAGE =
  "Feedback is required before moving to next stage";
export const MOVE_SUCCESS_MESSAGE = "Moved to next stage successfully";

export function hasFeedbackForCurrentStage(
  feedback: FeedbackEntry[],
  currentStage: string,
): boolean {
  const stageLabel = getStageLabel(currentStage);
  return feedback.some(
    (entry) =>
      entry.stage === stageLabel ||
      entry.stage.replace(/\s+/g, "_").toUpperCase() === currentStage,
  );
}

export function validateMoveToNextStage(
  candidate: Pick<CandidateDetail, "currentStage" | "status">,
  feedback: FeedbackEntry[],
): { ok: true; nextStage: string } | { ok: false; error: string } {
  if (candidate.status !== "Active") {
    if (candidate.status === "Hold") {
      return { ok: false, error: "Candidate is on hold. Resume before moving stages." };
    }
    if (candidate.status === "Rejected") {
      return { ok: false, error: "Rejected candidates cannot move stages." };
    }
    return { ok: false, error: "Candidate must be active to move stages." };
  }

  const nextStage = getNextStage(candidate.currentStage);
  if (!nextStage) {
    return { ok: false, error: "No next stage available." };
  }

  if (!hasFeedbackForCurrentStage(feedback, candidate.currentStage)) {
    return { ok: false, error: FEEDBACK_REQUIRED_MESSAGE };
  }

  return { ok: true, nextStage };
}

export async function postMoveToNextStage(candidateId: string, nextStage: string) {
  const response = await fetch(`${API_URL}/api/pipeline/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidateId, nextStage, targetStage: nextStage }),
  });

  if (!response.ok) {
    let message = `Request failed: ${response.statusText}`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) {
        message = body.error;
      }
    } catch {
      // ignore non-JSON error bodies
    }
    throw new ApiError(message, response.status);
  }

  return response.json();
}

export async function fetchCandidateById(id: string) {
  return getClientCandidate(id);
}
