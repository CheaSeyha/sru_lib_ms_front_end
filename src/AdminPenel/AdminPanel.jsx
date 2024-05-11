import React from 'react';
import Sidebar from '../layout/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashbaord from '../AdminPenel/Dashbaord';
import QRStudentEntry from './QRStudentEntry';
import { HideSideBarProvidor } from '../Context/HideSidebarContext';
import SideBarToggle from '../layout/Component/SideBarToggle'
function AdminPanel() {
    return (
        //This cotext ise for show and hide sidebar
        <HideSideBarProvidor>
            <main className="flex h-screen sm:h-screen relative">
                <div class="sideBarToggle absolute p-5 w-full flex flex-col sm:hidden items-end">
                    {/* for hide or show sidebar when in mobile view  */}
                    <SideBarToggle />
                </div>
                <Sidebar className="w-full" /> {/* Set a fixed width for the sidebar */}
                <section className="flex-1 p-0 sm:p-5 h-fit"> {/* This will make the content area take up the remaining space */}
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
