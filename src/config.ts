// Backend base URL, set REACT_APP_BACKEND_URL at build time (falls back to the local dev server)
export const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4001';
