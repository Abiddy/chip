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

    ALTER TABLE review_submissions
      ADD COLUMN IF NOT EXISTS published BOOLEAN NOT NULL DEFAULT false;

    ALTER TABLE review_submissions
      ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

    CREATE INDEX IF NOT EXISTS idx_review_submissions_submitted_at
      ON review_submissions (submitted_at DESC);

    CREATE INDEX IF NOT EXISTS idx_review_submissions_published
      ON review_submissions (published, published_at DESC);
  `);

  console.log("[reviews] Database ready");
}

async function insertReviewSubmission({ name, company, email, payload }) {
  const result = await pool.query(
    `INSERT INTO review_submissions (name, company, email, payload)
     VALUES ($1, $2, $3, $4)
     RETURNING id, submitted_at, status, form_type, published`,
    [name, company, email, payload]
  );
  return result.rows[0];
}

async function listAllReviewSubmissions() {
  const result = await pool.query(
    `SELECT id, form_type, status, name, company, email, payload,
            submitted_at, published, published_at
     FROM review_submissions
     ORDER BY submitted_at DESC`
  );
  return result.rows;
}

async function listPublishedReviewSubmissions() {
  const result = await pool.query(
    `SELECT id, name, company, payload, published_at
     FROM review_submissions
     WHERE published = true
     ORDER BY published_at DESC NULLS LAST, submitted_at DESC`
  );
  return result.rows;
}

async function setReviewPublished(id, published) {
  const result = await pool.query(
    `UPDATE review_submissions
     SET published = $2,
         published_at = CASE WHEN $2 THEN NOW() ELSE NULL END
     WHERE id = $1
     RETURNING id, name, company, email, payload, submitted_at, published, published_at`,
    [id, published]
  );
  return result.rows[0] || null;
}

async function checkDbConnection() {
  if (!process.env.DATABASE_URL) return false;
  await pool.query("SELECT 1");
  return true;
}

function formatPublicReview(row) {
  const payload = row.payload || {};
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    title: payload.title || "",
    quote:
      payload.positiveFeedback ||
      payload.topApplication ||
      payload.topPriorityFeature ||
      "",
    publishedAt: row.published_at,
  };
}

function formatAdminReview(row) {
  const payload = row.payload || {};
  return {
    id: row.id,
    formType: row.form_type,
    status: row.status,
    name: row.name,
    company: row.company,
    email: row.email,
    title: payload.title || "",
    team: payload.team || "",
    submittedAt: row.submitted_at,
    published: row.published,
    publishedAt: row.published_at,
    payload,
  };
}

module.exports = {
  pool,
  initDb,
  insertReviewSubmission,
  listAllReviewSubmissions,
  listPublishedReviewSubmissions,
  setReviewPublished,
  checkDbConnection,
  formatPublicReview,
  formatAdminReview,
};
