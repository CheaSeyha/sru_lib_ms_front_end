import React from 'react';
import Sidebar from '../layout/SideBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashbaord from './AdminPanel/Dashbaord';
import QRStudentEntry from './QrEntry/QRStudentEntry';
import SideBarToggle from '../layout/Component/SideBarToggle';
import { ScanResultIDProvider } from './Context/ScanResultIDContext';
import ScoreStudent from './ScoreStudent/ScoreStudent';
import BookManagement from './Book/BookManagement';
import Backup from './Backup/Backup';
import AnalyticForm from './Analytic/AnalyticForm';

function AdminPanel() {
    const GetLinkPath = useLocation().pathname

    return (
        <ScanResultIDProvider>
            <main className="flex h-screen sm:h-screen relative">
                <div className={`sideBarToggle ${GetLinkPath === "/QRStudentEntry" ? "hidden" : "block"} absolute p-10 w-full flex flex-col sm:hidden items-end z-50`}>
                    {/* for hide or show sidebar when in mobile view  */}
                    <SideBarToggle />
                </div>
                <Sidebar />
                {/* Always render the Sidebar component */}
                <section className="flex-1 p-5 xl:h-full overflow-y-auto sm:overscroll-y-none scrollbar-hide">
                    {/* This will make the content area take up the remaining space */}
                    <Routes>
                        <Route path="/" element={<Dashbaord />} />
                        <Route path="/QRStudentEntry" element={<QRStudentEntry />} />
                        <Route path="/BookManagement/AddBook" element={<BookManagement />} />
                        <Route path="/Analytic" element={<AnalyticForm/>} />
                        <Route path="/BookManagement/BookBorrowed" element={<BookManagement/>} />
                        <Route path="/ScoreStudent" element={<ScoreStudent />} />
                        <Route path="/Backup" element={<Backup />} />
                    </Routes>
                </section>
            </main>
        </ScanResultIDProvider>
    );
}

export default AdminPanel;
