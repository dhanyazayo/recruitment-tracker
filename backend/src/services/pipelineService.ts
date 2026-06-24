import { Stage } from '@prisma/client';
import { NON_REJECTED_CANDIDATE_WHERE } from '../constants/candidateStatus.js';
import { prisma } from '../lib/prisma.js';
import { getStageLabel, isValidTransition, parseStage } from '../constants/stages.js';
import { AppError } from './candidateService.js';

export async function moveCandidate(candidateId: string, targetStageInput: string) {
  const targetStage = parseStage(targetStageInput);
  if (!targetStage) {
    throw new AppError(400, `Invalid stage: ${targetStageInput}`);
  }

  const candidate = await prisma.candidate.findUnique({
    where: { id: candidateId },
    include: { feedback: true },
  });

  if (!candidate) {
    throw new AppError(404, 'Candidate not found');
  }

  if (candidate.currentStage === targetStage) {
    throw new AppError(400, 'Candidate is already in this stage');
  }

  if (!isValidTransition(candidate.currentStage, targetStage)) {
    throw new AppError(
      400,
      `Cannot move from ${getStageLabel(candidate.currentStage)} to ${getStageLabel(targetStage)}. Stage skipping is not allowed.`,
    );
  }

  const hasFeedbackForCurrentStage = candidate.feedback.some(
    (item) => item.stage === candidate.currentStage,
  );

  if (!hasFeedbackForCurrentStage) {
    throw new AppError(
      400,
      `Feedback is required for ${getStageLabel(candidate.currentStage)} before moving to the next stage`,
    );
  }

  const fromStage = candidate.currentStage;

  const updated = await prisma.$transaction(async (tx) => {
    await tx.stageHistory.create({
      data: {
        candidateId,
        fromStage,
        toStage: targetStage,
        notes: `Moved to ${getStageLabel(targetStage)}`,
      },
    });

    return tx.candidate.update({
      where: { id: candidateId },
      data: {
        currentStage: targetStage,
        stageEnteredAt: new Date(),
      },
      include: { job: true, feedback: true },
    });
  });

  return {
    id: updated.id,
    name: updated.name,
    previousStage: getStageLabel(fromStage),
    currentStage: getStageLabel(updated.currentStage),
    stage: getStageLabel(updated.currentStage),
    stageEnteredAt: updated.stageEnteredAt,
  };
}

export async function getPipelineStages() {
  const grouped = await prisma.candidate.groupBy({
    by: ['currentStage'],
    where: NON_REJECTED_CANDIDATE_WHERE,
    _count: { _all: true },
  });

  const counts = new Map(grouped.map((item) => [item.currentStage, item._count._all]));

  const pipelineStages = [
    Stage.FOUND,
    Stage.INITIAL_DISCUSSION,
    Stage.FIRST_ROUND,
    Stage.SECOND_ROUND,
    Stage.HR_ROUND,
    Stage.SELECTED,
  ].map((stage) => ({
    stage: getStageLabel(stage),
    currentStage: stage,
    count: counts.get(stage) ?? 0,
  }));

  return pipelineStages;
}
