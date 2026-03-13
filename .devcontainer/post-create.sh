#!/bin/bash
set -e

echo "=== Veda Voice Post-Create Setup ==="

# Install Angular CLI globally
echo "Installing Angular CLI..."
npm install -g @angular/cli@19

# Install frontend dependencies
if [ -f "frontend/package.json" ]; then
  echo "Installing frontend dependencies..."
  cd frontend && npm install && cd ..
fi

# Install backend dependencies via Maven
if [ -f "backend/pom.xml" ]; then
  echo "Installing backend dependencies..."
  cd backend && mvn dependency:resolve -q && cd ..
fi

# Install AI service Python dependencies
if [ -f "ai-service/requirements.txt" ]; then
  echo "Installing AI service Python dependencies..."
  cd ai-service && pip install -r requirements.txt && cd ..
fi

# Copy .env.example to .env if not already present
if [ ! -f ".env" ] && [ -f ".env.example" ]; then
  echo "Creating .env from .env.example..."
  cp .env.example .env
fi

echo "=== Setup complete! ==="
echo ""
echo "Start services:"
echo "  Frontend : cd frontend && ng serve"
echo "  Backend  : cd backend && mvn spring-boot:run"
echo "  AI Svc   : cd ai-service && uvicorn app.main:app --reload"
echo "  All      : docker compose up"
