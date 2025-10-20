import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:1234/API",
  withCredentials: true, // ✅ needed for httpOnly cookie refresh
});

// Attach access token for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Response interceptor to handle expired access tokens
API.interceptors.response.use(
  (res) => res, // success, just return
  async (err) => {
    const originalRequest = err.config;

    // If 401 (unauthorized) and we haven't retried yet
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh endpoint
        const refreshRes = await axios.post(
          "http://localhost:1234/API/refresh-token",
          {},
          { withCredentials: true }
        );

        // Save new access token
        localStorage.setItem("token", refreshRes.data.accessToken);

        // Update original request headers
        originalRequest.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;

        // Retry the original request
        return API(originalRequest);
      } catch (refreshErr) {
        console.error("Refresh token failed:", refreshErr);
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default API;
