import React, { createContext, useState, useEffect } from "react";
import axios from "../api/axios"; // Your axios instance

const AuthContext = createContext(null);

const getTokenExpiration = (token) => {
    try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded.exp * 1000; // Convert to milliseconds
    } catch (e) {
        console.error("Error decoding token: ", e);
        return 0;
    }
};

const isTokenExpired = (token) => {
    if (!token) return true;
    const expirationTime = getTokenExpiration(token);
    const currentTime = Date.now();
    return expirationTime < currentTime;
};

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState(() => sessionStorage.getItem("refreshToken") || localStorage.getItem("refreshToken"));
    const [role, setRole] = useState(() => sessionStorage.getItem("role") || localStorage.getItem("role"));
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const refresh = async () => {
            if (isTokenExpired(accessToken) && refreshToken) {
                await refreshTokens();
            }
            setAuthLoading(false);
        };

        refresh();
    }, [accessToken, refreshToken]);

    const login = async (email, password, rememberMe) => {
        try {
            const response = await axios.post("/auth/login", { email, password });
            const { accessToken, refreshToken, role } = response.data;

            if (rememberMe) {
                // Store tokens in localStorage if "Remember Me" is checked
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("role", role);
            } else {
                // Store tokens in sessionStorage if "Remember Me" is not checked
                sessionStorage.setItem("accessToken", accessToken);
                sessionStorage.setItem("refreshToken", refreshToken);
                sessionStorage.setItem("role", role);
            }

            // Update state with tokens and role
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setRole(role);
        } catch (error) {
            console.error("Login error: ", error.response ? error.response.data : error.message);
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
            await axios.post("/auth/change-password", { email, password }, {
                withCredentials: true // Ensure credentials (cookies) are sent with the request
            });

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
            accessToken, refreshToken, role, login, register, logout, authAxios, authLoading,
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
