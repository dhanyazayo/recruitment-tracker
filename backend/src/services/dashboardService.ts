import { CandidateStatus, Stage } from '@prisma/client';
import { NON_REJECTED_CANDIDATE_WHERE } from '../constants/candidateStatus.js';
import { prisma } from '../lib/prisma.js';
import { calculateSlaStatus, SLA_STATUS_COLORS } from '../constants/sla.js';
import { getStageLabel, STAGE_COLORS, TERMINAL_STAGES } from '../constants/stages.js';
import { getAtRiskCount } from './slaService.js';
import { getPipelineStages } from './pipelineService.js';

const PIPELINE_STAGE_ORDER: Stage[] = [
  Stage.FOUND,
  Stage.INITIAL_DISCUSSION,
  Stage.FIRST_ROUND,
  Stage.SECOND_ROUND,
  Stage.HR_ROUND,
  Stage.SELECTED,
];

function getDefaultPipelineStages() {
  return PIPELINE_STAGE_ORDER.map((stage) => ({
    stage: getStageLabel(stage),
    currentStage: stage,
    count: 0,
    color: STAGE_COLORS[stage],
  }));
}

export function getDefaultDashboardSummary() {
  return {
    quickStats: {
      active: 0,
      selected: 0,
      atRisk: 0,
    },
    pipelineStages: getDefaultPipelineStages(),
    recentCandidates: [] as {
      id: string;
      name: string;
      role: string;
      stage: string;
      daysInStage: number;
      slaStatus: string;
      recruiter: string;
      hasPendingFeedback: boolean;
    }[],
    slaAlert: {
      count: 0,
      severity: 'warning' as const,
    },
    pipelineHealth: {
      onTrack: 0,
      approaching: 0,
      breached: 0,
    },
  };
}

export async function getDashboardSummary() {
  try {
    const [candidatesResult, pipelineStagesResult, atRiskCountResult] = await Promise.all([
      prisma.candidate.findMany({
        where: NON_REJECTED_CANDIDATE_WHERE,
        include: { job: true, feedback: true, recruiter: true },
        orderBy: { updatedAt: 'desc' },
      }),
      getPipelineStages(),
      getAtRiskCount(),
    ]);

    const candidates = Array.isArray(candidatesResult) ? candidatesResult : [];
    const pipelineStages = Array.isArray(pipelineStagesResult) ? pipelineStagesResult : [];
    const atRiskCount = typeof atRiskCountResult === 'number' ? atRiskCountResult : 0;

    const active = candidates.filter(
      (candidate) =>
        candidate.status !== CandidateStatus.Rejected &&
        candidate?.currentStage &&
        !TERMINAL_STAGES.includes(candidate.currentStage),
    ).length;

    const selected = candidates.filter(
      (candidate) => candidate?.currentStage === Stage.SELECTED,
    ).length;

    const slaCounts = { onTrack: 0, approaching: 0, breached: 0 };

    for (const candidate of candidates) {
      if (
        candidate.status === CandidateStatus.Rejected ||
        !candidate?.currentStage ||
        TERMINAL_STAGES.includes(candidate.currentStage)
      ) {
        continue;
      }

      if (!candidate.stageEnteredAt) {
        continue;
      }

      const { status } = calculateSlaStatus(candidate.currentStage, candidate.stageEnteredAt);
      if (status === 'on-track') slaCounts.onTrack += 1;
      if (status === 'approaching') slaCounts.approaching += 1;
      if (status === 'breached') slaCounts.breached += 1;
    }

    const recentCandidates = candidates.slice(0, 5).map((candidate) => {
      const feedback = Array.isArray(candidate.feedback) ? candidate.feedback : [];
      const sla = candidate.stageEnteredAt
        ? calculateSlaStatus(candidate.currentStage, candidate.stageEnteredAt)
        : { daysInStage: 0, status: null };
      const hasFeedbackForCurrentStage = feedback.some(
        (item) => item?.stage === candidate.currentStage,
      );

      return {
        id: candidate.id,
        name: candidate.name,
        role: candidate.role,
        stage: getStageLabel(candidate.currentStage),
        daysInStage: sla.daysInStage,
        slaStatus: sla.status ? SLA_STATUS_COLORS[sla.status] : 'gray',
        recruiter: candidate.recruiter?.name ?? 'Unassigned',
        hasPendingFeedback:
          !TERMINAL_STAGES.includes(candidate.currentStage) && !hasFeedbackForCurrentStage,
      };
    });

    const stagesWithColors = (pipelineStages.length > 0 ? pipelineStages : getDefaultPipelineStages()).map(
      (stage) => ({
        ...stage,
        count: stage.count ?? 0,
        color: STAGE_COLORS[stage.currentStage] ?? 'bg-gray-400',
      }),
    );

    return {
      quickStats: {
        active,
        selected,
        atRisk: atRiskCount,
      },
      pipelineStages: stagesWithColors,
      recentCandidates,
      slaAlert: {
        count: atRiskCount,
        severity: slaCounts.breached > 0 ? 'critical' : 'warning',
      },
      pipelineHealth: slaCounts,
    };
  } catch (error) {
    console.error('Failed to load dashboard summary:', error);
    return getDefaultDashboardSummary();
  }
}
