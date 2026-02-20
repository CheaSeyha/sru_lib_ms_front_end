// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const ProtectedRoute = ({ children, userRole }) => {
  const { accessToken, refreshToken, authLoading, userInfor } = useAuth();

  const role = userInfor?.role;

  if (authLoading) {
    return (
      <main className="flex justify-center items-center w-full h-full">
        <span className="loading loading-dots text-accent loading-lg"></span>
      </main>
    );
  }

  // Not got to logged in
  if (!accessToken && !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  // If userRole is array → check includes
  if (userRole && role && !userRole.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
