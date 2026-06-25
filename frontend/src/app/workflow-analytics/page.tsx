import { ArrowDown } from "lucide-react";
import { BackendError } from "@/components/BackendError";
import {
  getCandidates,
  getDashboardSummary,
  getRecruiters,
  getSlaStatus,
} from "@/lib/api";
import type { Candidate, SlaCandidateEntry } from "@/lib/types";

export default async function WorkflowAnalyticsPage() {
  try {
    const [dashboard, sla, candidates, recruiters] = await Promise.all([
      getDashboardSummary(),
      getSlaStatus(),
      getCandidates(),
      getRecruiters(),
    ]);

    const stageMetrics = buildStageMetrics(sla.candidates, sla.slaTargets);
    const outcomes = buildOutcomeStats(candidates);
    const totalInPipeline = dashboard.pipelineStages.reduce((sum, s) => sum + s.count, 0);
    const summary = buildSummaryStats(dashboard.pipelineStages, stageMetrics, outcomes, totalInPipeline);

    return (
      <div className="bg-gradient-to-br from-gray-50 via-[#FEF3E8]/30 to-purple-50/30 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-16 text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Hiring Workflow &amp; Stage Analytics
            </h1>
            <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-xl">
              Track candidates through every stage with real-time metrics, conversion rates,
              and bottleneck detection.
            </p>
          </header>

          <div className="flex flex-col items-center gap-6">
            {dashboard.pipelineStages.map((stage, index) => {
              const metrics = stageMetrics.get(stage.stage);
              const conversion = getConversionRate(dashboard.pipelineStages, index);
              const gradient = getStageGradient(stage.currentStage);

              return (
                <div key={stage.currentStage} className="w-full">
                  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-lg sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-6">
                        <div
                          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
                        >
                          <span className="text-2xl font-bold text-white">{stage.count}</span>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                            {stage.stage}
                          </h2>
                          <p className="text-sm text-gray-500">Current candidates in stage</p>
                        </div>
                      </div>

                      <div className="flex gap-8 sm:gap-10">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {metrics?.avgDaysInStage ?? "—"}
                          </div>
                          <div className="mt-1 text-xs text-gray-500">Avg Days</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#F47920]">
                            {conversion != null ? `${conversion}%` : "—"}
                          </div>
                          <div className="mt-1 text-xs text-gray-500">Conversion</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${gradient}`}
                          style={{ width: `${conversion ?? 50}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {index < dashboard.pipelineStages.length - 1 && (
                    <div className="my-4 flex justify-center">
                      <ArrowDown className="h-8 w-8 text-gray-400" aria-hidden />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <section className="mt-12 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SummaryCard label="Total Active" value={String(summary.totalActive)} />
            <SummaryCard
              label="Avg per Stage"
              value={`${summary.avgPerStage} days`}
              valueClass="text-[#F47920]"
            />
            <SummaryCard
              label="Overall Conversion"
              value={`${summary.overallConversion}%`}
              valueClass="text-green-600"
            />
            <SummaryCard
              label="Time to Hire"
              value={`${summary.timeToHire} days`}
              valueClass="text-purple-600"
            />
          </section>

          <section className="mt-12">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Pipeline Health</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <HealthStatCard
                label="On track"
                value={dashboard.pipelineHealth.onTrack}
                tone="green"
              />
              <HealthStatCard
                label="Approaching SLA"
                value={dashboard.pipelineHealth.approaching}
                tone="yellow"
              />
              <HealthStatCard
                label="Breached SLA"
                value={dashboard.pipelineHealth.breached}
                tone="red"
              />
            </div>
          </section>

          <section className="mt-12">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Recruiter Workflow</h2>
              {recruiters.length === 0 ? (
                <p className="text-sm text-gray-500">No recruiter data available.</p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <div className="grid min-w-[480px] grid-cols-2 gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600 sm:grid-cols-5">
                    <div className="sm:col-span-1">Recruiter</div>
                    <div>Active</div>
                    <div>Selected</div>
                    <div className="hidden sm:block">Conversion</div>
                    <div className="hidden sm:block">SLA compliance</div>
                  </div>
                  {recruiters.map((recruiter, index) => (
                    <div
                      key={recruiter.id}
                      className={`grid min-w-[480px] grid-cols-2 gap-4 border-b border-gray-100 px-4 py-3 text-sm last:border-0 sm:grid-cols-5 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <div className="font-medium text-gray-900">{recruiter.name}</div>
                      <div className="text-gray-700">{recruiter.activeCandidates}</div>
                      <div className="font-semibold text-[#F47920]">{recruiter.selectedCount}</div>
                      <div className="hidden text-gray-700 sm:block">
                        {formatPercent(recruiter.conversionRate)}
                      </div>
                      <div className="hidden text-gray-700 sm:block">
                        {formatPercent(recruiter.slaCompliancePercent)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="mt-12">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h2>
              {dashboard.recentCandidates.length === 0 ? (
                <p className="text-sm text-gray-500">No recent candidate activity.</p>
              ) : (
                <div className="space-y-3">
                  {dashboard.recentCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-4"
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
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span>{candidate.stage}</span>
                        <span className="flex items-center gap-1">
                          <ClockIcon />
                          {candidate.daysInStage} days in stage
                        </span>
                        <span>{candidate.recruiter}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return (
      <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold sm:text-2xl">Workflow Analytics</h1>
        <BackendError message={message} />
      </div>
    );
  }
}

function SummaryCard({
  label,
  value,
  valueClass = "text-gray-900",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
      <div className={`text-3xl font-bold ${valueClass}`}>{value}</div>
      <div className="mt-1 text-sm text-gray-600">{label}</div>
    </div>
  );
}

function HealthStatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "green" | "yellow" | "red";
}) {
  const styles = {
    green: "border-green-200 bg-green-50 text-green-900",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-900",
    red: "border-red-200 bg-red-50 text-red-900",
  }[tone];

  return (
    <div className={`rounded-xl border p-5 text-center ${styles}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="mt-1 text-sm opacity-80">{label}</div>
    </div>
  );
}

type StageMetric = {
  avgDaysInStage: number;
  slaTarget: number | null;
  onTrack: number;
  atRisk: number;
};

function buildStageMetrics(
  slaCandidates: SlaCandidateEntry[],
  slaTargets: { stage: string; targetDays: number }[],
): Map<string, StageMetric> {
  const targetByLabel = new Map(slaTargets.map((t) => [t.stage, t.targetDays]));
  const byStage = new Map<
    string,
    { totalDays: number; count: number; onTrack: number; atRisk: number; label: string }
  >();

  for (const entry of slaCandidates) {
    const existing = byStage.get(entry.currentStage) ?? {
      totalDays: 0,
      count: 0,
      onTrack: 0,
      atRisk: 0,
      label: entry.currentStage,
    };
    existing.totalDays += entry.daysInStage;
    existing.count += 1;
    if (entry.status === "on-track") {
      existing.onTrack += 1;
    } else if (entry.status === "approaching" || entry.status === "breached") {
      existing.atRisk += 1;
    }
    byStage.set(entry.currentStage, existing);
  }

  const result = new Map<string, StageMetric>();
  for (const [stage, data] of byStage) {
    result.set(stage, {
      avgDaysInStage: Math.round(data.totalDays / data.count),
      slaTarget: targetByLabel.get(stage) ?? null,
      onTrack: data.onTrack,
      atRisk: data.atRisk,
    });
  }
  return result;
}

function buildOutcomeStats(candidates: Candidate[]) {
  let selected = 0;
  let rejected = 0;
  for (const candidate of candidates) {
    if (candidate.stage === "Selected") {
      selected += 1;
    } else if (candidate.stage === "Rejected" || candidate.status === "Rejected") {
      rejected += 1;
    }
  }
  return { selected, rejected };
}

function buildSummaryStats(
  pipelineStages: { stage: string; count: number }[],
  stageMetrics: Map<string, StageMetric>,
  outcomes: { selected: number; rejected: number },
  totalInPipeline: number,
) {
  const avgDays = pipelineStages
    .map((stage) => stageMetrics.get(stage.stage)?.avgDaysInStage)
    .filter((value): value is number => value != null);

  const avgPerStage =
    avgDays.length > 0
      ? Math.round((avgDays.reduce((sum, value) => sum + value, 0) / avgDays.length) * 10) / 10
      : 0;

  const timeToHire = avgDays.reduce((sum, value) => sum + value, 0);

  const foundCount = pipelineStages[0]?.count ?? 0;
  const overallConversion =
    foundCount > 0 ? Math.round((outcomes.selected / foundCount) * 100) : 0;

  return {
    totalActive: totalInPipeline,
    avgPerStage,
    overallConversion,
    timeToHire,
  };
}

function getConversionRate(
  stages: { count: number }[],
  index: number,
): number | null {
  if (index >= stages.length - 1) {
    return null;
  }

  const current = stages[index].count;
  const next = stages[index + 1].count;
  if (current === 0) {
    return 0;
  }

  return Math.round((next / current) * 100);
}

function getStageGradient(currentStage: string): string {
  const gradients: Record<string, string> = {
    FOUND: "from-gray-400 to-gray-500",
    INITIAL_DISCUSSION: "from-blue-400 to-blue-500",
    FIRST_ROUND: "from-purple-400 to-purple-500",
    SECOND_ROUND: "from-indigo-400 to-indigo-500",
    HR_ROUND: "from-green-400 to-green-500",
    SELECTED: "from-emerald-400 to-emerald-500",
  };

  return gradients[currentStage] ?? "from-gray-400 to-gray-500";
}

function formatPercent(value: number | null): string {
  if (value == null) return "—";
  return `${Math.round(value)}%`;
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

function ClockIcon() {
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
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
