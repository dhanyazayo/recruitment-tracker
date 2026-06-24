import { BackendError } from "@/components/BackendError";
import { getCandidates, getDashboardSummary, getSlaStatus } from "@/lib/api";
import type { Candidate } from "@/lib/types";

export default async function ExecutiveReportsPage() {
  try {
    const [dashboard, sla, candidates] = await Promise.all([
      getDashboardSummary(),
      getSlaStatus(),
      getCandidates(),
    ]);

    const recruiterStats = buildRecruiterStats(candidates);
    const delayHotspots = buildDelayHotspots(sla.breached, sla.approaching);
    const maxStageCount = Math.max(...dashboard.pipelineStages.map((stage) => stage.count), 1);

    return (
      <div className="-mx-6 -mt-8 bg-gradient-to-b from-gray-50 to-white px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <header className="mb-10 text-center">
            <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Executive Hiring Analytics
            </h1>
            <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
              Real-time hiring metrics, stage distribution analysis, delay alerts, and recruiter
              performance tracking.
            </p>
          </header>

          <div className="overflow-hidden rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-xl">
            <div className="bg-gradient-to-r from-[#F47920] to-purple-600 p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  Executive Hiring Dashboard
                </h2>
                <p className="mt-1 text-sm text-[#FEE9D1]">Real-time overview from backend API</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <HeaderStatCard label="Active Candidates" value={dashboard.quickStats.active} />
                <HeaderStatCard label="Selected" value={dashboard.quickStats.selected} />
                <HeaderStatCard
                  label="At Risk (SLA)"
                  value={dashboard.quickStats.atRisk}
                  accent="yellow"
                />
                <HeaderStatCard label="Total Active" value={sla.summary.total} />
              </div>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-2">
                <section>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Pipeline Stages</h3>
                  <div className="space-y-3">
                    {dashboard.pipelineStages.map((stage) => (
                      <div
                        key={stage.currentStage}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className={`h-3 w-3 rounded-full ${stage.color}`} />
                            <span className="font-medium text-gray-900">{stage.stage}</span>
                          </div>
                          <span className="text-2xl font-bold text-gray-900">{stage.count}</span>
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

                <section>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Delay Hotspots</h3>
                  {delayHotspots.length === 0 ? (
                    <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                      <div className="flex items-center gap-2">
                        <CheckIcon className="text-green-600" />
                        <span className="font-medium text-green-900">No SLA delays detected</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {delayHotspots.map((hotspot) => {
                        const severity = getHotspotSeverity(hotspot.count, hotspot.avgDaysInStage);
                        return (
                          <div
                            key={hotspot.stage}
                            className={`rounded-xl border p-4 ${hotspotSeverityStyles[severity].card}`}
                          >
                            <div className="mb-2 flex items-start justify-between">
                              <div>
                                <div className="font-medium text-gray-900">{hotspot.stage}</div>
                                <div className="mt-1 text-sm text-gray-600">
                                  {hotspot.count} at-risk candidate{hotspot.count === 1 ? "" : "s"}
                                </div>
                              </div>
                              <AlertIcon className={hotspotSeverityStyles[severity].icon} />
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <ClockIcon />
                              <span>Avg {hotspot.avgDaysInStage} days in stage</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <HealthCard
                  title="Pipeline Health"
                  items={[
                    { label: "On track", value: dashboard.pipelineHealth.onTrack, tone: "green" },
                    {
                      label: "Approaching SLA",
                      value: dashboard.pipelineHealth.approaching,
                      tone: "yellow",
                    },
                    {
                      label: "Breached SLA",
                      value: dashboard.pipelineHealth.breached,
                      tone: "red",
                    },
                  ]}
                />
                <HealthCard
                  title="SLA Summary"
                  items={[
                    { label: "Total active", value: sla.summary.total, tone: "orange" },
                    { label: "On track", value: sla.summary.onTrack, tone: "green" },
                    { label: "Approaching", value: sla.summary.approaching, tone: "yellow" },
                    { label: "Breached", value: sla.summary.breached, tone: "red" },
                  ]}
                />
              </div>

              <section>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Recruiter Performance</h3>
                {recruiterStats.length === 0 ? (
                  <p className="text-sm text-gray-500">No recruiter data available.</p>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-4 gap-4 border-b border-gray-200 bg-white p-4 text-sm font-medium text-gray-600">
                      <div>Recruiter</div>
                      <div>Active</div>
                      <div>Selected</div>
                      <div>At Risk</div>
                    </div>
                    {recruiterStats.map((stat, index) => (
                      <div
                        key={stat.recruiter}
                        className={`grid grid-cols-4 gap-4 border-b border-gray-200 p-4 text-sm last:border-0 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <div className="font-medium text-gray-900">{stat.recruiter}</div>
                        <div className="text-gray-700">{stat.active}</div>
                        <div className="font-semibold text-[#F47920]">{stat.selected}</div>
                        <div>
                          {stat.atRisk > 0 ? (
                            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                              {stat.atRisk}
                            </span>
                          ) : (
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                              0
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Executive Reports</h1>
        <BackendError message={message} />
      </div>
    );
  }
}

function HeaderStatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "yellow";
}) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">
      <p className="mb-1 text-sm text-[#FEE9D1]">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      {accent === "yellow" && value > 0 && (
        <p className="mt-2 flex items-center gap-1 text-xs text-yellow-200">
          <AlertIcon className="text-yellow-200" />
          Needs attention
        </p>
      )}
    </div>
  );
}

function HealthCard({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: number; tone: "green" | "yellow" | "red" | "orange" }[];
}) {
  const toneStyles = {
    green: "bg-green-50 border-green-200 text-green-900",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-900",
    red: "bg-red-50 border-red-200 text-red-900",
    orange: "bg-[#FEF3E8] border-[#FCD5A8] text-[#7A3A08]",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-4 text-base font-semibold text-gray-900">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${toneStyles[item.tone]}`}
          >
            <span>{item.label}</span>
            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const hotspotSeverityStyles = {
  high: {
    card: "bg-red-50 border-red-200",
    icon: "text-red-600",
  },
  medium: {
    card: "bg-yellow-50 border-yellow-200",
    icon: "text-yellow-600",
  },
  low: {
    card: "bg-[#FEF3E8] border-[#FCD5A8]",
    icon: "text-[#F47920]",
  },
} as const;

function getHotspotSeverity(count: number, avgDays: number): keyof typeof hotspotSeverityStyles {
  if (count >= 4 || avgDays >= 7) return "high";
  if (count >= 2 || avgDays >= 4) return "medium";
  return "low";
}

function ClockIcon() {
  return (
    <svg
      className="h-4 w-4 text-gray-500"
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

function AlertIcon({ className = "h-5 w-5 text-gray-500" }: { className?: string }) {
  return (
    <svg
      className={className}
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

function CheckIcon({ className = "h-5 w-5 text-gray-500" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

type RecruiterStat = {
  recruiter: string;
  active: number;
  selected: number;
  atRisk: number;
};

function buildRecruiterStats(candidates: Candidate[]): RecruiterStat[] {
  const stats = new Map<string, RecruiterStat>();

  for (const candidate of candidates) {
    const existing = stats.get(candidate.recruiter) ?? {
      recruiter: candidate.recruiter,
      active: 0,
      selected: 0,
      atRisk: 0,
    };

    if (candidate.stage === "Selected") {
      existing.selected += 1;
    } else if (candidate.status !== "Rejected" && candidate.stage !== "Rejected") {
      existing.active += 1;
    }

    if (
      candidate.slaStatus === "approaching" ||
      candidate.slaStatus === "breached" ||
      candidate.slaStatus === "yellow" ||
      candidate.slaStatus === "red"
    ) {
      existing.atRisk += 1;
    }

    stats.set(candidate.recruiter, existing);
  }

  return Array.from(stats.values()).sort((a, b) => b.active - a.active);
}

type DelayHotspot = {
  stage: string;
  count: number;
  avgDaysInStage: number;
};

function buildDelayHotspots(
  breached: { currentStage: string; daysInStage: number }[],
  approaching: { currentStage: string; daysInStage: number }[],
): DelayHotspot[] {
  const atRisk = [...breached, ...approaching];
  const byStage = new Map<string, { count: number; totalDays: number }>();

  for (const entry of atRisk) {
    const existing = byStage.get(entry.currentStage) ?? { count: 0, totalDays: 0 };
    existing.count += 1;
    existing.totalDays += entry.daysInStage;
    byStage.set(entry.currentStage, existing);
  }

  return Array.from(byStage.entries())
    .map(([stage, data]) => ({
      stage,
      count: data.count,
      avgDaysInStage: Math.round(data.totalDays / data.count),
    }))
    .sort((a, b) => b.count - a.count);
}
