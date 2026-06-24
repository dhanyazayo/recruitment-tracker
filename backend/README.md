# Recruitment Tracker Backend

Node.js + Express API with PostgreSQL and Prisma for the Recruitment Tracker application.

## Prerequisites

- Node.js 18+
- Docker (for PostgreSQL) or a local PostgreSQL instance

## Quick start

```bash
# Start PostgreSQL
docker compose up -d

# Install dependencies
npm install

# Push schema and seed sample data
npm run db:setup

# Start development server
npm run dev
```

API runs at `http://localhost:3001`.

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/summary` | Dashboard stats, pipeline stages, recent activity |
| GET | `/api/candidates` | List all candidates |
| GET | `/api/candidates/:id` | Get candidate details |
| POST | `/api/candidates` | Create candidate |
| PUT | `/api/candidates/:id` | Update candidate |
| DELETE | `/api/candidates/:id` | Delete candidate |
| POST | `/api/pipeline/move` | Move candidate to next stage |
| GET | `/api/feedback` | List feedback (optional `?candidateId=`) |
| POST | `/api/feedback` | Submit stage feedback |
| GET | `/api/sla/status` | SLA breakdown by status |

## Business rules

- Hiring stages: Found → Initial Discussion → First Round → Second Round → HR Round → Selected/Rejected
- No stage skipping
- Feedback required for current stage before moving forward
- SLA status: on-track, approaching (≤1 day left), breached (overdue)

## SLA targets (days)

| Stage | Target |
|-------|--------|
| Found | 2 |
| Initial Discussion | 4 |
| First Round | 7 |
| Second Round | 5 |
| HR Round | 3 |
