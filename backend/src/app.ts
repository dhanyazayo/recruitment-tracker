import express from 'express';
import cors from 'cors';
import dashboardRoutes from './routes/dashboard.js';
import candidateRoutes from './routes/candidates.js';
import pipelineRoutes from './routes/pipeline.js';
import feedbackRoutes from './routes/feedback.js';
import slaRoutes from './routes/sla.js';
import recruiterRoutes from './routes/recruiters.js';
import interviewRoutes from './routes/interviewRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/pipeline', pipelineRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/sla', slaRoutes);
app.use('/api/recruiters', recruiterRoutes);
app.use('/api/interviews', interviewRoutes);

app.use(errorHandler);

export default app;
