# QMCB — Quantum Circuit Builder (Monorepo)
Monorepo containing the prototype **backend** (Flask, Python) and **frontend** (Vite + React + TS) for a learning tool where students build quantum circuits, submit them for simulation, and compare **trial** vs **target** truth tables (e.g., SWAP).
- **Backend**: qmcb-be/
 — Flask API that simulates circuits and returns truth tables
→ See qmcb-be/README.md
 for full setup, env, and endpoints.
- **Frontend**: qmcb-fe/
 — Drag-and-drop UI for placing gates and checking results
→ See qmcb-fe/README.md
 for full setup, env, and scripts.


## Prerequisites

- **Node.js** ≥ 18 (LTS is fine)
- **npm** (comes with Node)
- Backend running locally (see `qmcb-be/README.md`)


### Repo Structure

```bash
.
├─ qmcb-be/        # Flask API (POST /simulate)
├─ qmcb-fe/        # Vite + React UI
├─ .gitignore
└─ README.md       # (this file)
```


### Quick Start (Local Dev)
Full details live in each package's README. This is the fast path.

1. Backend (Flask)
```bash
cd qmcb-be
make init                 # create venv, install deps, set up env
make run                  # starts Flask on http://127.0.0.1:5000
```

2. Frontend (Vite)
Open a new terminal: 
```bash
cd qmcb-fe
npm install
cp .env.local.example .env.local
# In .env.local set:
# VITE_API_BASE_URL=http://127.0.0.1:5000
npm run dev               # opens http://localhost:5173
```
Now you can place gates in the UI and **Check Solution** to hit the backend POST/simulate.


### Common Gotchas

- CORS: Make sure ALLOWED_ORIGINS in qmcb-be/.env includes your FE origin (http://localhost:5173 in dev, and your deployed FE origin in prod).
- API path mismatch: The FE calls ${VITE_API_BASE_URL}/simulate. Ensure the Flask route matches and that you’re not mixing /api/simulate vs /simulate.
- Node / Python versions:
    - FE requires Node ≥ 18
    - BE requires Python 3.x (use the repo’s make init to create the venv)


### Package Docs

- Backend: detailed instructions, API contract, example requests/responses, Make targets, and project layout
→ qmcb-be/README.md
- Frontend: detailed instructions, environment variables, scripts, project layout, UI overview, troubleshooting
→ qmcb-fe/README.md


### Suggested Developer Workflow

1. Start backend first and verify POST /simulate responds (use curl or HTTP client).

2. Start frontend, point VITE_API_BASE_URL to the backend, and iterate in the UI.

3. Use linters/typecheckers locally:
    - Frontend: npm run typecheck && npm run lint && npm run format
    - Backend: run your formatter/type checker targets (e.g., black, flake8, mypy) via make if configured.

If you want a single command to boot both apps, consider adding a root script (e.g., a Makefile or npm script using concurrently)—optional and can be added later.


### Deploy (High-Level)

- Frontend (Vercel/Netlify):
    - Project root: qmcb-fe
    - Build: npm run build
    - Output: dist/
    - Env: VITE_API_BASE_URL → your production backend URL
- Backend (e.g., VM / Docker / PaaS):
    - Serve Flask via a WSGI server (Gunicorn/uWSGI) behind Nginx (or platform equivalent).
    - Configure CORS to allow your production FE origin.