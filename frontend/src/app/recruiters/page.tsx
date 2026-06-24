import Link from "next/link";
import { redirect } from "next/navigation";
import { BackendError } from "@/components/BackendError";
import { RecruiterDeactivateButton } from "@/components/RecruiterDeactivateButton";
import { getRecruiters } from "@/lib/api";
import type { Recruiter } from "@/lib/types";
import { canManageRecruiters, canViewRecruiters } from "@/lib/roles";
import { getUserRole } from "@/lib/session";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function perfBadgeClass(value: number | null): string {
  if (value === null) {
    return "";
  }
  if (value >= 90) {
    return "text-green-700 bg-green-50 border-green-200";
  }
  if (value >= 75) {
    return "text-yellow-700 bg-yellow-50 border-yellow-200";
  }
  return "text-red-700 bg-red-50 border-red-200";
}

function computeSummary(recruiters: Recruiter[]) {
  const totalActive = recruiters.reduce((sum, r) => sum + r.activeCandidates, 0);
  const complianceValues = recruiters
    .map((r) => r.slaCompliancePercent)
    .filter((v): v is number => v !== null);
  const avgCompliance =
    complianceValues.length > 0
      ? Math.round(complianceValues.reduce((sum, v) => sum + v, 0) / complianceValues.length)
      : null;
  const teamsCovered = new Set(recruiters.map((r) => r.team).filter(Boolean)).size;

  return { totalActive, avgCompliance, teamsCovered };
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        isActive
          ? "bg-green-100 text-green-700 ring-1 ring-green-200"
          : "bg-red-50 text-red-600 ring-1 ring-red-200"
      }`}
    >
      {status}
    </span>
  );
}

function MetricBadge({ value }: { value: number | null }) {
  if (value === null) {
    return <span className="text-sm text-gray-400">—</span>;
  }
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${perfBadgeClass(value)}`}
    >
      {value}%
    </span>
  );
}

export default async function RecruitersPage() {
  const role = await getUserRole();

  if (!canViewRecruiters(role)) {
    redirect("/");
  }

  const canManage = canManageRecruiters(role);

  try {
    const recruiters = await getRecruiters();
    const { totalActive, avgCompliance, teamsCovered } = computeSummary(recruiters);

    return (
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Recruiter Management
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">
              {canManage
                ? "Manage recruiters and track performance"
                : `${recruiters.length} recruiters — read-only performance summary`}
            </p>
          </div>
          {canManage ? (
            <Link
              href="/recruiters/new"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-[#F47920] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#D96510]"
            >
              <PlusIcon />
              Add Recruiter
            </Link>
          ) : null}
        </header>

        <section className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <SummaryCard
            label="Total Recruiters"
            value={recruiters.length}
            icon={<UsersIcon />}
            iconBg="bg-[#FEF3E8]"
            iconColor="text-[#F47920]"
          />
          <SummaryCard
            label="Active Candidates"
            value={totalActive}
            icon={<TrendingUpIcon />}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <SummaryCard
            label="Avg. SLA Compliance"
            value={avgCompliance !== null ? `${avgCompliance}%` : "—"}
            icon={<ShieldIcon />}
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />
          <SummaryCard
            label="Teams Covered"
            value={teamsCovered}
            icon={<MailIcon />}
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
          />
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {[
                    "Name",
                    "Email",
                    "Role",
                    "Team",
                    "Status",
                    "Active Candidates",
                    "Selected Count",
                    "Conversion Rate",
                    "SLA Compliance %",
                    ...(canManage ? ["Actions"] : []),
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recruiters.length === 0 ? (
                  <tr>
                    <td
                      colSpan={canManage ? 10 : 9}
                      className="px-6 py-16 text-center text-sm text-gray-500"
                    >
                      No recruiters yet.{" "}
                      {canManage ? (
                        <Link
                          href="/recruiters/new"
                          className="font-medium text-[#F47920] hover:text-[#D96510]"
                        >
                          Add your first recruiter
                        </Link>
                      ) : null}
                    </td>
                  </tr>
                ) : null}
                {recruiters.map((recruiter) => (
                  <tr key={recruiter.id} className="transition-colors hover:bg-gray-50/60">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#F47920]/20 bg-[#F47920]/10">
                          <span className="text-xs font-bold text-[#F47920]">
                            {getInitials(recruiter.name)}
                          </span>
                        </div>
                        <Link
                          href={`/recruiters/${recruiter.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-[#F47920]"
                        >
                          {recruiter.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500">{recruiter.email}</td>
                    <td className="px-6 py-5">
                      <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-sm font-medium text-gray-700">
                        {recruiter.role}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">{recruiter.team ?? "—"}</td>
                    <td className="px-6 py-5">
                      <StatusBadge status={recruiter.status} />
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-semibold text-gray-900">
                        {recruiter.activeCandidates}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-900">
                      {recruiter.selectedCount}
                    </td>
                    <td className="px-6 py-5">
                      <MetricBadge value={recruiter.conversionRate} />
                    </td>
                    <td className="px-6 py-5">
                      <MetricBadge value={recruiter.slaCompliancePercent} />
                    </td>
                    {canManage ? (
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap items-center gap-2">
                          <ActionButtonSecondary href={`/recruiters/${recruiter.id}`}>
                            View
                          </ActionButtonSecondary>
                          <ActionButtonOutline href={`/recruiters/${recruiter.id}/edit`}>
                            Edit
                          </ActionButtonOutline>
                          <div className="[&>button]:inline-flex [&>button]:items-center [&>button]:rounded-lg [&>button]:border [&>button]:border-red-200 [&>button]:bg-red-50 [&>button]:px-2.5 [&>button]:py-1.5 [&>button]:text-xs [&>button]:font-medium [&>button]:text-red-700 [&>button]:transition-colors [&>button]:hover:bg-red-100 [&>button]:disabled:opacity-60">
                            <RecruiterDeactivateButton
                              recruiterId={recruiter.id}
                              recruiterName={recruiter.name}
                              isInactive={recruiter.statusValue === "INACTIVE"}
                            />
                          </div>
                          {recruiter.statusValue === "ACTIVE" ? (
                            <ActionButtonOutline href={`/recruiters/${recruiter.id}/assign`}>
                              Assign
                            </ActionButtonOutline>
                          ) : null}
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return (
      <div className="mx-auto max-w-7xl space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Recruiter Management</h1>
        <BackendError message={message} />
      </div>
    );
  }
}

function SummaryCard({
  label,
  value,
  icon,
  iconBg,
  iconColor,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div
        className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-gray-500">{label}</p>
    </div>
  );
}

function ActionButtonSecondary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
    >
      {children}
    </Link>
  );
}

function ActionButtonOutline({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
    >
      {children}
    </Link>
  );
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M12 5v14" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 7 13.5 15.5 8.5 10.5 2 17" />
      <path d="M16 7h6v6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
