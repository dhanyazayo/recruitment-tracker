"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { RecruiterFormState } from "@/app/recruiters/actions";
import {
  RECRUITER_ROLE_OPTIONS,
  RECRUITER_STATUS_OPTIONS,
  TEAM_OPTIONS,
} from "@/lib/recruiterOptions";

type RecruiterFormProps = {
  title: string;
  submitLabel: string;
  action: (
    prevState: RecruiterFormState,
    formData: FormData,
  ) => Promise<RecruiterFormState>;
  initialValues?: {
    name: string;
    email: string;
    role: string;
    team: string;
    phone: string;
    status: string;
  };
};

const initialState: RecruiterFormState = {};

export function RecruiterForm({
  title,
  submitLabel,
  action,
  initialValues,
}: RecruiterFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="-mx-6 -mt-8 bg-gradient-to-b from-gray-50 to-white px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        <section>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            <Link href="/recruiters" className="text-gray-500 hover:text-[#F47920]">
              Recruiters
            </Link>
            <span className="mx-2">/</span>
            <span>{title}</span>
          </p>
        </section>

        <form
          action={formAction}
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
            minLength={2}
            defaultValue={initialValues?.name ?? ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            placeholder="Recruiter name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={initialValues?.email ?? ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            placeholder="name@company.com"
          />
        </div>

        <div>
          <label htmlFor="role" className="mb-1 block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            required
            defaultValue={initialValues?.role ?? "RECRUITER"}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          >
            {RECRUITER_ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="team" className="mb-1 block text-sm font-medium text-gray-700">
            Team
          </label>
          <input
            id="team"
            name="team"
            type="text"
            list="team-options"
            defaultValue={initialValues?.team ?? ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            placeholder="Recruiting team or business unit"
          />
          <datalist id="team-options">
            {TEAM_OPTIONS.map((team) => (
              <option key={team} value={team} />
            ))}
          </datalist>
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={initialValues?.phone ?? ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            placeholder="Optional"
          />
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            required
            defaultValue={initialValues?.status ?? "ACTIVE"}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          >
            {RECRUITER_STATUS_OPTIONS.map((option) => (
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
            disabled={pending}
            className="rounded-xl bg-[#F47920] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#D96510] disabled:opacity-60"
          >
            {pending ? "Saving..." : submitLabel}
          </button>
          <Link
            href="/recruiters"
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
