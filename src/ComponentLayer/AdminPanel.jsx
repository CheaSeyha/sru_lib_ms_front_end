import React from 'react';
import Sidebar from '../layout/SideBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashbaord from './AdminPanel/Dashbaord';
import QRStudentEntry from './QrEntry/QRStudentEntry';
import { HideSideBarProvidor } from '../Context/HideSidebarContext';
import SideBarToggle from '../layout/Component/SideBarToggle';
import { ThemeSwitchProvider } from '../Context/ThemeSwitchContext';

function AdminPanel() {
    const pathLocation = useLocation();

    return (
        <HideSideBarProvidor>
            <ThemeSwitchProvider>
                <main className="flex h-screen sm:h-screen relative">
                    {/* Check if the current path is not "/QRStudentEntry" */}
                    {pathLocation.pathname !== "/QRStudentEntry" && (
                        <>
                            <div className="sideBarToggle absolute p-10 w-full flex flex-col sm:hidden items-end z-50">
                                {/* for hide or show sidebar when in mobile view  */}
                                <SideBarToggle />
                            </div>
                            <Sidebar />
                        </>
                    )}

                    {/* Always render the Sidebar component */}


                    <section className="flex-1 p-5 xl:h-full overflow-y-auto sm:overscroll-y-none scrollbar-hide">
                        {/* This will make the content area take up the remaining space */}
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
