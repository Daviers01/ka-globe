# Backend — Ka Globe

Quick start:

1. Copy `.env.example` to `.env` and set `DATABASE_URL` and `JWT_SECRET`.
2. npm install
3. npx prisma generate
4. npm run migrate
5. npm run seed
6. npm run dev

API endpoints (initial):
- POST /api/auth/register
- POST /api/auth/login
- All /api/tasks/* routes require Authorization: Bearer <token>
