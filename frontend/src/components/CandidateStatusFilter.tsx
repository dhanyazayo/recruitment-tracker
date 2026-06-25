"use client";

import { useRouter, useSearchParams } from "next/navigation";

export type CandidateStatusFilter = "active" | "rejected" | "all";

const FILTER_OPTIONS: { value: CandidateStatusFilter; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "rejected", label: "Rejected" },
  { value: "all", label: "All" },
];

export function CandidateStatusFilter({ value }: { value: CandidateStatusFilter }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(nextValue: CandidateStatusFilter) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextValue === "active") {
      params.delete("status");
    } else {
      params.set("status", nextValue);
    }
    const query = params.toString();
    router.push(query ? `/candidates?${query}` : "/candidates");
  }

  return (
    <label className="flex w-full flex-col gap-2 text-sm text-gray-600 sm:w-auto sm:flex-row sm:items-center">
      <span className="font-medium">Status</span>
      <select
        value={value}
        onChange={(event) => handleChange(event.target.value as CandidateStatusFilter)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#F47920] focus:outline-none focus:ring-2 focus:ring-[#F47920]/20 sm:w-auto"
      >
        {FILTER_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
