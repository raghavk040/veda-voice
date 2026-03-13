# 🩺 Veda Voice — AI Healthcare Web Application

A full-stack AI-powered healthcare assistant built with:

- **Frontend**: Angular 17 + Tailwind CSS (port 4200)
- **Backend**: Spring Boot 3 + Java 21 + PostgreSQL (port 8080)
- **AI Service**: FastAPI + Python 3.11 (port 8000)
- **Database**: PostgreSQL 15 (port 5432)

---

## 📁 Project Structure

```
veda-voice/
├── .devcontainer/
│   └── devcontainer.json       # Dev container configuration
├── frontend/                   # Angular 17 app
│   ├── src/
│   │   ├── app/                # Angular components & routing
│   │   ├── environments/       # Environment configs
│   │   └── styles.css          # Global styles (Tailwind)
│   ├── angular.json
│   ├── package.json
│   ├── tailwind.config.js
│   └── Dockerfile
├── backend/                    # Spring Boot 3 API
│   ├── src/
│   │   ├── main/java/com/vedavoice/backend/
│   │   │   ├── controller/     # REST controllers
│   │   │   ├── service/        # Business logic
│   │   │   ├── model/          # JPA entities
│   │   │   └── repository/     # Spring Data repositories
│   │   └── main/resources/
│   │       └── application.yml
│   ├── pom.xml
│   └── Dockerfile
├── ai-service/                 # FastAPI AI service
│   ├── app/
│   │   ├── routers/            # API route handlers
│   │   ├── models/             # Pydantic models
│   │   ├── services/           # AI/ML logic
│   │   ├── config.py           # Settings
│   │   └── main.py             # FastAPI app entry point
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml          # Orchestrates all services
├── .env.example                # Environment variable template
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) & Docker Compose v2
- OR a Dev Container-compatible IDE (VS Code with the Dev Containers extension)

### Option 1: Dev Container (Recommended)

1. Open the repo in VS Code
2. When prompted, click **"Reopen in Container"**
3. The container will install Node.js 20, Java 21, Python 3.11, and all tools automatically

### Option 2: Docker Compose

```bash
# 1. Copy and configure environment variables
cp .env.example .env

# 2. Build and start all services
docker compose up --build

# 3. Access the app
#    Frontend:   http://localhost:4200
#    Backend:    http://localhost:8080/api/health
#    AI Service: http://localhost:8000/health
#    API Docs:   http://localhost:8000/docs
```

### Option 3: Run Services Individually

**Frontend (Angular)**
```bash
cd frontend
npm install
npm start
```

**Backend (Spring Boot)**
```bash
cd backend
./mvnw spring-boot:run
```

**AI Service (FastAPI)**
```bash
cd ai-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

---

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in your values:

| Variable | Description | Default |
|---|---|---|
| `POSTGRES_DB` | Database name | `vedavoice` |
| `POSTGRES_USER` | Database user | `vedauser` |
| `POSTGRES_PASSWORD` | Database password | `vedapassword` |
| `OPENAI_API_KEY` | OpenAI API key | _(required for AI)_ |
| `JWT_SECRET` | JWT signing secret | _(required for auth)_ |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 17, Tailwind CSS |
| Backend | Spring Boot 3, Java 21, Maven |
| AI Service | FastAPI, Python 3.11 |
| Database | PostgreSQL 15 |
| Container | Docker, Docker Compose v2 |
