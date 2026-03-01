import React from "react";
import Sidebar from "../layout/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import SideBarToggle from "../layout/components/SideBarToggle";
import { ScanResultIDProvider } from "../context/ScanResultIDContext";
import { motion, AnimatePresence } from "framer-motion";

function Layout() {
  const { pathname } = useLocation();
  return (
    <ScanResultIDProvider>
      <main className="flex h-screen relative bg-base-300">
        <div
          className={`sideBarToggle ${pathname === "/qr-student-entry" ? "hidden" : "block"} absolute top-5 right-5 flex flex-col sm:hidden items-end z-50`}
        >
          <SideBarToggle />
        </div>

        <Sidebar />

        <section className="flex-1 p-5 overflow-y-auto scrollbar-hide relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </ScanResultIDProvider>
  );
}

export default Layout;
