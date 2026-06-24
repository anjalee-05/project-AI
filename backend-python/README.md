# Python FastAPI Backend

This folder contains a minimal FastAPI backend that mirrors the Node/Express API used in the project.

## Setup

1. Create and activate a virtual environment (Windows PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create a `.env` file (optional) using `.env.example` as template.

4. Run the server:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

API will be available at `http://localhost:8000` (endpoints under `/api/*`).

## Endpoints

- `GET /api/hello` - test hello endpoint
- `GET /api/data` - sample data
- `POST /api/submit` - submit JSON payload `{ "message": "..." }`
- `GET /health` - health check
