# RMDB - React Movie Database
# Makefile for Docker operations

.PHONY: help build up down restart logs clean dev prod frontend backend db migrate

# Default target
help:
	@echo "╔════════════════════════════════════════════════════════════╗"
	@echo "║           RMDB - React Movie Database                      ║"
	@echo "╠════════════════════════════════════════════════════════════╣"
	@echo "║  make build      - Build all Docker images                 ║"
	@echo "║  make up         - Start all services                      ║"
	@echo "║  make down       - Stop all services                       ║"
	@echo "║  make restart    - Restart all services                    ║"
	@echo "║  make logs       - View logs from all services             ║"
	@echo "║  make clean      - Remove containers, images, and volumes  ║"
	@echo "║  make dev        - Start in development mode               ║"
	@echo "║  make prod       - Start in production mode                ║"
	@echo "║                                                            ║"
	@echo "║  Individual Services:                                      ║"
	@echo "║  make frontend   - Build and start frontend only           ║"
	@echo "║  make backend    - Build and start backend only            ║"
	@echo "║  make db         - Start database only                     ║"
	@echo "║  make migrate    - Run database migrations                 ║"
	@echo "║                                                            ║"
	@echo "║  Utility:                                                  ║"
	@echo "║  make shell-backend  - Open shell in backend container     ║"
	@echo "║  make shell-frontend - Open shell in frontend container    ║"
	@echo "║  make shell-db       - Open psql in database container     ║"
	@echo "╚════════════════════════════════════════════════════════════╝"

# Build all images
build:
	@echo "🔨 Building all Docker images..."
	docker-compose build

# Start all services
up:
	@echo "🚀 Starting all services..."
	docker-compose up -d
	@echo ""
	@echo "✅ Services started!"
	@echo "   Frontend: http://localhost:3000"
	@echo "   Backend:  http://localhost:3001"
	@echo "   Database: localhost:5432"

# Stop all services
down:
	@echo "🛑 Stopping all services..."
	docker-compose down

# Restart all services
restart: down up

# View logs
logs:
	docker-compose logs -f

# View logs for specific service
logs-frontend:
	docker-compose logs -f frontend

logs-backend:
	docker-compose logs -f backend

logs-db:
	docker-compose logs -f postgres

# Clean everything
clean:
	@echo "🧹 Cleaning up Docker resources..."
	docker-compose down -v --rmi all --remove-orphans
	@echo "✅ Cleanup complete!"

# Development mode (with rebuild)
dev:
	@echo "🔧 Starting in development mode..."
	docker-compose up --build

# Production mode (detached)
prod:
	@echo "🚀 Starting in production mode..."
	docker-compose up -d --build
	@echo ""
	@echo "✅ Production services started!"
	@echo "   Frontend: http://localhost:3000"
	@echo "   Backend:  http://localhost:3001"

# Start individual services
frontend:
	@echo "🎨 Starting frontend..."
	docker-compose up -d --build frontend

backend:
	@echo "⚙️  Starting backend..."
	docker-compose up -d --build backend

db:
	@echo "🗄️  Starting database..."
	docker-compose up -d postgres

# Database migrations
migrate:
	@echo "📦 Running database migrations..."
	docker-compose exec backend npx prisma migrate deploy

# Generate Prisma client
prisma-generate:
	@echo "🔧 Generating Prisma client..."
	docker-compose exec backend npx prisma generate

# Open Prisma Studio
prisma-studio:
	@echo "🎨 Opening Prisma Studio..."
	cd backend && npx prisma studio

# Shell access
shell-backend:
	docker-compose exec backend sh

shell-frontend:
	docker-compose exec frontend sh

shell-db:
	docker-compose exec postgres psql -U rmdb_user -d rmdb_database

# Health check
health:
	@echo "🏥 Checking service health..."
	@curl -s http://localhost:3001/health | jq . || echo "Backend not responding"
	@curl -s -o /dev/null -w "Frontend: HTTP %{http_code}\n" http://localhost:3000 || echo "Frontend not responding"

# Status
status:
	@echo "📊 Service status:"
	docker-compose ps
