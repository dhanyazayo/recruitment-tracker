import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { createFeedback, listFeedback } from '../services/feedbackService.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const candidateId = typeof req.query.candidateId === 'string' ? req.query.candidateId : undefined;
    const feedback = await listFeedback(candidateId);
    res.json(feedback);
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { candidateId, stage, interviewerName, rating, content } = req.body;

    if (!candidateId || !stage || !interviewerName || !content) {
      return res.status(400).json({
        error: 'candidateId, stage, interviewerName, and content are required',
      });
    }

    const feedback = await createFeedback({
      candidateId,
      stage,
      interviewerName,
      rating,
      content,
    });
    res.status(201).json(feedback);
  }),
);

export default router;
