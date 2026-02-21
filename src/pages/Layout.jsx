import React from "react";
import Sidebar from "../layout/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import SideBarToggle from "../layout/components/SideBarToggle";
import { ScanResultIDProvider } from "../Context/ScanResultIDContext";

function Layout() {
  const { pathname } = useLocation();
  return (
    <ScanResultIDProvider>
      <main className="flex h-screen relative">
        <div
          className={`sideBarToggle ${pathname === "/QRStudentEntry" ? "hidden" : "block"} absolute top-5 right-5 flex flex-col sm:hidden items-end z-50`}
        >
          <SideBarToggle />
        </div>

        <Sidebar />

        <section className="flex-1 p-5 overflow-y-auto scrollbar-hide">
          <Outlet />
        </section>
      </main>
    </ScanResultIDProvider>
  );
}

export default Layout;
