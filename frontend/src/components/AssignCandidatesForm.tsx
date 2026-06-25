"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { RecruiterFormState } from "@/app/recruiters/actions";
import type { Candidate } from "@/lib/types";

type AssignCandidatesFormProps = {
  recruiterId: string;
  recruiterName: string;
  candidates: Candidate[];
  assignedIds: Set<string>;
  action: (
    prevState: RecruiterFormState,
    formData: FormData,
  ) => Promise<RecruiterFormState>;
};

const initialState: RecruiterFormState = {};

export function AssignCandidatesForm({
  recruiterId,
  recruiterName,
  candidates,
  assignedIds,
  action,
}: AssignCandidatesFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      <section>
        <h1 className="text-2xl font-bold">Assign Candidates</h1>
        <p className="mt-1 text-sm text-gray-600">
          <Link href="/recruiters" className="text-gray-500 hover:text-gray-700">
            Recruiters
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/recruiters/${recruiterId}`} className="text-gray-500 hover:text-gray-700">
            {recruiterName}
          </Link>
          <span className="mx-2">/</span>
          <span>Assign</span>
        </p>
      </section>

      <form
        action={formAction}
        className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 sm:p-6"
      >
        <p className="text-sm text-gray-600">
          Select candidates to assign to {recruiterName}. Inactive recruiters cannot receive new
          assignments.
        </p>

        <div className="overflow-x-auto rounded-md border border-gray-200">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium">Select</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium">Current Recruiter</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      name="candidateIds"
                      value={candidate.id}
                      defaultChecked={assignedIds.has(candidate.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{candidate.name}</td>
                  <td className="px-4 py-3">{candidate.role}</td>
                  <td className="px-4 py-3">{candidate.stage}</td>
                  <td className="px-4 py-3">{candidate.recruiter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {state.error ? (
          <p className="text-sm text-red-600" role="alert">
            {state.error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60 sm:w-auto"
          >
            {pending ? "Assigning..." : "Assign Selected"}
          </button>
          <Link
            href={`/recruiters/${recruiterId}`}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
