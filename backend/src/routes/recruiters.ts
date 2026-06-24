import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { getRouteParam } from '../lib/routeParams.js';
import {
  assignCandidatesToRecruiter,
  createRecruiter,
  deactivateRecruiter,
  getRecruiterById,
  listRecruiters,
  updateRecruiter,
} from '../services/recruiterService.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const recruiters = await listRecruiters();
    res.json(recruiters);
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const recruiter = await getRecruiterById(getRouteParam(req.params.id));
    if (!recruiter) {
      return res.status(404).json({ error: 'Recruiter not found' });
    }
    res.json(recruiter);
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, email, role, team, phone, status } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({
        error: 'name, email, and role are required',
      });
    }

    const recruiter = await createRecruiter({ name, email, role, team, phone, status });
    res.status(201).json(recruiter);
  }),
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { name, email, role, team, phone, status } = req.body;
    const recruiter = await updateRecruiter(getRouteParam(req.params.id), {
      name,
      email,
      role,
      team,
      phone,
      status,
    });
    res.json(recruiter);
  }),
);

router.patch(
  '/:id/deactivate',
  asyncHandler(async (req, res) => {
    const recruiter = await deactivateRecruiter(getRouteParam(req.params.id));
    res.json(recruiter);
  }),
);

router.post(
  '/:id/assign-candidates',
  asyncHandler(async (req, res) => {
    const { candidateIds } = req.body;
    if (!Array.isArray(candidateIds)) {
      return res.status(400).json({ error: 'candidateIds must be an array' });
    }
    const result = await assignCandidatesToRecruiter(getRouteParam(req.params.id), candidateIds);
    res.json(result);
  }),
);

export default router;
