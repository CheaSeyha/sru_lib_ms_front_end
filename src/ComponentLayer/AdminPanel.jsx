import React, { useState } from 'react';
import Sidebar from '../layout/SideBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashbaord from './AdminPanel/Dashbaord';
import QRStudentEntry from './QrEntry/QRStudentEntry';
import SideBarToggle from '../layout/Component/SideBarToggle';
import { ScanResultIDProvider } from './Context/ScanResultIDContext';
import BookManagement from './Book/BookManagement';
import AnalyticForm from './Analytic/AnalyticForm';
import StaffManageForm from './StaffManage/StaffManageForm';
import LoginForm from './LoginRegiter/LoginForm';
import StudentManage from './StudentManage/StudentManage';
import ProtectedRoute from './ProtectedRoute'; // Correct import

function AdminPanel() {
    const { pathname } = useLocation();
    return (
        <ScanResultIDProvider>
            <main className="flex h-screen relative">
                <div className={`sideBarToggle ${pathname === "/QRStudentEntry" ? "hidden" : "block"} absolute top-5 right-5 flex flex-col sm:hidden items-end z-50`}>
                    <SideBarToggle />
                </div>

                <Sidebar />

                <section className="flex-1 p-5 overflow-y-auto scrollbar-hide">
                    <Routes>
                        <Route path="/" element={<ProtectedRoute ><Dashbaord /></ProtectedRoute>} />
                        <Route path="/QRStudentEntry" element={<ProtectedRoute><QRStudentEntry /></ProtectedRoute>} />
                        <Route path="/BookManagement/*" element={<ProtectedRoute><Routes>
                            <Route path="AddBook" element={<BookManagement />} />
                            <Route path="BookBorrowed" element={<BookManagement />} />
                            <Route path="TimeSpent" element={<BookManagement />} />
                            <Route path="Backup" element={<BookManagement />} />
                            <Route path="Donation" element={<BookManagement />} />
                        </Routes></ProtectedRoute>} />
                        <Route path="/StaffManage" element={<ProtectedRoute roleRequired="ADMIN"><StaffManageForm /></ProtectedRoute>} />
                        <Route path="/StudentManage" element={<ProtectedRoute><StudentManage /></ProtectedRoute>} />
                        <Route path="/Analytic" element={<ProtectedRoute roleRequired="ADMIN"><AnalyticForm /></ProtectedRoute>} />
                        <Route path="/unauthorized" element={
                            <main className='flex text-accent justify-center items-center w-full h-full space-y-5'>
                                <p>Unauthorized</p>
                            </main>
                        } />
                    </Routes>
                </section>
            </main>
        </ScanResultIDProvider>
    );
}

export default AdminPanel;
