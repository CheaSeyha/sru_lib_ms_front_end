import React from 'react';
import { NavLink } from 'react-router-dom';

function SidebarMenuButton({ btnMenuType, icon, path }) {
    return (
        <NavLink
            to={path}
            className={({ isActive }) => (
                `sidebar-button hover:bg-base-100 ps-5 sm:ps-0 lg:ps-3 space-x-3 cursor-pointer w-full h-[45px] flex sm:justify-center lg:justify-start items-center rounded-[10px] ease-in-out duration-300 ${isActive ? 'bg-base-100 ' : 'text-neutral'}`
            )}
        >
            <div className="icon ">
                {icon}
            </div>
            <p className='block sm:hidden lg:block text-[13px]'>{btnMenuType}</p>
        </NavLink>
    );
}

export default SidebarMenuButton;
