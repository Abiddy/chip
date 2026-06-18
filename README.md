# Lens ACE Landing Page

React frontend for the Lens ACE verification product.

## Development

```bash
cd frontend
npm install
npm run dev
```

## Production (Railway)

Set the Railway service **Root Directory** to `frontend`.

- **Build:** `npm install --include=dev && CI=true DISABLE_ESLINT_PLUGIN=true npm run build`
- **Start:** `npm start`
- **Port:** `8080` (uses `$PORT` automatically)
