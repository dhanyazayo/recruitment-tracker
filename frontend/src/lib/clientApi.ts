import { ApiError } from "./api";
import type { CandidateDetail, CandidateStatus, FeedbackEntry, FeedbackInput } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function clientFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
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

  return response.json() as Promise<T>;
}

export function getClientCandidate(id: string) {
  return clientFetch<CandidateDetail>(`/api/candidates/${id}`);
}

export function getClientFeedback(candidateId: string) {
  return clientFetch<FeedbackEntry[]>(
    `/api/feedback?candidateId=${encodeURIComponent(candidateId)}`,
  );
}

export function postClientFeedback(data: FeedbackInput) {
  return clientFetch<FeedbackEntry>("/api/feedback", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export type CandidateStatusUpdate = {
  status?: CandidateStatus;
  statusTag?: string | null;
};

export function putClientCandidate(id: string, data: CandidateStatusUpdate) {
  return clientFetch<CandidateDetail>(`/api/candidates/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function postPipelineMove(candidateId: string, targetStage: string) {
  return clientFetch<{
    id: string;
    currentStage: string;
    stage: string;
  }>("/api/pipeline/move", {
    method: "POST",
    body: JSON.stringify({ candidateId, targetStage }),
  });
}
