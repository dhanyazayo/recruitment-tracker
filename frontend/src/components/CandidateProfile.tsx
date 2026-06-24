"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Clock,
  MessageSquare,
  PauseCircle,
  PlayCircle,
  RotateCcw,
  Star,
  User,
  XCircle,
} from "lucide-react";
import { MoveToNextStageButton } from "@/app/candidates/[id]/MoveToNextStageButton";
import {
  fetchCandidateById,
  MOVE_SUCCESS_MESSAGE,
  postMoveToNextStage,
  validateMoveToNextStage,
} from "@/app/candidates/[id]/moveStage";
import { PipelineProgress } from "@/app/candidates/[id]/PipelineProgress";
import { API_URL, ApiError } from "@/lib/api";
import { postClientFeedback, putClientCandidate } from "@/lib/clientApi";
import { getNextStage, getStageLabel, STAGE_OPTIONS } from "@/lib/stages";
import type { CandidateDetail, FeedbackEntry } from "@/lib/types";

const RATING_OPTIONS = [1, 2, 3, 4, 5] as const;
const HOLD_PREFIX = "[HOLD]";
const REINTERVIEW_PREFIX = "[RE-INTERVIEW]";

type QuickRatingId = "strong_yes" | "yes" | "maybe" | "no";

const QUICK_RATING_OPTIONS: {
  id: QuickRatingId;
  label: string;
  value: number;
  selectedClass: string;
  defaultClass: string;
}[] = [
  {
    id: "strong_yes",
    label: "Strong Yes",
    value: 5,
    selectedClass: "border-green-400 bg-green-50 text-green-800",
    defaultClass: "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50",
  },
  {
    id: "yes",
    label: "Yes",
    value: 4,
    selectedClass: "border-[#FFC880] bg-[#FEF3E8] text-[#B85A10]",
    defaultClass: "border-gray-200 bg-white text-gray-700 hover:border-[#FFC880] hover:bg-[#FEF3E8]",
  },
  {
    id: "maybe",
    label: "Maybe",
    value: 3,
    selectedClass: "border-yellow-400 bg-yellow-50 text-yellow-800",
    defaultClass: "border-gray-200 bg-white text-gray-700 hover:border-yellow-300 hover:bg-yellow-50",
  },
  {
    id: "no",
    label: "No",
    value: 2,
    selectedClass: "border-red-400 bg-red-50 text-red-800",
    defaultClass: "border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50",
  },
];

type TabId = "profile" | "feedback" | "timeline";

type CandidateProfileProps = {
  candidate: CandidateDetail;
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StatusBadge({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}

function getSlaInfo(status: string | null) {
  switch (status) {
    case "on-track":
      return {
        label: "Within SLA",
        dotColor: "bg-green-500",
        boxBg: "bg-green-50",
        boxBorder: "border-green-200",
        textColor: "text-green-900",
        subTextColor: "text-green-700",
        starColor: "text-green-600",
      };
    case "approaching":
      return {
        label: "Approaching SLA",
        dotColor: "bg-yellow-500",
        boxBg: "bg-yellow-50",
        boxBorder: "border-yellow-200",
        textColor: "text-yellow-900",
        subTextColor: "text-yellow-700",
        starColor: "text-yellow-600",
      };
    case "breached":
      return {
        label: "SLA Breached",
        dotColor: "bg-red-500",
        boxBg: "bg-red-50",
        boxBorder: "border-red-200",
        textColor: "text-red-900",
        subTextColor: "text-red-700",
        starColor: "text-red-600",
      };
    default:
      return {
        label: "No SLA Data",
        dotColor: "bg-gray-400",
        boxBg: "bg-gray-50",
        boxBorder: "border-gray-200",
        textColor: "text-gray-900",
        subTextColor: "text-gray-600",
        starColor: "text-gray-500",
      };
  }
}

function getSlaSubtext(candidate: CandidateDetail) {
  if (candidate.daysRemaining !== null && candidate.daysRemaining >= 0) {
    return `${candidate.daysRemaining} day${candidate.daysRemaining === 1 ? "" : "s"} remaining`;
  }
  if (candidate.overdueDays !== null && candidate.overdueDays > 0) {
    return `${candidate.overdueDays} day${candidate.overdueDays === 1 ? "" : "s"} overdue`;
  }
  if (candidate.daysInStage !== null) {
    return `${candidate.daysInStage} day${candidate.daysInStage === 1 ? "" : "s"} in stage`;
  }
  return null;
}

const TABS: { id: TabId; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
  { id: "timeline", label: "Timeline", icon: Clock },
];

export function CandidateProfile({ candidate: initialCandidate }: CandidateProfileProps) {
  const router = useRouter();
  const [candidate, setCandidate] = useState(initialCandidate);
  const [feedback, setFeedback] = useState(initialCandidate.feedback);
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [actionError, setActionError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [quickComments, setQuickComments] = useState("");
  const [quickRating, setQuickRating] = useState("3");
  const [panelQuickRating, setPanelQuickRating] = useState<QuickRatingId | null>(null);
  const [panelQuickComments, setPanelQuickComments] = useState("");
  const [panelQuickError, setPanelQuickError] = useState("");
  const [fullStage, setFullStage] = useState(candidate.currentStage);
  const [fullRating, setFullRating] = useState("3");
  const [fullComments, setFullComments] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const [feedbackLoading, setFeedbackLoading] = useState<string | null>(null);

  const nextStage = getNextStage(candidate.currentStage);
  const isPipelineTerminal =
    candidate.currentStage === "SELECTED" || candidate.currentStage === "REJECTED";
  const isRejected = candidate.status === "Rejected";
  const isOnHold = candidate.status === "Hold";
  const hasReInterviewTag = candidate.statusTag === "Re-interview";
  const actionsDisabled = isPipelineTerminal || isRejected;
  const moveDisabled =
    isPipelineTerminal || !nextStage || candidate.status !== "Active";
  const slaInfo = getSlaInfo(candidate.slaStatus);
  const slaSubtext = getSlaSubtext(candidate);

  async function refreshCandidate() {
    const updatedCandidate = await fetchCandidateById(candidate.id);
    setCandidate(updatedCandidate);
    setFeedback(updatedCandidate.feedback);
    setFullStage(updatedCandidate.currentStage);
    router.refresh();
  }

  async function runAction(key: string, action: () => Promise<void>) {
    setActionError("");
    setActionMessage("");
    setActionLoading(key);
    try {
      await action();
      await refreshCandidate();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Action failed");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleMoveToNextStage() {
    const validation = validateMoveToNextStage(candidate, feedback);
    if (!validation.ok) {
      setActionMessage("");
      setActionError(validation.error);
      return;
    }

    await runAction("next", async () => {
      await postMoveToNextStage(candidate.id, validation.nextStage);
      setActionError("");
      setActionMessage(MOVE_SUCCESS_MESSAGE);
    });
  }

  async function handleReject() {
    await runAction("reject", async () => {
      await putClientCandidate(candidate.id, { status: "Rejected" });
      setActionMessage("Candidate rejected.");
    });
  }

  async function handleHold() {
    await runAction("hold", async () => {
      await putClientCandidate(candidate.id, { status: "Hold", statusTag: null });
      setActionMessage("Candidate marked on hold.");
    });
  }

  async function handleResume() {
    await runAction("resume", async () => {
      await putClientCandidate(candidate.id, { status: "Active", statusTag: null });
      setActionMessage("Candidate resumed.");
    });
  }

  async function handleReInterview() {
    await runAction("re-interview", async () => {
      await putClientCandidate(candidate.id, {
        status: "Active",
        statusTag: "Re-interview",
      });
      setActionMessage("Re-interview flag added.");
    });
  }

  async function handleFeedbackSuccess() {
    setFeedbackError("");
    setPanelQuickError("");
    setActionError("");
    setActionMessage("Feedback submitted successfully");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/candidates");
  }

  async function handlePanelQuickFeedbackSubmit() {
    if (feedbackLoading) {
      return;
    }

    if (!panelQuickRating) {
      setPanelQuickError("Please select a rating.");
      return;
    }

    const selectedOption = QUICK_RATING_OPTIONS.find((option) => option.id === panelQuickRating);
    if (!selectedOption) {
      return;
    }

    setPanelQuickError("");
    setFeedbackError("");
    setActionError("");
    setFeedbackLoading("panel-quick");
    try {
      await postClientFeedback({
        candidateId: candidate.id,
        stage: candidate.currentStage,
        interviewerName: candidate.recruiter,
        content: panelQuickComments.trim() || selectedOption.label,
        rating: selectedOption.value,
      });
      setPanelQuickComments("");
      setPanelQuickRating(null);
      await handleFeedbackSuccess();
    } catch (error) {
      setPanelQuickError(
        error instanceof ApiError ? error.message : "Failed to submit feedback",
      );
      setFeedbackLoading(null);
    }
  }

  async function submitFeedback(
    key: string,
    data: { stage: string; content: string; rating?: number },
  ) {
    if (feedbackLoading) {
      return;
    }

    if (!data.content.trim()) {
      setFeedbackError("Comments are required.");
      return;
    }

    const rating = data.rating;
    if (rating == null || Number.isNaN(rating)) {
      return;
    }

    const comments = data.content.trim();

    setFeedbackError("");
    setPanelQuickError("");
    setActionError("");
    setFeedbackLoading(key);
    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: candidate.id,
          stage: candidate.currentStage,
          rating,
          ...(comments ? { comments } : {}),
        }),
      });

      if (!response.ok) {
        let message = `Request failed: ${response.statusText}`;
        try {
          const body = (await response.json()) as { error?: string };
          if (body.error) {
            message = body.error;
          }
        } catch {
          // ignore non-JSON error bodies
        }
        throw new ApiError(message, response.status);
      }

      console.log("Feedback submitted successfully");
      setFeedbackLoading(null);
    } catch (error) {
      setFeedbackError(
        error instanceof ApiError ? error.message : "Failed to submit feedback",
      );
      setFeedbackLoading(null);
    }
  }

  const timelineEvents = [
    ...feedback.map((entry) => ({
      id: entry.id,
      event: entry.content.startsWith(HOLD_PREFIX)
        ? "Placed on hold"
        : entry.content.startsWith(REINTERVIEW_PREFIX)
          ? "Re-interview requested"
          : "Feedback submitted",
      user: entry.interviewerName,
      time: formatDate(entry.submittedAt),
      icon: entry.content.startsWith(HOLD_PREFIX)
        ? PauseCircle
        : entry.content.startsWith(REINTERVIEW_PREFIX)
          ? RotateCcw
          : MessageSquare,
    })),
    {
      id: "stage",
      event: `Current stage: ${candidate.stage}`,
      user: candidate.recruiter,
      time: `${candidate.daysInStage} days in stage`,
      icon: User,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#1A1C1E] sm:text-4xl">
          Candidate Profile &amp; Feedback Management
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-base text-gray-600 sm:text-lg">
          Complete candidate profiles with feedback tracking, activity timeline, and
          real-time status monitoring.
        </p>
      </div>

      {actionError ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {actionError}
        </p>
      ) : null}
      {actionMessage ? (
        <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {actionMessage}
        </p>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-200 bg-white p-6">
              <div className="mb-6 space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F47920] to-purple-500 text-xl font-bold text-white">
                      {getInitials(candidate.name)}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold text-[#1A1C1E]">{candidate.name}</h2>
                      <p className="text-gray-600">{candidate.role}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <div className="flex items-center gap-1.5">
                          <div className={`h-2 w-2 rounded-full ${slaInfo.dotColor}`} />
                          <span className={slaInfo.subTextColor}>{slaInfo.label}</span>
                        </div>
                        <span className="hidden text-gray-400 sm:inline">|</span>
                        <span className="text-gray-500">
                          Stage: {candidate.stage}
                          {hasReInterviewTag ? (
                            <>
                              <span className="text-gray-400"> | </span>
                              <StatusBadge className="bg-blue-50 text-blue-700">
                                Re-interview
                              </StatusBadge>
                            </>
                          ) : null}
                        </span>
                        {isOnHold ? (
                          <StatusBadge className="bg-yellow-50 text-yellow-800">
                            On Hold
                          </StatusBadge>
                        ) : null}
                        {isRejected ? (
                          <StatusBadge className="bg-red-50 text-red-700">Rejected</StatusBadge>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col gap-3 md:items-end">
                    <MoveToNextStageButton
                      onClick={handleMoveToNextStage}
                      loading={actionLoading === "next"}
                      disabled={moveDisabled}
                    />
                    <div className="flex flex-wrap gap-2">
                      {isOnHold ? (
                        <ActionButton
                          label="Resume Candidate"
                          icon={PlayCircle}
                          loading={actionLoading === "resume"}
                          disabled={actionsDisabled}
                          onClick={handleResume}
                          variant="resume"
                        />
                      ) : null}
                      <ActionButton
                        label="Reject"
                        icon={XCircle}
                        loading={actionLoading === "reject"}
                        disabled={actionsDisabled}
                        onClick={handleReject}
                        variant="reject"
                      />
                      <ActionButton
                        label="Hold"
                        icon={PauseCircle}
                        loading={actionLoading === "hold"}
                        disabled={actionsDisabled || isOnHold}
                        onClick={handleHold}
                        variant="hold"
                      />
                      <ActionButton
                        label="Re-Interview"
                        icon={RotateCcw}
                        loading={actionLoading === "re-interview"}
                        disabled={actionsDisabled || isOnHold}
                        onClick={handleReInterview}
                        variant="reinterview"
                      />
                    </div>
                  </div>
                </div>

                <PipelineProgress currentStage={candidate.currentStage} />
              </div>

              <div className="flex gap-1 border-b border-gray-200">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                        active
                          ? "border-[#F47920] text-[#F47920]"
                          : "border-transparent text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6">
              {activeTab === "profile" && (
                <dl className="grid gap-6 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="mb-1 font-medium text-gray-700">Contact</dt>
                    <dd className="space-y-1 text-gray-900">
                      <p>{candidate.email ?? "No email on file"}</p>
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-medium text-gray-700">Job</dt>
                    <dd className="text-gray-900">{candidate.job.title}</dd>
                    {candidate.job.department ? (
                      <dd className="text-gray-600">{candidate.job.department}</dd>
                    ) : null}
                  </div>
                  <div>
                    <dt className="mb-1 font-medium text-gray-700">Current Stage</dt>
                    <dd className="font-medium text-gray-900">{candidate.stage}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-medium text-gray-700">Assigned Recruiter</dt>
                    <dd className="font-medium text-gray-900">{candidate.recruiter}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-medium text-gray-700">Days in Stage</dt>
                    <dd className="font-medium text-gray-900">{candidate.daysInStage}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-medium text-gray-700">Status</dt>
                    <dd className="flex flex-wrap gap-2">
                      {isRejected ? (
                        <StatusBadge className="bg-red-50 text-red-700">Rejected</StatusBadge>
                      ) : isOnHold ? (
                        <StatusBadge className="bg-yellow-50 text-yellow-800">On Hold</StatusBadge>
                      ) : (
                        <StatusBadge className="bg-green-50 text-green-700">Active</StatusBadge>
                      )}
                      {hasReInterviewTag ? (
                        <StatusBadge className="bg-blue-50 text-blue-700">Re-interview</StatusBadge>
                      ) : null}
                      {candidate.hasPendingFeedback ? (
                        <StatusBadge className="bg-amber-50 text-amber-700">
                          Feedback pending
                        </StatusBadge>
                      ) : null}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <Link
                      href={`/candidates/${candidate.id}/edit`}
                      className="text-sm font-medium text-[#F47920] hover:text-[#D96510]"
                    >
                      Edit candidate details
                    </Link>
                  </div>
                </dl>
              )}

              {activeTab === "feedback" && (
                <div className="space-y-6">
                  {feedbackError ? (
                    <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {feedbackError}
                    </p>
                  ) : null}

                  <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <h3 className="text-sm font-semibold text-gray-800">Quick Feedback</h3>
                    <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
                      <input
                        type="text"
                        value={quickComments}
                        onChange={(e) => setQuickComments(e.target.value)}
                        placeholder="Comments"
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#F47920]"
                      />
                      <select
                        value={quickRating}
                        onChange={(e) => setQuickRating(e.target.value)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#F47920]"
                      >
                        {RATING_OPTIONS.map((value) => (
                          <option key={value} value={value}>
                            Rating: {value}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        disabled={feedbackLoading !== null}
                        onClick={() =>
                          submitFeedback("quick", {
                            stage: candidate.currentStage,
                            content: quickComments,
                            rating: Number(quickRating),
                          })
                        }
                        className="rounded-lg bg-[#F47920] px-4 py-2 text-sm font-medium text-white hover:bg-[#D96510] disabled:opacity-60"
                      >
                        {feedbackLoading === "quick" ? "Adding..." : "Quick Add Feedback"}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <h3 className="text-sm font-semibold text-gray-800">Submit Feedback</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Stage
                        </label>
                        <select
                          value={fullStage}
                          onChange={(e) => setFullStage(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#F47920]"
                        >
                          {STAGE_OPTIONS.filter((option) => option.value !== "REJECTED").map(
                            (option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ),
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Rating
                        </label>
                        <select
                          value={fullRating}
                          onChange={(e) => setFullRating(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#F47920]"
                        >
                          {RATING_OPTIONS.map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Comments
                        </label>
                        <textarea
                          value={fullComments}
                          onChange={(e) => setFullComments(e.target.value)}
                          rows={3}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#F47920]"
                          placeholder="Detailed feedback"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={feedbackLoading === "full"}
                      onClick={() =>
                        submitFeedback("full", {
                          stage: fullStage,
                          content: fullComments,
                          rating: Number(fullRating),
                        })
                      }
                      className="rounded-lg bg-[#1A1C1E] px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
                    >
                      {feedbackLoading === "full" ? "Submitting..." : "Submit Feedback"}
                    </button>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-800">Feedback History</h3>
                    {feedback.length === 0 ? (
                      <p className="text-sm text-gray-500">No feedback yet.</p>
                    ) : (
                      <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200">
                        {feedback.map((entry) => (
                          <li key={entry.id} className="px-4 py-3 text-sm">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-medium text-gray-900">{entry.stage}</span>
                              <span className="text-xs text-gray-500">
                                {formatDate(entry.submittedAt)}
                              </span>
                            </div>
                            <p className="mt-1 text-gray-700">{entry.content}</p>
                            {entry.rating ? (
                              <p className="mt-1 text-xs text-gray-500">
                                Rating: {entry.rating}/5
                              </p>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "timeline" && (
                <div className="space-y-4">
                  {timelineEvents.length === 0 ? (
                    <p className="text-sm text-gray-500">No activity yet.</p>
                  ) : (
                    timelineEvents.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.id} className="flex items-start gap-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FEF3E8]">
                            <Icon className="h-4 w-4 text-[#F47920]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900">{item.event}</p>
                            <p className="text-sm text-gray-600">
                              {item.user} &bull; {item.time}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h3 className="mb-4 font-semibold text-[#1A1C1E]">SLA Status</h3>
            <div className="space-y-4">
              <div
                className={`flex items-center justify-between rounded-xl border p-4 ${slaInfo.boxBg} ${slaInfo.boxBorder}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${slaInfo.dotColor}`} />
                  <div>
                    <div className={`font-medium ${slaInfo.textColor}`}>{slaInfo.label}</div>
                    {slaSubtext ? (
                      <div className={`text-xs ${slaInfo.subTextColor}`}>{slaSubtext}</div>
                    ) : null}
                  </div>
                </div>
                <Star className={`h-5 w-5 ${slaInfo.starColor}`} />
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-2 text-sm text-gray-600">SLA Targets</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{candidate.stage}:</span>
                    <span className="font-medium text-gray-900">
                      {candidate.slaTarget !== null ? `${candidate.slaTarget} days` : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current:</span>
                    <span
                      className={`font-medium ${
                        candidate.slaStatus === "breached"
                          ? "text-red-600"
                          : candidate.slaStatus === "approaching"
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {candidate.daysInStage} day{candidate.daysInStage === 1 ? "" : "s"}
                    </span>
                  </div>
                  {candidate.currentStage ? (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pipeline stage:</span>
                      <span className="font-medium text-gray-900">
                        {getStageLabel(candidate.currentStage)}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h3 className="mb-4 font-semibold text-[#1A1C1E]">Quick Feedback</h3>
            <div className="space-y-4">
              {panelQuickError ? (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {panelQuickError}
                </p>
              ) : null}

              <div>
                <label className="mb-2 block text-sm text-gray-700">Rating</label>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_RATING_OPTIONS.map((option) => {
                    const selected = panelQuickRating === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setPanelQuickRating(option.id);
                          setPanelQuickError("");
                        }}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                          selected ? option.selectedClass : option.defaultClass
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">Comments</label>
                <textarea
                  value={panelQuickComments}
                  onChange={(e) => setPanelQuickComments(e.target.value)}
                  rows={3}
                  placeholder="Share your feedback..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#F47920] focus:ring-1 focus:ring-[#F47920]"
                />
              </div>

              <button
                type="button"
                disabled={feedbackLoading === "panel-quick"}
                onClick={handlePanelQuickFeedbackSubmit}
                className="w-full rounded-lg bg-[#F47920] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#D96510] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {feedbackLoading === "panel-quick" ? "Submitting..." : "Submit Feedback"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  label,
  icon: Icon,
  onClick,
  loading,
  disabled,
  variant,
}: {
  label: string;
  icon: typeof XCircle;
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  variant: "reject" | "hold" | "reinterview" | "resume";
}) {
  const styles = {
    reject: "bg-red-50 text-red-600 border-red-200 hover:bg-red-100",
    hold: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
    reinterview: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
    resume: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {loading ? "..." : label}
    </button>
  );
}
