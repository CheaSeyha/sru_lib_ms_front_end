import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './ComponentLayer/AdminPanel';
import { HideSideBarProvidor } from './Context/HideSidebarContext';
import { ThemeSwitchProvider } from './Context/ThemeSwitchContext';
import { AuthProvider } from './Context/AuthProvider';
import LoginForm from './ComponentLayer/LoginRegiter/LoginForm';
import ProtectedRoute from './ComponentLayer/ProtectedRoute'; // Ensure this path is correct

function App() {
  return (
    <AuthProvider>
      <HideSideBarProvidor>
        <ThemeSwitchProvider>
          <div className="bg-base-300">
            <Routes>
              {/* Public Route: Login Page */}
              <Route path="/login" element={<LoginForm />} />

              {/* Protected Routes: Only accessible after login */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </ThemeSwitchProvider>
      </HideSideBarProvidor>
    </AuthProvider>
  );
}

export default App;
