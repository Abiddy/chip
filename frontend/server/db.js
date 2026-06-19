const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

async function initDb() {
  if (!process.env.DATABASE_URL) {
    console.warn(
      "[reviews] DATABASE_URL is not set — review submissions will fail until Postgres is linked."
    );
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS review_submissions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      form_type TEXT NOT NULL DEFAULT 'ace-demo-feedback',
      status TEXT NOT NULL DEFAULT 'pending',
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      email TEXT NOT NULL,
      payload JSONB NOT NULL,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_review_submissions_submitted_at
      ON review_submissions (submitted_at DESC);
  `);

  console.log("[reviews] Database ready");
}

async function insertReviewSubmission({ name, company, email, payload }) {
  const result = await pool.query(
    `INSERT INTO review_submissions (name, company, email, payload)
     VALUES ($1, $2, $3, $4)
     RETURNING id, submitted_at, status, form_type`,
    [name, company, email, payload]
  );
  return result.rows[0];
}

async function checkDbConnection() {
  if (!process.env.DATABASE_URL) return false;
  await pool.query("SELECT 1");
  return true;
}

module.exports = { pool, initDb, insertReviewSubmission, checkDbConnection };
