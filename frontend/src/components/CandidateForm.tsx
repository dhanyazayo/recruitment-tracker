"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { CandidateFormState } from "@/app/candidates/actions";
import { STAGE_OPTIONS } from "@/lib/stages";
import type { Recruiter } from "@/lib/types";

type CandidateFormProps = {
  title: string;
  submitLabel: string;
  action: (
    prevState: CandidateFormState,
    formData: FormData,
  ) => Promise<CandidateFormState>;
  initialValues?: {
    name: string;
    role: string;
    stage: string;
  };
  recruiters?: Pick<Recruiter, "id" | "name">[];
};

const initialState: CandidateFormState = {};

export function CandidateForm({
  title,
  submitLabel,
  action,
  initialValues,
  recruiters,
}: CandidateFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [recruiterId, setRecruiterId] = useState("");
  const [recruiterError, setRecruiterError] = useState("");
  const requiresRecruiter = recruiters !== undefined;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (requiresRecruiter && !recruiterId) {
      event.preventDefault();
      setRecruiterError("Recruiter is required");
      return;
    }
    setRecruiterError("");
  };

  const isSubmitDisabled = pending || (requiresRecruiter && !recruiterId);

  return (
    <div className="-mx-6 -mt-8 bg-gradient-to-b from-gray-50 to-white px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        <section>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            <Link href="/candidates" className="text-gray-500 hover:text-[#F47920]">
              Candidates
            </Link>
            <span className="mx-2">/</span>
            <span>{title}</span>
          </p>
        </section>

        <form
          action={formAction}
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={initialValues?.name ?? ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            placeholder="Candidate name"
          />
        </div>

        <div>
          <label htmlFor="role" className="mb-1 block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            required
            defaultValue={initialValues?.role ?? ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            placeholder="e.g. Senior Engineer"
          />
        </div>

        {requiresRecruiter ? (
          <div>
            <label htmlFor="recruiterId" className="mb-1 block text-sm font-medium text-gray-700">
              Recruiter
            </label>
            <select
              id="recruiterId"
              name="recruiterId"
              required
              value={recruiterId}
              onChange={(event) => {
                setRecruiterId(event.target.value);
                if (event.target.value) {
                  setRecruiterError("");
                }
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            >
              <option value="">Select a recruiter</option>
              {recruiters.map((recruiter) => (
                <option key={recruiter.id} value={recruiter.id}>
                  {recruiter.name}
                </option>
              ))}
            </select>
            {recruiterError ? (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {recruiterError}
              </p>
            ) : null}
          </div>
        ) : null}

        <div>
          <label htmlFor="stage" className="mb-1 block text-sm font-medium text-gray-700">
            Stage
          </label>
          <select
            id="stage"
            name="stage"
            required
            defaultValue={initialValues?.stage ?? "FOUND"}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          >
            {STAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {state.error ? (
          <p className="text-sm text-red-600" role="alert">
            {state.error}
          </p>
        ) : null}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="rounded-xl bg-[#F47920] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#D96510] disabled:opacity-60"
          >
            {pending ? "Saving..." : submitLabel}
          </button>
          <Link
            href="/candidates"
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
        </form>
      </div>
    </div>
  );
}
