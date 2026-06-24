export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(
  /\/$/,
  "",
);

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
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

export type CandidateInput = {
  name: string;
  role: string;
  stage: string;
  recruiterId?: string;
};

export function getApiBaseUrl() {
  return API_URL;
}

export function getFetchApiBaseUrl() {
  return API_URL;
}

export async function getDashboardSummary() {
  return fetchApi<import("./types").DashboardSummary>("/api/dashboard/summary");
}

export type CandidateStatusFilter = "active" | "rejected" | "all";

export async function getCandidates(status: CandidateStatusFilter = "active") {
  const query = status === "active" ? "" : `?status=${encodeURIComponent(status)}`;
  return fetchApi<import("./types").Candidate[]>(`/api/candidates${query}`);
}

export async function getCandidate(id: string) {
  return fetchApi<import("./types").CandidateDetail>(`/api/candidates/${id}`);
}

export async function getFeedback(candidateId: string) {
  return fetchApi<import("./types").FeedbackEntry[]>(
    `/api/feedback?candidateId=${encodeURIComponent(candidateId)}`,
  );
}

export async function createFeedback(data: import("./types").FeedbackInput) {
  return fetchApi<import("./types").FeedbackEntry>("/api/feedback", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function movePipelineStage(candidateId: string, targetStage: string) {
  return fetchApi<{
    id: string;
    name: string;
    previousStage: string;
    currentStage: string;
    stage: string;
    stageEnteredAt: string;
  }>("/api/pipeline/move", {
    method: "POST",
    body: JSON.stringify({ candidateId, targetStage }),
  });
}

export async function createCandidate(data: CandidateInput) {
  return fetchApi<import("./types").Candidate>("/api/candidates", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCandidate(id: string, data: CandidateInput) {
  return fetchApi<import("./types").Candidate>(`/api/candidates/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function getSlaStatus() {
  return fetchApi<import("./types").SlaStatusResponse>("/api/sla/status");
}

export async function getRecruiters() {
  return fetchApi<import("./types").Recruiter[]>("/api/recruiters");
}

export async function getRecruiter(id: string) {
  return fetchApi<import("./types").RecruiterProfile>(`/api/recruiters/${id}`);
}

export async function createRecruiter(data: import("./types").RecruiterInput) {
  return fetchApi<import("./types").Recruiter>("/api/recruiters", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateRecruiter(id: string, data: import("./types").RecruiterInput) {
  return fetchApi<import("./types").Recruiter>(`/api/recruiters/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deactivateRecruiter(id: string) {
  return fetchApi<import("./types").Recruiter>(`/api/recruiters/${id}/deactivate`, {
    method: "PATCH",
  });
}

export async function assignCandidatesToRecruiter(id: string, candidateIds: string[]) {
  return fetchApi<{ success: boolean; assignedCount: number }>(
    `/api/recruiters/${id}/assign-candidates`,
    {
      method: "POST",
      body: JSON.stringify({ candidateIds }),
    },
  );
}
