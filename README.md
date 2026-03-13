# Veda Voice

Monorepo with:
- frontend: Angular 17 app
- backend: Spring Boot 3 (Maven, Java 21)
- ai-service: FastAPI (Python 3.11)
- postgres: PostgreSQL 15 via Docker Compose

## Setup

1. Copy env template:
   cp .env.example .env

2. Build and start all services:
   docker compose up --build

3. Access services:
- Angular: http://localhost:4200
- Spring Boot: http://localhost:8080
- FastAPI: http://localhost:8000
- PostgreSQL: localhost:5432

## Notes

These are placeholders. Replace placeholder app code with full generated projects when ready.
