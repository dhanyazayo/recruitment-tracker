"use server";

import { redirect } from "next/navigation";
import { createCandidate, updateCandidate } from "@/lib/api";

export type CandidateFormState = {
  error?: string;
};

export async function createCandidateAction(
  _prevState: CandidateFormState,
  formData: FormData,
): Promise<CandidateFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const stage = String(formData.get("stage") ?? "").trim();
  const recruiterId = String(formData.get("recruiterId") ?? "").trim();

  if (!name || !role || !stage) {
    return { error: "Name, role, and stage are required." };
  }

  if (!recruiterId) {
    return { error: "Recruiter is required" };
  }

  try {
    await createCandidate({ name, role, stage, recruiterId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create candidate.";
    return { error: message };
  }

  redirect("/candidates");
}

export async function updateCandidateAction(
  candidateId: string,
  _prevState: CandidateFormState,
  formData: FormData,
): Promise<CandidateFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const stage = String(formData.get("stage") ?? "").trim();

  if (!name || !role || !stage) {
    return { error: "Name, role, and stage are required." };
  }

  try {
    await updateCandidate(candidateId, { name, role, stage });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update candidate.";
    return { error: message };
  }

  redirect("/candidates");
}
