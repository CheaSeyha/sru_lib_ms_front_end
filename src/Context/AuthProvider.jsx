import React, { createContext, useState, useEffect } from "react";
import axios from "../api/apiClient"; // Your axios instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState(() => sessionStorage.getItem("refreshToken") || localStorage.getItem("refreshToken"));
    const [role, setRole] = useState(() => sessionStorage.getItem("role") || localStorage.getItem("role"));
    const [username, setUsername] = useState(() => sessionStorage.getItem("username") || localStorage.getItem("username"));
    const [authLoading, setAuthLoading] = useState(false);

    const login = async (email, password, rememberMe) => {
        try {
            // Send a POST request to the login endpoint
            const response = await axios.post("/auth/login", { email, password });

            // Destructure the response to get tokens, role, and username
            const { accessToken, refreshToken, role, username } = response.data;

            // Determine storage type based on 'rememberMe' flag
            const storage = rememberMe ? localStorage : sessionStorage;

            // Store tokens, role, and username in the appropriate storage
            storage.setItem("accessToken", accessToken);
            storage.setItem("refreshToken", refreshToken);
            storage.setItem("role", role);
            storage.setItem("username", username);

            // Update state with tokens, role, and username
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setRole(role);
            setUsername(username); // Make sure you have a state setter for username

        } catch (error) {
            // Log error details to the console and rethrow it
            // console.error("Login error: ", error.response ? error.response.data : error.message);
            throw error;
        }
    };


    const register = async (email, username, password) => {
        try {
            const response = await axios.post("/auth/register", { email, username, password });
            console.log("Registration successful. Please log in.");
            return response.data; // Optionally, return the response if needed
        } catch (error) {
            if (error.response) {
                console.error("Registration error details:", error.response.data);
            } else {
                console.error("Registration error:", error.message);
            }
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("role");

        setAccessToken(null);
        setRefreshToken(null);
        setRole(null);
    };

    const refreshTokens = async () => {
        try {
            const response = await axios.post("/refresh-token", { token: refreshToken });
            const { accessToken: newAccessToken } = response.data;

            if (sessionStorage.getItem("refreshToken")) {
                sessionStorage.setItem("accessToken", newAccessToken);
            } else if (localStorage.getItem("refreshToken")) {
                localStorage.setItem("accessToken", newAccessToken);
            }

            setAccessToken(newAccessToken);
        } catch (error) {
            console.error("Refresh token error: ", error);
            logout();
        }
    };

    // OTP logic
    const requestOtp = async (email) => {
        try {
            await axios.post(`/auth/otp?email=${encodeURIComponent(email)}`);
            console.log("OTP sent to:", email);
        } catch (error) {
            console.error("Error requesting OTP: ", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    const verifyOtp = async (email, otp) => {
        try {
            await axios.post(`/auth/verify?otp=${encodeURIComponent(otp)}&email=${encodeURIComponent(email)}`);
            console.log("OTP verified for:", email);
        } catch (error) {
            console.error("Error verifying OTP: ", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    // Change password logic
    const changePassword = async (email, password) => {
        try {
            await axios.put("/auth/change-password", { email, password });

            console.log("Password changed for:", email);
        } catch (error) {
            console.error("Error changing password: ", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    // Create an Axios instance with authentication
    const authAxios = axios.create();

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
        }
    );

    return (
        <AuthContext.Provider value={{
            accessToken, refreshToken, role, login, username, register, logout, authAxios, authLoading,
            requestOtp, verifyOtp, changePassword
        }}>
            {!authLoading ? children :
                <main className='flex justify-center items-center w-full h-full space-y-5'>
                    <span className="loading loading-dots text-accent loading-lg"></span>
                </main>}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
