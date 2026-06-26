const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.warn(
    "VITE_API_BASE_URL is not set. Add it to your .env file (see .env.example)."
  );
}

function getToken() {
  return localStorage.getItem("customerToken");
}

/**
 * Core request helper. Automatically attaches the customer auth token
 * (if present) and parses JSON responses. Throws an Error with a
 * `.status` and `.data` property on non-2xx responses so callers can
 * branch on specific failure reasons (e.g. out-of-stock vs auth error).
 */
async function request(path, { method = "GET", body, isFormData = false, auth = false } = {}) {
  const headers = {};
  if (!isFormData) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // some endpoints (e.g. plain text) may not return JSON
  }

  if (!res.ok) {
    const err = new Error(data?.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) => request(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
  postForm: (path, formData, opts) =>
    request(path, { ...opts, method: "POST", body: formData, isFormData: true }),
};

export function imageUrl(filename) {
  if (!filename) return null;
  return `${API_BASE_URL}/uploads/${filename}`;
}

export { API_BASE_URL };
