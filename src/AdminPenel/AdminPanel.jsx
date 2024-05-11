import React from 'react';
import Sidebar from '../layout/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashbaord from '../AdminPenel/Dashbaord';
import QRStudentEntry from './QRStudentEntry';
import { HideSideBarProvidor } from '../Context/HideSidebarContext';

function AdminPanel() {
    return (
        //This cotext ise for show and hide sidebar
        <HideSideBarProvidor>
            <main className="flex h-screen sm:h-screen relative">
                <Sidebar className="w-full" /> {/* Set a fixed width for the sidebar */}
                <section className="flex-1 p-5 h-fit"> {/* This will make the content area take up the remaining space */}
                    <Routes>
                        <Route path="/" element={<Dashbaord />} />
                        <Route path="/QRStudentEntry" element={<QRStudentEntry />} />
                    </Routes>
                </section>
            </main>
        </HideSideBarProvidor>
    );
}

export default AdminPanel;
