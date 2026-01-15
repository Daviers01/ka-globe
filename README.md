# Ka Globe - Task Management App

This repository contains a task management application scaffold with a Node.js (Express) backend and a React frontend.

## Tech Stack
- Backend: Node.js + Express + Prisma + PostgreSQL (Supabase)
- Frontend: React + Context API
- Auth: JWT + bcrypt
- Testing: Jest + Supertest (backend), React Testing Library (frontend)
- Containerization: Docker + Docker Compose
- CI/CD: GitHub Actions

## Getting Started

### 1. Database Setup (Supabase)
See [SUPABASE-SETUP.md](SUPABASE-SETUP.md) for detailed instructions on:
- Creating a Supabase project
- Getting your connection string
- Configuring environment variables

### 2. Local Development

**Backend:**
```bash
cd backend
npm install
# Create .env file with your Supabase DATABASE_URL (see backend/.env.example)
npx prisma migrate dev --name init
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### 3. Docker (Production-like environment)

Create a `.env` file in the root with your Supabase credentials:
```bash
cp .env.example .env
# Edit .env with your Supabase DATABASE_URL and JWT_SECRET
```

Then run:
```bash
docker compose up --build
```

## Roadmap / TODOs
- ✅ Dockerize backend and frontend
- Add GitHub Actions CI workflow
- Add more comprehensive tests

See the `backend/` and `frontend/` folders for more details.
