import axios from "axios";

// Set the base URL and headers for the default Axios instance
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers["Content-Type"] = "application/json";

// Flag to handle token refreshing
let isRefreshing = false;
let failedRequestsQueue = [];

// Helper to process the queue
const processQueue = (error, token = null) => {
  failedRequestsQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedRequestsQueue = [];
};

// Helper to get the token from localStorage or sessionStorage
const getStoredToken = (key) => {
  return localStorage.getItem(key) || sessionStorage.getItem(key);
};

const clearAuthAndRedirect = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userID");

  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("userID");

  // also clear axios default header
  delete axios.defaults.headers.common["Authorization"];

  // ✅ hard redirect (works outside React)
  window.location.href = "/login";
};

const refreshToken = async () => {
  const storedRefreshToken =
    sessionStorage.getItem("refreshToken") ||
    localStorage.getItem("refreshToken");

  if (!storedRefreshToken) {
    clearAuthAndRedirect();
    throw new Error("No refresh token available.");
  }

  try {
    const response = await axios.post(
      "/auth/refresh-token",
      { refreshToken: storedRefreshToken },
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // save back to same storage where refreshToken existed
    if (localStorage.getItem("refreshToken")) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
    } else {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", newRefreshToken);
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    return accessToken;
  } catch (error) {
    // if server says invalid refresh token (often 401/403)
    clearAuthAndRedirect();
    throw error;
  }
};

// Response interceptor
axios.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If token is already being refreshed, queue the failed request
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            resolve: (token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(axios(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh the token
        const newToken = await refreshToken();

        // Update headers and retry the failed request
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        processQueue(null, newToken);
        return axios(originalRequest);
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

export default axios;
