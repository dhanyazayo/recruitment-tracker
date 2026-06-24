import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { getSlaStatus } from '../services/slaService.js';

const router = Router();

router.get(
  '/status',
  asyncHandler(async (_req, res) => {
    const status = await getSlaStatus();
    res.json(status);
  }),
);

export default router;
