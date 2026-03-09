import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./pages/Layout";
import { HideSideBarProvidor } from "./context/HideSidebarContext";
import { ThemeSwitchProvider } from "./context/ThemeSwitchContext";
import { AuthProvider } from "./context/AuthProvider";
import LoginForm from "./pages/Auth/Auth";
import ProtectedRoute from "./pages/ProtectedRoute"; // Ensure this path is correct
import Dashbaord from "./pages/Dashboard/Dashboard";
import QRStudentEntry from "./pages/QrEntry/QRStudentEntry";
import BookManagement from "./pages/Book/BookManagement";
import AnalyticForm from "./pages/Analytic/AnalyticForm";
import StaffManageForm from "./pages/StaffManage/StaffManageForm";
import StudentManage from "./pages/StudentManage/StudentManage";
import { AnimatePresence } from "framer-motion";
import UserMange from "./pages/UserManage/UserMange";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <HideSideBarProvidor>
        <ThemeSwitchProvider>
          <div className="bg-base-300">
            <AnimatePresence mode="wait">
              <Routes
                location={location}
                key={location.pathname.split("/")[1] || "/"}
              >
                {/* Public Route: Login Page */}
                <Route path="/Login" element={<LoginForm />} />

                {/* Protected Routes: Only accessible after login */}
                <Route
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/" element={<Dashbaord />} />
                  <Route
                    path="/qr-student-entry"
                    element={<QRStudentEntry />}
                  />
                  <Route path="book-management">
                    <Route path="add-book" element={<BookManagement />} />
                    <Route path="book-borrowed" element={<BookManagement />} />
                    <Route path="time-spent" element={<BookManagement />} />
                    <Route path="book-trash" element={<BookManagement />} />
                    <Route path="donation" element={<BookManagement />} />
                  </Route>
                  <Route
                    path="/staff-manage"
                    element={
                      <ProtectedRoute userRole={["ADMIN", "SUPER_ADMIN"]}>
                        <StaffManageForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/college-manage" element={<StudentManage />} />
                  <Route
                    path="/analytic"
                    element={
                      <ProtectedRoute userRole={["ADMIN", "SUPER_ADMIN"]}>
                        <AnalyticForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-manage"
                    element={
                      <ProtectedRoute userRole={["SUPER_ADMIN"]}>
                        <UserMange />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/unauthorized"
                    element={
                      <main className="flex text-accent justify-center items-center w-full h-full space-y-5">
                        <p>Unauthorized</p>
                      </main>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <main className="flex text-accent justify-center items-center w-full h-full space-y-5">
                        <p>404 Not Found</p>
                      </main>
                    }
                  />
                </Route>
              </Routes>
            </AnimatePresence>
          </div>
        </ThemeSwitchProvider>
      </HideSideBarProvidor>
    </AuthProvider>
  );
}

export default App;
