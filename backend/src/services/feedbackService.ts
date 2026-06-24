import { Stage } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { parseStage, getStageLabel } from '../constants/stages.js';
import { AppError } from './candidateService.js';

export async function createFeedback(data: {
  candidateId: string;
  stage: string;
  interviewerName: string;
  rating?: number;
  content: string;
}) {
  const candidate = await prisma.candidate.findUnique({
    where: { id: data.candidateId },
  });

  if (!candidate) {
    throw new AppError(404, 'Candidate not found');
  }

  const stage = parseStage(data.stage);
  if (!stage) {
    throw new AppError(400, `Invalid stage: ${data.stage}`);
  }

  if (data.rating !== undefined && (data.rating < 1 || data.rating > 5)) {
    throw new AppError(400, 'Rating must be between 1 and 5');
  }

  const feedback = await prisma.feedback.create({
    data: {
      candidateId: data.candidateId,
      stage,
      interviewerName: data.interviewerName,
      rating: data.rating,
      content: data.content,
    },
  });

  return {
    id: feedback.id,
    candidateId: feedback.candidateId,
    stage: getStageLabel(feedback.stage),
    interviewerName: feedback.interviewerName,
    rating: feedback.rating,
    content: feedback.content,
    submittedAt: feedback.submittedAt,
  };
}

export async function listFeedback(candidateId?: string) {
  const feedback = await prisma.feedback.findMany({
    where: candidateId ? { candidateId } : undefined,
    include: {
      candidate: {
        select: { id: true, name: true },
      },
    },
    orderBy: { submittedAt: 'desc' },
  });

  return feedback.map((item) => ({
    id: item.id,
    candidateId: item.candidateId,
    candidateName: item.candidate.name,
    stage: getStageLabel(item.stage),
    interviewerName: item.interviewerName,
    rating: item.rating,
    content: item.content,
    submittedAt: item.submittedAt,
  }));
}
