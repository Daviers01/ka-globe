# Build and Start all services
docker compose up --build

# Run Database Migrations - Prisma Migrations
docker compose exec backend npx prisma migrate deploy

# Seed Database
docker compose exec backend npm run seed

# Stop all services
docker compose down

# Stop and remove volumes (fresh database)
docker compose down -v

# View logs
docker compose logs -f

# View specific service logs
docker compose logs -f backend

# Rebuild specific service
docker compose up --build backend

# Run commands in containers
docker compose exec backend npm run migrate
docker compose exec backend npx prisma studio