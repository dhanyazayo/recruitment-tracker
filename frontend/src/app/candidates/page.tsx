import Link from "next/link";
import { Suspense } from "react";
import { BackendError } from "@/components/BackendError";
import { CandidateActions } from "@/components/CandidateActions";
import {
  CandidateStatusFilter,
  type CandidateStatusFilter as StatusFilter,
} from "@/components/CandidateStatusFilter";
import { SlaBadge } from "@/components/SlaBadge";
import { getCandidates } from "@/lib/api";
import type { Candidate } from "@/lib/types";

function parseStatusFilter(value: string | undefined): StatusFilter {
  if (value === "rejected" || value === "all" || value === "active") {
    return value;
  }
  return "active";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const stageStyle: Record<string, string> = {
  Found: "bg-gray-100 text-gray-700",
  "Initial Discussion": "bg-blue-50 text-blue-700",
  "First Round": "bg-purple-50 text-purple-700",
  "Second Round": "bg-indigo-50 text-indigo-700",
  "HR Round": "bg-[#FEF3E8] text-[#B85A10]",
};

function daysColor(days: number): string {
  if (days > 7) return "text-red-600";
  if (days > 4) return "text-yellow-600";
  return "text-gray-900";
}

function computeSummary(candidates: Candidate[]) {
  return {
    total: candidates.length,
    onTrack: candidates.filter((c) => c.slaStatus === "on-track").length,
    approaching: candidates.filter((c) => c.slaStatus === "approaching").length,
    breached: candidates.filter((c) => c.slaStatus === "breached").length,
  };
}

export default async function CandidatesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  try {
    const { status: statusParam } = await searchParams;
    const statusFilter = parseStatusFilter(statusParam);
    const candidates = await getCandidates(statusFilter);
    const counts = computeSummary(candidates);
    const pageTitle =
      statusFilter === "rejected"
        ? "Rejected Candidates"
        : statusFilter === "all"
          ? "All Candidates"
          : "Active Candidates";

    return (
      <div className="-mx-6 -mt-8 bg-gradient-to-b from-gray-50 to-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="mb-1 text-2xl font-bold text-gray-900">{pageTitle}</h1>
              <p className="text-sm text-gray-500">
                Search, filter and manage every candidate in the pipeline
              </p>
            </div>
            <Link
              href="/candidates/new"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-[#F47920] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#D96510]"
            >
              <PlusIcon />
              Add Candidate
            </Link>
          </header>

          <section className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <SummaryPill
                label="Total"
                value={counts.total}
                className="border-gray-200 bg-white text-gray-700"
                valueClassName="text-gray-900"
              />
              {statusFilter !== "rejected" ? (
                <>
                  <SummaryPill
                    label="On Track"
                    value={counts.onTrack}
                    className="border-green-200 bg-green-50 text-green-700"
                  />
                  <SummaryPill
                    label="Approaching SLA"
                    value={counts.approaching}
                    className="border-yellow-200 bg-yellow-50 text-yellow-700"
                  />
                  <SummaryPill
                    label="SLA Breached"
                    value={counts.breached}
                    className="border-red-200 bg-red-50 text-red-700"
                  />
                </>
              ) : null}
            </div>
            <Suspense fallback={null}>
              <CandidateStatusFilter value={statusFilter} />
            </Suspense>
          </section>

          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/60">
                    {[
                      "Candidate",
                      "Role",
                      "Stage",
                      "Recruiter",
                      "Days in Stage",
                      "SLA",
                      "Feedback",
                      "Actions",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {candidates.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-10 text-center text-sm text-gray-500">
                        No candidates found for this filter.
                      </td>
                    </tr>
                  ) : (
                    candidates.map((candidate, index) => (
                    <tr
                      key={candidate.id}
                      className={`border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50/70 ${
                        index % 2 === 1 ? "bg-gray-50/30" : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F47920]/20 bg-gradient-to-br from-[#F47920]/20 to-[#F47920]/5">
                            <span className="text-xs font-bold text-[#F47920]">
                              {getInitials(candidate.name)}
                            </span>
                          </div>
                          <Link
                            href={`/candidates/${candidate.id}`}
                            className="font-medium text-gray-900 hover:text-[#F47920]"
                          >
                            {candidate.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{candidate.role}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                            stageStyle[candidate.stage] ?? "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {candidate.stage}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-500">{candidate.recruiter}</td>
                      <td className="px-5 py-4">
                        <span className={`text-sm font-semibold ${daysColor(candidate.daysInStage)}`}>
                          {candidate.daysInStage}d
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <SlaBadge status={candidate.slaStatus} />
                      </td>
                      <td className="px-5 py-4">
                        {candidate.hasPendingFeedback ? (
                          <span className="text-xs font-medium text-amber-700">Pending</span>
                        ) : (
                          <span className="text-xs text-gray-400">Submitted</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <CandidateActions
                          candidateId={candidate.id}
                          candidateName={candidate.name}
                        />
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="border-t border-gray-100 bg-gray-50/40 px-5 py-3 text-xs text-gray-400">
              Showing {candidates.length} of {candidates.length} candidates
            </div>
          </section>
        </div>
      </div>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">All Candidates</h1>
        <BackendError message={message} />
      </div>
    );
  }
}

function SummaryPill({
  label,
  value,
  className,
  valueClassName,
}: {
  label: string;
  value: number;
  className: string;
  valueClassName?: string;
}) {
  return (
    <div
      className={`rounded-xl border px-4 py-2 text-sm font-medium shadow-sm ${className}`}
    >
      <span className={`font-bold ${valueClassName ?? ""}`}>{value}</span> {label}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M12 5v14" />
    </svg>
  );
}
