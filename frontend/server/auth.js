const crypto = require("crypto");

function getAdminToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;

  const secret = process.env.ADMIN_SECRET || password;
  return crypto.createHmac("sha256", secret).update("lens-admin-session").digest("hex");
}

function verifyAdminPassword(password) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

function verifyAdminToken(token) {
  if (!token || !process.env.ADMIN_PASSWORD) return false;
  const expected = getAdminToken();
  if (!expected) return false;

  try {
    return crypto.timingSafeEqual(
      Buffer.from(token, "utf8"),
      Buffer.from(expected, "utf8")
    );
  } catch {
    return false;
  }
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!verifyAdminToken(token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next();
}

module.exports = {
  getAdminToken,
  verifyAdminPassword,
  verifyAdminToken,
  requireAdmin,
};
