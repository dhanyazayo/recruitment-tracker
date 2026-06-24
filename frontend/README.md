# Recruitment Tracker Frontend

Next.js frontend for the Recruitment Tracker application.

## Prerequisites

- Backend API running at `http://localhost:3001`

## Quick start

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` — Dashboard (fetches `/api/dashboard/summary`)
- `/candidates` — Candidate list (fetches `/api/candidates`)

## Configuration

Set the backend URL in `.env.local`:

```
API_URL=http://localhost:3001
```
