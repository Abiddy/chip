const TOKEN_KEY = "lens-admin-token";

export function getAdminToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

async function adminFetch(path, options = {}) {
  const token = getAdminToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(path, { ...options, headers });
  const payload = await response.json().catch(() => ({}));

  if (response.status === 401) {
    clearAdminToken();
  }

  if (!response.ok) {
    throw new Error(payload.message || "Request failed.");
  }

  return payload;
}

export async function loginAdmin(password) {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "Incorrect password.");
  }
  setAdminToken(payload.token);
  return payload;
}

export async function fetchAdminReviews() {
  return adminFetch("/api/admin/reviews");
}

export async function setReviewFieldPublished(id, field, published) {
  return adminFetch(`/api/admin/reviews/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ field, published }),
  });
}

export async function deleteReview(id) {
  return adminFetch(`/api/admin/reviews/${id}`, {
    method: "DELETE",
  });
}

export async function fetchPublishedReviews() {
  const response = await fetch("/api/reviews/published");
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "Failed to load reviews.");
  }
  return payload.reviews || [];
}
