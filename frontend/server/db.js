const { Pool } = require("pg");

const PUBLISHABLE_FIELDS = ["positiveFeedback", "concerns", "comparison"];

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

    ALTER TABLE review_submissions
      ADD COLUMN IF NOT EXISTS published_fields JSONB NOT NULL DEFAULT '{}'::jsonb;

    CREATE INDEX IF NOT EXISTS idx_review_submissions_submitted_at
      ON review_submissions (submitted_at DESC);

    CREATE INDEX IF NOT EXISTS idx_review_submissions_published
      ON review_submissions (published, published_at DESC);
  `);

  await pool.query(`
    UPDATE review_submissions
    SET published_fields = jsonb_build_object('positiveFeedback', true)
    WHERE published = true
      AND published_fields = '{}'::jsonb;
  `);

  console.log("[reviews] Database ready");
}

async function insertReviewSubmission({ name, company, email, payload }) {
  const result = await pool.query(
    `INSERT INTO review_submissions (name, company, email, payload)
     VALUES ($1, $2, $3, $4)
     RETURNING id, submitted_at, status, form_type, published, published_fields`,
    [name, company, email, payload]
  );
  return result.rows[0];
}

async function listAllReviewSubmissions() {
  const result = await pool.query(
    `SELECT id, form_type, status, name, company, email, payload,
            submitted_at, published, published_at, published_fields
     FROM review_submissions
     ORDER BY submitted_at DESC`
  );
  return result.rows;
}

async function listPublishedReviewSubmissions() {
  const result = await pool.query(
    `SELECT id, name, company, payload, published_at, published_fields, published
     FROM review_submissions
     WHERE published = true
        OR published_fields @> '{"positiveFeedback": true}'
        OR published_fields @> '{"concerns": true}'
        OR published_fields @> '{"comparison": true}'
     ORDER BY published_at DESC NULLS LAST, submitted_at DESC`
  );
  return result.rows;
}

function normalizePublishedFields(raw = {}) {
  const normalized = {};
  for (const field of PUBLISHABLE_FIELDS) {
    normalized[field] = Boolean(raw[field]);
  }
  return normalized;
}

function hasAnyPublishedField(publishedFields) {
  return PUBLISHABLE_FIELDS.some((field) => publishedFields[field]);
}

async function setReviewFieldPublished(id, field, published) {
  if (!PUBLISHABLE_FIELDS.includes(field)) {
    throw new Error("Invalid publishable field.");
  }

  const result = await pool.query(
    `UPDATE review_submissions
     SET published_fields = COALESCE(published_fields, '{}'::jsonb)
         || jsonb_build_object($2::text, to_jsonb($3::boolean)),
         published = (
           SELECT COALESCE(bool_or((value)::boolean), false)
           FROM jsonb_each_text(
             COALESCE(published_fields, '{}'::jsonb)
             || jsonb_build_object($2::text, $3::text)
           )
         ),
         published_at = CASE
           WHEN $3 THEN COALESCE(published_at, NOW())
           WHEN NOT (
             SELECT COALESCE(bool_or((value)::boolean), false)
             FROM jsonb_each_text(
               COALESCE(published_fields, '{}'::jsonb)
               || jsonb_build_object($2::text, $3::text)
             )
           ) THEN NULL
           ELSE published_at
         END
     WHERE id = $1
     RETURNING id, name, company, email, payload, submitted_at, published, published_at, published_fields`,
    [id, field, published]
  );
  return result.rows[0] || null;
}

async function deleteReviewSubmission(id) {
  const result = await pool.query(
    `DELETE FROM review_submissions WHERE id = $1 RETURNING id`,
    [id]
  );
  return result.rows[0] || null;
}

async function checkDbConnection() {
  if (!process.env.DATABASE_URL) return false;
  await pool.query("SELECT 1");
  return true;
}

const FIELD_LABELS = {
  positiveFeedback: "Positive feedback",
  concerns: "Concerns & gaps",
  comparison: "Comparison",
};

function formatPublishedQuotes(rows) {
  const quotes = [];

  for (const row of rows) {
    const payload = row.payload || {};
    const publishedFields = normalizePublishedFields(row.published_fields || {});

    if (row.published && !hasAnyPublishedField(publishedFields)) {
      publishedFields.positiveFeedback = true;
    }

    for (const field of PUBLISHABLE_FIELDS) {
      const quote = (payload[field] || "").trim();
      if (!publishedFields[field] || !quote) continue;

      quotes.push({
        id: `${row.id}:${field}`,
        submissionId: row.id,
        name: row.name,
        company: row.company,
        title: payload.title || "",
        quote,
        field,
        fieldLabel: FIELD_LABELS[field] || field,
        publishedAt: row.published_at,
      });
    }
  }

  return quotes.sort(
    (a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0)
  );
}

function formatAdminReview(row) {
  const payload = row.payload || {};
  const publishedFields = normalizePublishedFields(row.published_fields || {});

  if (row.published && !hasAnyPublishedField(publishedFields)) {
    publishedFields.positiveFeedback = true;
  }

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
    published: hasAnyPublishedField(publishedFields),
    publishedFields,
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
  setReviewFieldPublished,
  deleteReviewSubmission,
  checkDbConnection,
  formatPublishedQuotes,
  formatAdminReview,
  PUBLISHABLE_FIELDS,
};
