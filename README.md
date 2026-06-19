# Lens ACE Landing Page

React frontend for the Lens ACE verification product, with a Postgres-backed reviews API.

## Development

```bash
cd frontend
npm install
```

Run the API and frontend in two terminals:

```bash
# Terminal 1 — API on :8080 (requires DATABASE_URL)
npm run dev:api

# Terminal 2 — React dev server on :3000 (proxies /api → :8080)
npm run dev
```

For local Postgres, set `DATABASE_URL` in `frontend/.env`:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lens_reviews
```

## Production (Railway)

Set the Railway service **Root Directory** to `frontend`.

### 1. Add Postgres

1. In your Railway project, click **+ New** → **Database** → **PostgreSQL**
2. Open your **web service** → **Variables**
3. Reference the Postgres service’s `DATABASE_URL` (Railway injects this when you link the database)

### 2. Deploy

- **Build:** `npm install --include=dev && CI=true DISABLE_ESLINT_PLUGIN=true npm run build`
- **Start:** `node server/index.js`
- **Port:** uses `$PORT` automatically

The server serves the React build and exposes:

- `POST /api/reviews` — save demo feedback
- `GET /api/health` — health check (includes DB status)

### 3. View submissions

In Railway, open the Postgres service → **Data** tab, or connect with any SQL client:

```sql
SELECT id, name, company, email, submitted_at, payload
FROM review_submissions
ORDER BY submitted_at DESC;
```

The full form (ratings, multi-selects, text answers) is stored in the `payload` JSON column.
