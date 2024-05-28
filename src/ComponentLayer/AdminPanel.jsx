import React from 'react';
import Sidebar from '../layout/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashbaord from './AdminPanel/Dashbaord';
import QRStudentEntry from './QrEntry/QRStudentEntry';
import { HideSideBarProvidor } from '../Context/HideSidebarContext';
import SideBarToggle from '../layout/Component/SideBarToggle'
import { ThemeSwitchProvider } from '../Context/ThemeSwitchContext';
function AdminPanel() {

    return (
        //This cotext ise for show and hide sidebar
        <HideSideBarProvidor>
            <ThemeSwitchProvider>
                <main className="flex h-screen sm:h-screen relative">
                    <div className="sideBarToggle absolute p-10 w-full flex flex-col sm:hidden items-end z-50">
                        {/* for hide or show sidebar when in mobile view  */}
                        <SideBarToggle />
                    </div>
                    <Sidebar /> {/* Set a fixed width for the sidebar */}
                    <section className="flex-1 p-5 xl:h-full overflow-y-auto sm:overscroll-y-none"> {/* This will make the content area take up the remaining space */}
                        <Routes>
                            <Route path="/" element={<Dashbaord />} />
                            <Route path="/QRStudentEntry" element={<QRStudentEntry />} />
                        </Routes>
                    </section>
                </main>
            </ThemeSwitchProvider>
        </HideSideBarProvidor>
    );
}

export default AdminPanel;
