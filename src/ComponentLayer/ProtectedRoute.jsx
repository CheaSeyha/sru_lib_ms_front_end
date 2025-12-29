// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { accessToken, role, authLoading } = useAuth();

  if (authLoading) {
    return (
      <main className='flex justify-center items-center w-full h-full space-y-5'>
        <span className="loading loading-dots text-accent loading-lg">Tesing</span>
      </main>
    );
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
