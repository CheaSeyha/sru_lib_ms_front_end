import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './ComponentLayer/AdminPanel';
import { HideSideBarProvidor } from './Context/HideSidebarContext';
import { ThemeSwitchProvider } from './Context/ThemeSwitchContext';
import { AuthProvider } from './Context/AuthProvider';
import LoginForm from './ComponentLayer/LoginRegiter/LoginForm';
import ProtectedRoute from './ComponentLayer/ProtectedRoute'; // Ensure this path is correct
import Dashbaord from './ComponentLayer/AdminPanel/Dashbaord';
import QRStudentEntry from './ComponentLayer/QrEntry/QRStudentEntry';
import BookManagement from './ComponentLayer/Book/BookManagement';
import AnalyticForm from './ComponentLayer/Analytic/AnalyticForm';
import StaffManageForm from './ComponentLayer/StaffManage/StaffManageForm';
import StudentManage from './ComponentLayer/StudentManage/StudentManage';

function App() {
  return (
    <AuthProvider>
      <HideSideBarProvidor>
        <ThemeSwitchProvider>
          <div className="bg-base-300">
            <Routes>
              {/* Public Route: Login Page */}
              <Route path="/Login" element={<LoginForm />} />

              {/* Protected Routes: Only accessible after login */}
              <Route
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Dashbaord />} />
                <Route path="/QRStudentEntry" element={<QRStudentEntry />} />
                <Route path="BookManagement">
                  <Route path="AddBook" element={<BookManagement />} />
                  <Route path="BookBorrowed" element={<BookManagement />} />
                  <Route path="TimeSpent" element={<BookManagement />} />
                  <Route path="Backup" element={<BookManagement />} />
                  <Route path="Donation" element={<BookManagement />} />
                </Route>
                <Route path="/StaffManage" element={<ProtectedRoute roleRequired="ADMIN"><StaffManageForm /></ProtectedRoute>} />
                <Route path="/StudentManage" element={<StudentManage />} />
                <Route path="/Analytic" element={<ProtectedRoute roleRequired="ADMIN"><AnalyticForm /></ProtectedRoute>} />
                <Route path="/unauthorized" element={
                  <main className='flex text-accent justify-center items-center w-full h-full space-y-5'>
                    <p>Unauthorized</p>
                  </main>
                } />
              </Route>
            </Routes>
          </div>
        </ThemeSwitchProvider>
      </HideSideBarProvidor>
    </AuthProvider>
  );
}

export default App;
