// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const ProtectedRoute = ({ children, roleRequired }) => {
  const { accessToken, refreshToken, authLoading, userInfor } = useAuth();

  const role = userInfor?.role; // role comes from userInfor

  if (authLoading) {
    return (
      <main className="flex justify-center items-center w-full h-full space-y-5">
        <span className="loading loading-dots text-accent loading-lg"></span>
      </main>
    );
  }

  // ✅ if no access token AND no refresh token → go login
  if (!accessToken && !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  // ✅ role check only after userInfor loaded (role exists)
  if (roleRequired && role && role !== roleRequired) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
