# Supabase Setup Guide

This project uses Supabase as the PostgreSQL database provider.

## Getting Your Database Connection String

1. **Create a Supabase Project** (if you haven't already)
   - Go to [supabase.com](https://supabase.com)
   - Sign in or create an account
   - Click "New Project"
   - Fill in project details and choose a region close to you
   - Set a strong database password (save this!)

2. **Get Your Connection String**
   - Go to Project Settings (gear icon)
   - Navigate to **Database** section
   - Scroll to **Connection String**
   - Select **URI** tab
   - Copy the connection string
   - Replace `[YOUR-PASSWORD]` with your actual database password

3. **Update Environment Variables**
   - Copy `.env.example` to `.env`
   - Replace the `DATABASE_URL` value with your Supabase connection string
   - Example format:
     ```
     DATABASE_URL="postgresql://postgres:your-password@db.projectref.supabase.co:5432/postgres"
     ```

## Running Migrations

After setting up your connection string:

```bash
cd backend
npm install
npx prisma migrate dev --name init
```

## Development vs Production

You can use the same Supabase project for both, or create separate projects:

- **Development**: Use one project/connection string
- **Staging**: Optional separate project
- **Production**: Separate project with stronger security

## Security Notes

- **Never commit** your `.env` file with real credentials
- Use environment variables in CI/CD (GitHub Secrets)
- Enable Row Level Security (RLS) in Supabase for additional protection
- Regularly rotate your database password
- Use connection pooling for production (Supabase provides this)

## Docker Compose with Supabase

When running with Docker Compose, create a `.env` file in the root:

```bash
DATABASE_URL=postgresql://postgres:your-password@db.projectref.supabase.co:5432/postgres
JWT_SECRET=your-super-secret-jwt-key
```

Then run:
```bash
docker compose up --build
```

The backend container will connect to your Supabase database instead of a local PostgreSQL instance.
