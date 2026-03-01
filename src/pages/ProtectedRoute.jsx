// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { hasPasscode, isNavUnlocked } from "../utils/passcodeUtils";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, userRole }) => {
  const { accessToken, refreshToken, authLoading, userInfor } = useAuth();
  const location = useLocation();

  const role = userInfor?.role;

  if (authLoading) {
    return (
      <main className="flex justify-center items-center w-full h-full">
        <span className="loading loading-dots text-accent loading-lg"></span>
      </main>
    );
  }

  // Not logged in
  if (!accessToken && !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 Kiosk Navigation Guard
  // If passcode is set and navigation is locked, don't allow going anywhere except QR Entry
  if (
    hasPasscode() &&
    !isNavUnlocked() &&
    location.pathname !== "/qr-student-entry"
  ) {
    return <Navigate to="/qr-student-entry" replace />;
  }

  // If userRole is array → check includes
  if (userRole && role && !userRole.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
