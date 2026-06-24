import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { moveCandidate } from '../services/pipelineService.js';

const router = Router();

router.post(
  '/move',
  asyncHandler(async (req, res) => {
    const { candidateId, targetStage } = req.body;

    if (!candidateId || !targetStage) {
      return res.status(400).json({
        error: 'candidateId and targetStage are required',
      });
    }

    const result = await moveCandidate(candidateId, targetStage);
    res.json(result);
  }),
);

export default router;
