import Link from "next/link";
import { BackendError } from "@/components/BackendError";
import { getDashboardSummary } from "@/lib/api";

export default async function DashboardPage() {
  try {
    const data = await getDashboardSummary();
    const maxStageCount = Math.max(...data.pipelineStages.map((stage) => stage.count), 1);
    const recentCandidates = data.recentCandidates.slice(0, 3);
    const healthMax = Math.max(
      data.pipelineHealth.onTrack,
      data.pipelineHealth.approaching,
      data.pipelineHealth.breached,
      1,
    );

    return (
      <div className="-mx-6 -mt-8 bg-gradient-to-b from-gray-50 to-white px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <header className="mb-6 flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Recruitment Overview</h1>
              <div className="flex gap-2">
                <span className="rounded-lg bg-[#FEF3E8] px-3 py-1.5 text-sm font-medium text-[#F47920]">
                  Live
                </span>
                <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-600">
                  This Week
                </span>
              </div>
            </header>

            <section className="mb-6 grid grid-cols-3 gap-4">
              <StatCard label="Active" value={data.quickStats.active} variant="active" />
              <StatCard label="Selected" value={data.quickStats.selected} variant="selected" />
              <StatCard label="At Risk" value={data.quickStats.atRisk} variant="atRisk" />
            </section>

            <section className="mb-6">
              <h2 className="mb-4 font-semibold text-gray-900">Active Pipeline</h2>
              <div className="space-y-3">
                {data.pipelineStages.map((stage) => (
                  <div
                    key={stage.currentStage}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`h-3 w-3 rounded-full ${stage.color}`} />
                        <span className="font-medium text-gray-900">{stage.stage}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{stage.count}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className={`h-2 rounded-full ${stage.color}`}
                        style={{ width: `${(stage.count / maxStageCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <h2 className="mb-3 text-sm font-semibold text-gray-700">Recent Activity</h2>
              <div className="space-y-3">
                {recentCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="rounded-lg border border-gray-200 bg-white p-4"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#F47920] to-purple-500 text-sm font-semibold text-white">
                          {getInitials(candidate.name)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{candidate.name}</p>
                          <p className="text-xs text-gray-500">{candidate.role}</p>
                        </div>
                      </div>
                      <span
                        className={`mt-1 h-2 w-2 rounded-full ${getSlaDotColor(candidate.slaStatus)}`}
                      />
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <ClockIcon />
                        {candidate.daysInStage} days
                      </span>
                      {candidate.hasPendingFeedback && (
                        <span className="flex items-center gap-1">
                          <AlertIcon />
                          Feedback pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <Link
                href="/sla-breakdown"
                className="block rounded-xl border-2 border-red-300 bg-red-50 p-4 hover:border-red-400 hover:bg-red-100"
              >
                <div className="mb-2 flex items-center gap-2">
                  <ClockIcon className="text-red-600" />
                  <span className="text-sm font-medium text-red-900">
                    {data.slaAlert.count} candidates approaching SLA breach
                  </span>
                </div>
                <span className="text-xs font-semibold text-red-600 underline decoration-2 underline-offset-2">
                  View SLA Breakdown →
                </span>
              </Link>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:min-w-[180px]">
                <p className="mb-2 text-xs font-medium text-gray-600">Pipeline Health</p>
                <div className="flex items-end gap-2">
                  <div className="flex items-end gap-1">
                    <HealthBar
                      count={data.pipelineHealth.onTrack}
                      max={healthMax}
                      color="bg-green-500"
                    />
                    <HealthBar
                      count={data.pipelineHealth.approaching}
                      max={healthMax}
                      color="bg-yellow-500"
                    />
                    <HealthBar
                      count={data.pipelineHealth.breached}
                      max={healthMax}
                      color="bg-red-500"
                    />
                  </div>
                  <div className="text-xs text-gray-600">
                    <p>{data.pipelineHealth.onTrack} on track</p>
                    <p>{data.pipelineHealth.approaching} approaching</p>
                    <p>{data.pipelineHealth.breached} breached</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Recruitment Overview</h1>
        <BackendError message={message} />
      </div>
    );
  }
}

function StatCard({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant: "active" | "selected" | "atRisk";
}) {
  const styles = {
    active: {
      card: "bg-[#FEF3E8]",
      label: "text-[#F47920]",
      value: "text-[#7A3A08]",
    },
    selected: {
      card: "bg-green-50",
      label: "text-green-600",
      value: "text-green-900",
    },
    atRisk: {
      card: "bg-yellow-50",
      label: "text-yellow-600",
      value: "text-yellow-900",
    },
  }[variant];

  return (
    <div className={`rounded-xl p-4 ${styles.card}`}>
      <p className={`mb-1 text-xs font-medium ${styles.label}`}>{label}</p>
      <p className={`text-2xl font-bold ${styles.value}`}>{value}</p>
    </div>
  );
}

function HealthBar({
  count,
  max,
  color,
}: {
  count: number;
  max: number;
  color: string;
}) {
  const height = Math.max(12, Math.round((count / max) * 32));
  return <div className={`w-2 rounded ${color}`} style={{ height: `${height}px` }} />;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getSlaDotColor(status: string): string {
  switch (status) {
    case "green":
    case "on-track":
      return "bg-green-500";
    case "yellow":
    case "approaching":
      return "bg-yellow-500";
    case "red":
    case "breached":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
}

function ClockIcon({ className = "text-gray-500" }: { className?: string }) {
  return (
    <svg
      className={`h-3 w-3 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      className="h-3 w-3 text-gray-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}
