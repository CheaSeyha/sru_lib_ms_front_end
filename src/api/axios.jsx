import axios from 'axios'; // Import the axios library

// Configure the axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Utility function to check if the token has the correct format
const isValidTokenFormat = (token) => {
    return token && token.split('.').length === 3;
};

// Utility functions for token management
const getTokenExpiration = (token) => {
    if (!isValidTokenFormat(token)) {
        console.error("Invalid token format");
        return 0; // Return 0 for invalid token format
    }

    try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded.exp * 1000; // Convert to milliseconds
    } catch (e) {
        console.error("Error decoding token:", e);
        return 0;
    }
};

const isTokenExpired = (token) => {
    if (!isValidTokenFormat(token)) return true; // If the token format is invalid, consider it expired
    const expirationTime = getTokenExpiration(token);
    const currentTime = Date.now();
    return expirationTime < currentTime;
};

const refreshTokens = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token found");

        const response = await axiosInstance.post("/refresh-token", { token: refreshToken });
        const { accessToken: newAccessToken } = response.data;

        localStorage.setItem("accessToken", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Refresh token error:", error);
        logout(); // Clear tokens on error
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    // Optionally redirect to login page or show a logout message
};

// Add a request interceptor to handle token refresh and attach the access token
axiosInstance.interceptors.request.use(
    async (config) => {
        let accessToken = localStorage.getItem("accessToken");

        // Check if access token exists and is expired, attempt to refresh
        if (accessToken && isTokenExpired(accessToken)) {
            try {
                if (!isValidTokenFormat(accessToken)) {
                    console.error("Access token has an invalid format. Logging out.");
                    logout();
                    return Promise.reject(new Error("Invalid access token format"));
                }

                accessToken = await refreshTokens();
            } catch (error) {
                // If refreshing fails, handle logout and prevent further token use
                logout();
                return Promise.reject(error); // Exit early if refresh fails
            }
        }

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token refresh on 401 errors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loop: Only retry once
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Set retry flag

            try {
                const newAccessToken = await refreshTokens();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest); // Retry the original request with new token
            } catch (refreshError) {
                console.error('Failed to refresh token, logging out:', refreshError);
                logout(); // Logout if refresh fails
                return Promise.reject(refreshError); // Reject with the refresh error
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance; // Export the configured instance
