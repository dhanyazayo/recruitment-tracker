"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  assignCandidatesToRecruiter,
  createRecruiter,
  deactivateRecruiter,
  updateRecruiter,
} from "@/lib/api";
import { ROLE_COOKIE } from "@/lib/session";
import type { UserRole } from "@/lib/roles";

export type RecruiterFormState = {
  error?: string;
};

export async function setUserRoleAction(role: UserRole) {
  const cookieStore = await cookies();
  cookieStore.set(ROLE_COOKIE, role, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
}

export async function createRecruiterAction(
  _prevState: RecruiterFormState,
  formData: FormData,
): Promise<RecruiterFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const team = String(formData.get("team") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const status = String(formData.get("status") ?? "ACTIVE").trim();

  if (!name || !email || !role) {
    return { error: "Name, email, and role are required." };
  }

  if (name.length < 2) {
    return { error: "Name must be at least 2 characters." };
  }

  try {
    await createRecruiter({
      name,
      email,
      role,
      team: team || undefined,
      phone: phone || undefined,
      status,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create recruiter.";
    return { error: message };
  }

  redirect("/recruiters");
}

export async function updateRecruiterAction(
  recruiterId: string,
  _prevState: RecruiterFormState,
  formData: FormData,
): Promise<RecruiterFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const team = String(formData.get("team") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!name || !email || !role || !status) {
    return { error: "Name, email, role, and status are required." };
  }

  if (name.length < 2) {
    return { error: "Name must be at least 2 characters." };
  }

  try {
    await updateRecruiter(recruiterId, {
      name,
      email,
      role,
      team: team || undefined,
      phone: phone || undefined,
      status,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update recruiter.";
    return { error: message };
  }

  redirect("/recruiters");
}

export async function deactivateRecruiterAction(recruiterId: string) {
  try {
    await deactivateRecruiter(recruiterId);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to deactivate recruiter.";
    return { error: message };
  }

  redirect("/recruiters");
}

export async function assignCandidatesAction(
  recruiterId: string,
  _prevState: RecruiterFormState,
  formData: FormData,
): Promise<RecruiterFormState> {
  const candidateIds = formData.getAll("candidateIds").map(String);

  if (candidateIds.length === 0) {
    return { error: "Select at least one candidate to assign." };
  }

  try {
    await assignCandidatesToRecruiter(recruiterId, candidateIds);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to assign candidates.";
    return { error: message };
  }

  redirect(`/recruiters/${recruiterId}`);
}
