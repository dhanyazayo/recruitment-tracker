import { BackendError } from "@/components/BackendError";
import { SlaBadge } from "@/components/SlaBadge";
import { getSlaStatus } from "@/lib/api";
import type { SlaCandidateEntry } from "@/lib/types";

export default async function SlaBreakdownPage() {
  try {
    const data = await getSlaStatus();

    return (
      <div className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-8 sm:mb-12">
            <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">SLA Breakdown</h1>
            <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
              Monitor all candidates and their Service Level Agreement status
            </p>
          </header>

          <section className="mb-8 grid grid-cols-1 gap-4 sm:mb-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="Total Candidates"
              value={data.summary.total}
              icon={<TrendingUpIcon />}
              iconBg="bg-[#FEE9D1]"
              iconColor="text-[#F47920]"
              border="border-gray-200"
              valueColor="text-gray-900"
            />
            <StatCard
              label="On Track"
              value={data.summary.onTrack}
              icon={<CheckCircleIcon />}
              iconBg="bg-green-100"
              iconColor="text-green-600"
              border="border-green-200"
              valueColor="text-green-900"
            />
            <StatCard
              label="Approaching"
              value={data.summary.approaching}
              icon={<ClockIcon />}
              iconBg="bg-yellow-100"
              iconColor="text-yellow-600"
              border="border-yellow-200"
              valueColor="text-yellow-900"
            />
            <StatCard
              label="Breached"
              value={data.summary.breached}
              icon={<AlertTriangleIcon />}
              iconBg="bg-red-100"
              iconColor="text-red-600"
              border="border-red-200"
              valueColor="text-red-900"
            />
          </section>

          <section className="mb-8 rounded-2xl border border-[#FCD5A8] bg-[#FEF3E8] p-4 sm:p-6">
            <h2 className="mb-4 font-semibold text-gray-900">SLA Targets by Stage</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {data.slaTargets.map((target) => (
                <div
                  key={target.stage}
                  className="rounded-lg border border-[#FEE9D1] bg-white p-3"
                >
                  <p className="mb-1 text-xs text-gray-600">{target.stage}</p>
                  <p className="font-bold text-gray-900">{target.targetDays} days</p>
                </div>
              ))}
            </div>
          </section>

          {data.breached.length > 0 && (
            <CandidateGroup
              title="Critical: SLA Breached"
              count={data.breached.length}
              candidates={data.breached}
              variant="breached"
              headerIcon={<AlertTriangleIcon className="text-red-600" />}
              badgeClass="bg-red-100 text-red-700"
            />
          )}

          {data.approaching.length > 0 && (
            <CandidateGroup
              title="Warning: Approaching SLA Breach"
              count={data.approaching.length}
              candidates={data.approaching}
              variant="approaching"
              headerIcon={<ClockIcon className="text-yellow-600" />}
              badgeClass="bg-yellow-100 text-yellow-700"
            />
          )}

          {data.onTrack.length > 0 && (
            <CandidateGroup
              title="On Track"
              count={data.onTrack.length}
              candidates={data.onTrack}
              variant="on-track"
              headerIcon={<CheckCircleIcon className="text-green-600" />}
              badgeClass="bg-green-100 text-green-700"
            />
          )}

          {data.breached.length === 0 &&
            data.approaching.length === 0 &&
            data.onTrack.length === 0 && (
              <p className="text-sm text-gray-500">No active candidates to display.</p>
            )}
        </div>
      </div>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return (
      <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold sm:text-2xl">SLA Breakdown</h1>
        <BackendError message={message} />
      </div>
    );
  }
}

function StatCard({
  label,
  value,
  icon,
  iconBg,
  iconColor,
  border,
  valueColor,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  border: string;
  valueColor: string;
}) {
  return (
    <div className={`rounded-2xl border ${border} bg-white p-6 shadow-sm`}>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

function CandidateGroup({
  title,
  count,
  candidates,
  variant,
  headerIcon,
  badgeClass,
}: {
  title: string;
  count: number;
  candidates: SlaCandidateEntry[];
  variant: "breached" | "approaching" | "on-track";
  headerIcon: React.ReactNode;
  badgeClass: string;
}) {
  const styles = {
    breached: {
      card: "border-2 border-red-200",
      avatar: "bg-gradient-to-br from-red-500 to-red-600",
      daysColor: "text-red-600",
    },
    approaching: {
      card: "border-2 border-yellow-200",
      avatar: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      daysColor: "text-yellow-600",
    },
    "on-track": {
      card: "border border-gray-200",
      avatar: "bg-gradient-to-br from-green-500 to-green-600",
      daysColor: "text-gray-900",
    },
  }[variant];

  return (
    <section className="mb-8">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
        {headerIcon}
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeClass}`}>
          {count}
        </span>
      </div>
      <div className="space-y-3">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} styles={styles} variant={variant} />
        ))}
      </div>
    </section>
  );
}

function CandidateCard({
  candidate,
  styles,
  variant,
}: {
  candidate: SlaCandidateEntry;
  styles: { card: string; avatar: string; daysColor: string };
  variant: "breached" | "approaching" | "on-track";
}) {
  const remainingLabel =
    variant === "breached"
      ? "Overdue"
      : "Days Remaining";

  const remainingValue =
    candidate.overdueDays != null
      ? `${candidate.overdueDays} day${candidate.overdueDays !== 1 ? "s" : ""}`
      : candidate.daysRemaining != null
        ? `${candidate.daysRemaining} day${candidate.daysRemaining !== 1 ? "s" : ""}`
        : "—";

  const remainingBold = variant !== "on-track";

  return (
    <div
      className={`rounded-xl bg-white p-4 transition-shadow hover:shadow-lg sm:p-6 ${styles.card}`}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${styles.avatar}`}
          >
            {getInitials(candidate.name)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{candidate.name}</p>
            <p className="text-sm text-gray-600">{candidate.role}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Metric label="Current Stage" value={candidate.currentStage} />
          <Metric
            label="Days in Stage"
            value={`${candidate.daysInStage} days`}
            valueClass={variant !== "on-track" ? `font-bold ${styles.daysColor}` : "font-semibold text-gray-900"}
          />
          <Metric
            label="SLA Target"
            value={candidate.slaTarget != null ? `${candidate.slaTarget} days` : "—"}
          />
          <Metric
            label={remainingLabel}
            value={remainingValue}
            valueClass={
              remainingBold
                ? `font-bold ${styles.daysColor}`
                : "font-bold text-green-600"
            }
          />
          <Metric label="Recruiter" value={candidate.recruiter} />
          {variant === "on-track" && candidate.status && (
            <SlaBadge status={candidate.status} />
          )}
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  valueClass = "font-semibold text-gray-900",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="text-center">
      <p className="mb-1 text-xs text-gray-500">{label}</p>
      <p className={valueClass}>{value}</p>
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TrendingUpIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 7 13.5 15.5 8.5 10.5 2 17" />
      <path d="M16 7h6v6" />
    </svg>
  );
}

function CheckCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function AlertTriangleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}
