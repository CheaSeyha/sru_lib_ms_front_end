import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronUp } from "lucide-react"; // Adjust imports as needed
import { useHideSideBar } from "../../context/HideSidebarContext";

function SidebarMenuButton({
  btnMenuType,
  icon,
  path,
  dropDownButton,
  dropDownButtonData,
}) {
  const GetLinkPath = useLocation().pathname;
  const [showDropdown, setShowDropdown] = useState(false); // Use for showing and hiding Dropdown menu button
  const { isHideSideBar, setIsHideSideBar } = useHideSideBar();

  const handleHideShowDropDonw = () => {
    if (dropDownButton) {
      setShowDropdown(!showDropdown);
    }
    setIsHideSideBar(!isHideSideBar);
  };

  useEffect(() => {
    if (dropDownButton) {
      // Check if the current path is in the dropdown menu
      const dropdownPaths = [
        "/book-management/add-book",
        "/book-management/donation",
        "/book-management/book-borrowed",
        "/book-management/time-spent",
        "/book-management/book-trash",
      ];
      setShowDropdown(dropdownPaths.includes(GetLinkPath));
    }
  }, [GetLinkPath, dropDownButton]);

  return (
    <>
      <NavLink
        to={showDropdown ? GetLinkPath : path}
        onClick={handleHideShowDropDonw}
        className={({ isActive }) =>
          `sidebar-button hover:bg-base-100 ps-5 sm:ps-0 lg:ps-3 space-x-3 cursor-pointer 
                    w-full h-[45px] flex sm:justify-center lg:justify-start items-center 
                    rounded-[10px] ease-in-out duration-300 ${isActive || showDropdown ? "bg-base-100" : "text-neutral"} relative `
        }
      >
        <div className="icon">{icon}</div>
        <p className="block sm:hidden lg:block text-[13px]">{btnMenuType}</p>
        {dropDownButton && (
          <div
            className={`icon-dropdown absolute right-2 top-1/2 transform -translate-y-1/2 flex sm:hidden lg:flex`}
          >
            <ChevronUp
              className={`transition-transform duration-600 ease-in-out ${showDropdown ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        )}
      </NavLink>
      {/* Dropdown menu */}
      <div
        className={`transition-max-height px-5 sm:px-0 lg:px-5 duration-500 rounded-none sm:rounded-[10px] lg:rounded-none ease-in-out sm:bg-base-300 lg:bg-secondary overflow-hidden ${showDropdown ? "max-h-60" : "max-h-0"}`}
      >
        <ul className="ul border-s sm:border-s-0 lg:border-s border-accent text-[13px] sm:px-1 lg:px-0">
          {dropDownButtonData.map((data, index) => (
            <NavLink to={data.urlPath} key={index}>
              <li
                className={`li transition-all sm:border-b border-accent lg:border-none flex items-center gap-1 duration-150 cursor-pointer hover:bg-base-300 w-full h-full py-3 justify-start sm:justify-center lg:justify-start ps-5 sm:ps-0 lg:ps-5 ${GetLinkPath === data.urlPath ? "text-accent" : "text-neutral"}`}
              >
                {data.iconName}
                <p className="block sm:hidden lg:block text-[13px]">
                  {data.dropDownBtnType}
                </p>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SidebarMenuButton;
