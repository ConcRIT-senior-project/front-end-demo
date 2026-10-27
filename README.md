# Welcome to S.O.I.L.
Sample Oversight and Interoffice Logisitics for ATL

## Set up development environment

### Tools Needed
- Git
- Docker (running)
- .NET 10 (only needed for singular running)
- Node.js 20+ (only needed for singular running)
- EF Core CLI: `dotnet tool install --global dotnet-ef`

### Quick Start
From soil root
```
cp .env.example .env (for windows copy > cp)
# Fill in the .env fields
docker compose up --build (make sure docker is running)
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| API | http://localhost:8080 (health check: http://localhost:8080/health) |
| PostgreSQL | localhost:5432 (connect with any DB client) |

## Config

`.env` (repo root, **never committed**):
 
| Variable | Purpose | Example |
|---|---|---|
| `DB_USER` | Postgres username | `appuser` |
| `DB_PASSWORD` | Postgres password | a long random string |
| `DB_NAME` | Database name | `appdb` |
 
Other settings the containers use (set in the compose files):
 
| Variable | Used by | Purpose |
|---|---|---|
| `ConnectionStrings__DefaultConnection` | backend | Postgres connection string |
| `ALLOWED_ORIGINS` | backend | Comma-separated list of frontend origins allowed by CORS |
| `VITE_API_URL` | frontend (build time) | API base URL. Empty means same-origin `/api` |

## GitHub Pages

The `Deploy frontend to GitHub Pages` workflow builds the app in `frontend/` and
deploys it when changes are pushed to `main` (or when manually run from Actions).
In the repository, open **Settings → Pages** and set the build and deployment
source to **GitHub Actions**. The Vite build automatically uses the repository
name as the project-site base path; user and organization sites use `/`.

GitHub Pages hosts static files only. Features that call the backend need a
publicly reachable API: add a repository Actions variable named `VITE_API_URL`
with its base URL (for example, `https://api.example.com`). Configure the API's
CORS allow-list to include the published Pages origin. If this variable is not
set, API requests use the same-origin `/api` path and will not reach a separate
backend hosted elsewhere.

## Working on one piece at a time

**Database only**
```bash
docker compose up -d db
```
 
**Backend** (from `backend/`, with the database running)
```bash
dotnet watch run
```
This needs a local connection string. Copy `appsettings.Development.json.example` to `appsettings.Development.json` (values must match your `.env`).
 
**Frontend** (from `frontend/`)
```bash
npm install
npm run dev
```
Open an ssh port to the dev env
```bash
ssh -N -L 8090:localhost:8080 <your-user>@dirt.se.rit.edu
```
Set `VITE_API_URL=http://localhost:8080` in `frontend/.env.local`.

## Database and migrations
 
- Schema changes are managed with EF Core migrations, stored in `backend/Migrations/` and **committed to git**.
- The API applies pending migrations automatically at startup.
Create a migration after changing a model (from `backend/`, database running):
```bash
dotnet ef migrations add <DescriptiveName>
```
 
### Notes:
- Never edit a migration that has already been merged. Add a new one instead.
- If two branches both add migrations, resolve the conflict before merging (regenerate yours after pulling `main`).
- Reset your local database at any time with `docker compose down -v`.
