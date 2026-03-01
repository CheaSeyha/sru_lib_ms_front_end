import React, { createContext, useState, useEffect } from "react";
import apiClient from "../api/apiClient"; // Your axios instance
import axios from "../api/axios";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    () =>
      sessionStorage.getItem("accessToken") ||
      localStorage.getItem("accessToken"),
  );
  const [refreshToken, setRefreshToken] = useState(
    () =>
      sessionStorage.getItem("refreshToken") ||
      localStorage.getItem("refreshToken"),
  );
  const [authLoading, setAuthLoading] = useState(!!accessToken);
  const [userID, setUserID] = useState(
    () => sessionStorage.getItem("userID") || localStorage.getItem("userID"),
  );
  const [userInfor, setUserInfor] = useState({});

  const checkUser = async (id) => {
    if (!id) {
      setAuthLoading(false);
      return null;
    }
    setAuthLoading(true);
    try {
      const response = await axios.get(`/user/profile/${id}`);

      setUserInfor(response.data);
      return response.data; // ✅ IMPORTANT
    } catch (error) {
      console.error("Check user error:", error);
      return null;
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken && userID) {
      checkUser(userID);
    } else {
      setAuthLoading(false);
    }
  }, [accessToken, userID]);

  const login = async (email, password, rememberMe) => {
    try {
      // Send a POST request to the login endpoint
      const response = await apiClient.post("/auth/login", { email, password });

      // Destructure the response to get tokens, role, and username
      const { accessToken, refreshToken, userId } = response.data;

      // Determine storage type based on 'rememberMe' flag
      const storage = rememberMe ? localStorage : sessionStorage;

      // Store tokens, role, and username in the appropriate storage
      storage.setItem("accessToken", accessToken);
      storage.setItem("refreshToken", refreshToken);
      storage.setItem("userID", userId);

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUserID(userId);

      const userProfile = await checkUser(userId);
      setUserInfor(userProfile || {});
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, username, password) => {
    try {
      const response = await apiClient.post("/auth/register", {
        email,
        username,
        password,
      });
      return response.data; // Optionally, return the response if needed
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userID");
    localStorage.removeItem("admin_passcode"); // Reset passcode on logout

    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userID");

    setAccessToken(null);
    setRefreshToken(null);
    setUserID(null);
    setUserInfor({});
  };

  const refreshTokens = async () => {
    try {
      const response = await apiClient.post("/refresh-token", {
        token: refreshToken,
      });
      const { accessToken: newAccessToken } = response.data;

      if (sessionStorage.getItem("refreshToken")) {
        sessionStorage.setItem("accessToken", newAccessToken);
      } else if (localStorage.getItem("refreshToken")) {
        localStorage.setItem("accessToken", newAccessToken);
      }

      setAccessToken(newAccessToken);
    } catch (error) {
      logout();
    }
  };

  // OTP logic
  const requestOtp = async (email) => {
    try {
      await apiClient.post(`/auth/otp?email=${encodeURIComponent(email)}`);
    } catch (error) {
      throw error;
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      await apiClient.post(
        `/auth/verify?otp=${encodeURIComponent(otp)}&email=${encodeURIComponent(email)}`,
      );
    } catch (error) {
      throw error;
    }
  };

  // Change password logic
  const changePassword = async (email, password) => {
    try {
      await apiClient.put("/auth/change-password", { email, password });
    } catch (error) {
      throw error;
    }
  };

  // Create an Axios instance with authentication
  const authAxios = apiClient.create();

  authAxios.interceptors.request.use(
    async (config) => {
      if (isTokenExpired(accessToken) && refreshToken) {
        await refreshTokens();
      }
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        userInfor,
        username: userInfor?.username || userInfor?.name || "",
        role: userInfor?.role || "",
        login,
        register,
        logout,
        authAxios,
        authLoading,
        requestOtp,
        verifyOtp,
        changePassword,
      }}
    >
      {!authLoading ? (
        children
      ) : (
        <main className="flex justify-center items-center w-full h-screen space-y-5 bg-base-300">
          <span className="loading loading-dots text-accent loading-lg"></span>
        </main>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
