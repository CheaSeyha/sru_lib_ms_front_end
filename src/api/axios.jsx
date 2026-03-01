import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Separate instance for refresh (no interceptors)
const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedRequestsQueue = [];

const processQueue = (error, token = null) => {
  failedRequestsQueue.forEach((prom) => {
    if (token) prom.resolve(token);
    else prom.reject(error);
  });
  failedRequestsQueue = [];
};

const getStoredToken = (key) =>
  localStorage.getItem(key) || sessionStorage.getItem(key);

const clearAuthAndRedirect = () => {
  ["accessToken", "refreshToken", "userID"].forEach((k) => {
    localStorage.removeItem(k);
    sessionStorage.removeItem(k);
  });
  delete api.defaults.headers.common["Authorization"];
  window.location.href = "/login";
};

//  Always attach latest access token for EVERY request (fixes “works after refresh”)
api.interceptors.request.use((config) => {
  const token = getStoredToken("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const refreshToken = async () => {
  const storedRefreshToken = getStoredToken("refreshToken");

  if (!storedRefreshToken) {
    clearAuthAndRedirect();
    throw new Error("No refresh token available.");
  }

  const res = await refreshApi.post("/auth/refresh-token", {
    refreshToken: storedRefreshToken,
  });

  const { accessToken, refreshToken: newRefreshToken } = res.data;

  // save back to same storage where refreshToken existed
  if (localStorage.getItem("refreshToken")) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  } else {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", newRefreshToken);
  }

  // Update default header too (nice to have)
  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return accessToken;
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // If no response (network error), just reject
    if (!error.response) return Promise.reject(error);

    //  Don’t try refresh on the refresh endpoint itself
    if (originalRequest?.url?.includes("/auth/refresh-token")) {
      clearAuthAndRedirect();
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
