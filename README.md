# Veda Voice 🩺

AI-powered healthcare web application that enables patients to record their symptoms via voice,
get instant AI transcription and analysis, manage appointments, and maintain health records.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 17 (Node.js 20) |
| Backend | Spring Boot 3 (Java 21 + Maven) |
| AI Service | FastAPI (Python 3.11) |
| Database | PostgreSQL 15 |
| Container | Docker + Docker Compose |

## Project Structure

```
veda-voice/
├── .devcontainer/          # VS Code Dev Container config
│   ├── devcontainer.json
│   └── post-create.sh
├── frontend/               # Angular 17 SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Navbar, Home, Dashboard, VoiceRecorder, Appointment, HealthRecord, Auth
│   │   │   ├── services/   # AuthService, VoiceService, AppointmentService, HealthRecordService
│   │   │   ├── models/     # TypeScript interfaces
│   │   │   ├── guards/     # AuthGuard
│   │   │   └── interceptors/ # JWT interceptor
│   │   ├── environments/
│   │   └── styles/
│   ├── angular.json
│   ├── package.json
│   └── Dockerfile
├── backend/                # Spring Boot 3 REST API
│   ├── src/main/java/com/vedavoice/
│   │   ├── controller/     # AuthController, UserController, AppointmentController, HealthRecordController
│   │   ├── service/        # AuthService
│   │   ├── repository/     # JPA repositories
│   │   ├── model/          # JPA entities (User, Appointment, HealthRecord)
│   │   ├── dto/            # Request/response DTOs
│   │   ├── security/       # JwtService, JwtAuthFilter
│   │   └── config/         # SecurityConfig
│   ├── pom.xml
│   └── Dockerfile
├── ai-service/             # FastAPI AI service
│   ├── app/
│   │   ├── main.py
│   │   ├── core/           # Config/settings
│   │   ├── routers/        # voice, health endpoints
│   │   ├── models/         # Pydantic models
│   │   └── services/       # VoiceAIService (OpenAI Whisper + GPT)
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites
- Docker & Docker Compose, **or**
- Node.js 20, Java 21, Python 3.11, PostgreSQL 15 (for local dev)

### Option 1 — Dev Container (Recommended)
1. Open the project in VS Code
2. Install the **Dev Containers** extension
3. Press `F1` → **Dev Containers: Reopen in Container**
4. The container installs all dependencies automatically

### Option 2 — Docker Compose
```bash
cp .env.example .env
# Edit .env and set OPENAI_API_KEY
docker compose up --build
```

Services will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:8080/api
- AI Service: http://localhost:8000/docs
- PostgreSQL: localhost:5432

### Option 3 — Local Development

**PostgreSQL**
```bash
createdb vedavoice
```

**Frontend**
```bash
cd frontend
npm install
ng serve
# http://localhost:4200
```

**Backend**
```bash
cd backend
mvn spring-boot:run
# http://localhost:8080/api
```

**AI Service**
```bash
cd ai-service
pip install -r requirements.txt
uvicorn app.main:app --reload
# http://localhost:8000/docs
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL JDBC connection URL |
| `DATABASE_USER` | PostgreSQL username |
| `DATABASE_PASSWORD` | PostgreSQL password |
| `JWT_SECRET` | Secret key for JWT signing (min 256-bit) |
| `OPENAI_API_KEY` | OpenAI API key for voice AI features |
