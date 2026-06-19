const express = require("express");
const path = require("path");
const fs = require("fs");
const { initDb, insertReviewSubmission, checkDbConnection } = require("./db");

const app = express();
const PORT = process.env.PORT || 8080;
const BUILD_PATH = path.join(__dirname, "../build");
const SERVE_STATIC = process.env.SERVE_STATIC !== "false";

app.use(express.json({ limit: "1mb" }));

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.get("/api/health", async (_req, res) => {
  try {
    const db = await checkDbConnection();
    res.json({ ok: true, db });
  } catch {
    res.status(503).json({ ok: false, db: false });
  }
});

app.post("/api/reviews", async (req, res) => {
  if (!process.env.DATABASE_URL) {
    return res.status(503).json({
      message: "Database is not configured. Link Postgres on Railway and set DATABASE_URL.",
    });
  }

  const body = req.body || {};
  const name = (body.name || "").trim();
  const company = (body.company || "").trim();
  const email = (body.email || "").trim();

  if (!name || !company || !email) {
    return res.status(400).json({
      message: "Name, company, and email are required.",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  try {
    const row = await insertReviewSubmission({
      name,
      company,
      email,
      payload: body,
    });

    res.status(201).json({
      id: row.id,
      submittedAt: row.submitted_at,
      status: row.status,
      formType: row.form_type,
    });
  } catch (error) {
    console.error("[reviews] insert failed:", error);
    res.status(500).json({ message: "Failed to save submission. Please try again." });
  }
});

if (SERVE_STATIC && fs.existsSync(BUILD_PATH)) {
  app.use(express.static(BUILD_PATH));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(BUILD_PATH, "index.html"));
  });
}

async function start() {
  await initDb();

  app.listen(PORT, () => {
    console.log(`[server] listening on port ${PORT}`);
    if (SERVE_STATIC && fs.existsSync(BUILD_PATH)) {
      console.log("[server] serving static build");
    }
  });
}

start().catch((error) => {
  console.error("[server] failed to start:", error);
  process.exit(1);
});
