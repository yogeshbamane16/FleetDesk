# FleetDesk

FleetDesk is a full-stack logistics and transport management platform built to coordinate dispatch, track deliveries, and manage fleets.

## Architecture
- **Frontend**: Next.js App Router, React, Tailwind CSS, shadcn/ui.
- **Backend**: FastAPI, SQLAlchemy, Alembic, PostgreSQL.
- **Data & Auth**: Supabase.

## Documentation
- [Architecture](docs/architecture.md)
- [Database Schema](docs/database.md)
- [Security Matrix](docs/security.md)
- [Progress](docs/progress.md)

## Local Setup

### 1. Prerequisites
- Node.js (v18+)
- Python (3.10+)
- A Supabase Project (PostgreSQL)

### 2. Backend (FastAPI) Setup
```bash
cd apps/api
python -m venv venv
# Activate virtual environment (Windows: .\venv\Scripts\activate, Mac/Linux: source venv/bin/activate)
pip install -r requirements.txt
```

Set up your `.env` in `apps/api/.env` based on `apps/api/.env.example`.

**Run Migrations:**
```bash
alembic upgrade head
```

**Start the Server:**
```bash
uvicorn app.main:app --reload
```

### 3. Frontend (Next.js) Setup
```bash
cd apps/web
npm install
```

Set up your `.env` in `apps/web/.env.local` based on `apps/web/.env.example`.

**Start the Server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.
