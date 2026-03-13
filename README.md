# Veda Voice

Monorepo with:
- **frontend** — Angular 21 app (port 4200)
- **backend** — Spring Boot 3 (Maven, Java 17+) (port 8080)
- **ai-service** — FastAPI (Python 3.11+) (port 8000)
- **postgres** — PostgreSQL 15 (via Docker Compose)

---

## Run without Docker (local development)

Run each service in a separate terminal.

### 1. AI Service (FastAPI)

```bash
cd ai-service
python3 -m venv .venv                              # first time only
.venv/bin/pip install -r requirements.txt          # first time only
.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Health check: http://localhost:8000/health

### 2. Backend (Spring Boot)

Runs with an in-memory H2 database by default — no PostgreSQL needed.

```bash
cd backend
mvn spring-boot:run
```

Health check: http://localhost:8080/api/health  
H2 console: http://localhost:8080/h2-console

> To use PostgreSQL instead, activate the `postgres` profile:
> ```bash
> mvn spring-boot:run -Dspring-boot.run.profiles=postgres
> ```
> (Requires a running PostgreSQL instance matching the values in `.env`.)

### 3. Frontend (Angular)

```bash
cd frontend
npm install    # first time only
npm start      # runs ng serve on port 4200
```

App: http://localhost:4200

---

## Run with Docker (all services + PostgreSQL)

1. Copy env template:

   ```bash
   cp .env.example .env
   ```

2. Build and start all services:

   ```bash
   docker compose up --build
   ```

3. Access services:
   - Angular: http://localhost:4200
   - Spring Boot: http://localhost:8080
   - FastAPI: http://localhost:8000
   - PostgreSQL: localhost:5432

