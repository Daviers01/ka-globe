# Ka Globe - Task Management App

This repository contains a task management application scaffold with a Node.js (Express) backend and a React frontend.

Tech stack (recommended):
- Backend: Node.js + Express + Prisma + PostgreSQL
- Frontend: React + Context API
- Auth: JWT + bcrypt
- Testing: Jest + Supertest (backend), React Testing Library (frontend)
- Containerization: Docker + Docker Compose
- CI/CD: GitHub Actions

Getting started (development)
1. Backend
   - cd backend
   - npm install
   - add a .env file (see .env.example) with your DATABASE_URL and JWT_SECRET
   - npx prisma migrate dev --name init
   - npm run dev

2. Frontend
   - cd frontend
   - npm install
   - npm start

Docker (development)
- docker-compose up --build

Roadmap / TODOs
- Implement JWT auth, user and task CRUD
- Add Prisma schema, migrations and seed scripts
- Dockerize backend and frontend
- Add GitHub Actions CI workflow

See the `backend/` and `frontend/` folders for more details.
