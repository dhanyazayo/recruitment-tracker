import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { getRouteParam } from '../lib/routeParams.js';
import { parseCandidateStatusFilter } from '../constants/candidateStatus.js';
import {
  createCandidate,
  deleteCandidate,
  getCandidateById,
  listCandidates,
  updateCandidate,
} from '../services/candidateService.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const statusFilter = parseCandidateStatusFilter(req.query.status);
    const candidates = await listCandidates(statusFilter);
    res.json(candidates);
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const candidate = await getCandidateById(getRouteParam(req.params.id));
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.json(candidate);
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, email, role, stage, recruiterId, jobId } = req.body;

    if (!name || !role) {
      return res.status(400).json({
        error: 'name and role are required',
      });
    }

    if (!recruiterId) {
      return res.status(400).json({
        error: 'recruiterId is required',
      });
    }

    const candidate = await createCandidate({ name, email, role, stage, recruiterId, jobId });
    res.status(201).json(candidate);
  }),
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { name, email, role, stage, recruiterId, jobId, status, statusTag } = req.body;
    const candidate = await updateCandidate(getRouteParam(req.params.id), {
      name,
      email,
      role,
      stage,
      recruiterId,
      jobId,
      status,
      statusTag,
    });
    res.json(candidate);
  }),
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const result = await deleteCandidate(getRouteParam(req.params.id));
    res.json(result);
  }),
);

export default router;
