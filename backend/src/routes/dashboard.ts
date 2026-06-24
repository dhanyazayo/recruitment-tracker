import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import {
  getDashboardSummary,
  getDefaultDashboardSummary,
} from '../services/dashboardService.js';

const router = Router();

router.get(
  '/summary',
  asyncHandler(async (_req, res) => {
    try {
      const summary = await getDashboardSummary();
      res.json(summary);
    } catch (error) {
      console.error('Dashboard summary route error:', error);
      res.json(getDefaultDashboardSummary());
    }
  }),
);

export default router;
