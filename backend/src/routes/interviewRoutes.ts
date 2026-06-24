import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { prisma } from '../lib/prisma.js';
import { parseStage, getStageLabel } from '../constants/stages.js';
import { AppError } from '../services/candidateService.js';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { candidateId, stage, scheduledAt } = req.body;

    if (!candidateId || !stage || !scheduledAt) {
      return res.status(400).json({
        error: 'candidateId, stage, and scheduledAt are required',
      });
    }

    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) {
      throw new AppError(404, 'Candidate not found');
    }

    const parsedStage = parseStage(stage);
    if (!parsedStage) {
      throw new AppError(400, `Invalid stage: ${stage}`);
    }

    const scheduledDate = new Date(scheduledAt);
    if (Number.isNaN(scheduledDate.getTime())) {
      throw new AppError(400, 'Invalid scheduledAt');
    }

    const interview = await prisma.interview.create({
      data: {
        candidateId,
        stage: parsedStage,
        scheduledAt: scheduledDate,
      },
    });

    res.status(201).json({
      id: interview.id,
      candidateId: interview.candidateId,
      stage: getStageLabel(interview.stage),
      scheduledAt: interview.scheduledAt,
    });
  }),
);

export default router;
