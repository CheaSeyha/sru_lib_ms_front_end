import React, { useEffect, useRef } from 'react';
import { useHideSideBar } from '../../Context/HideSidebarContext';

function SideBarToggle() {
    const { isHideSideBar, setIsHideSideBar } = useHideSideBar();
    const checkboxRef = useRef(null);

    const handleHideSidebar = () => {
        setIsHideSideBar(!isHideSideBar);
    };

    // This effect will synchronize the checkbox state with isHideSideBar
    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.checked = isHideSideBar;
        }
    }, [isHideSideBar]);

    return (
        <label className="btn btn-circle swap swap-rotate text-white justify-self-end">
            {/* This hidden checkbox controls the state */}
            <input
                ref={checkboxRef}
                id="sideBarToggle"
                type="checkbox"
                onChange={handleHideSidebar}
            />

            {/* Hamburger icon */}
            <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
            >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            {/* Close icon */}
            <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
            >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
        </label>
    );
}

export default SideBarToggle;
