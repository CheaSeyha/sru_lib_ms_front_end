import React, { useState } from 'react'
import imageProfile from '../assets/logo/sru_logo.png'
import SidebarMenuButton from '../layout/Component/SidebarMenuButton'
import { useHideSideBar } from '../Context/HideSidebarContext';
import { useThemeSwitch } from '../Context/ThemeSwitchContext';
import { useLocation } from 'react-router-dom';
import medal from '../../src/assets/image/medal.svg'
import backup from '../../src/assets/image/backup.svg'

function Sidebar() {
    // State to track the current theme
    // const [theme, setTheme] = useState('dark');
    const { theme, toggleTheme } = useThemeSwitch()
    // For disble and enable side bar on mobile screen 
    const { isHideSideBar } = useHideSideBar()
    //Get The Link Path To Know Is In /QRStudentEntry if true then hide the sidebar 
    const GetLinkPath = useLocation().pathname

    const BtnMenu =
        [
            {
                btnType: "Dashbaord",
                path: "/",
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height={17} width={17} id="Dashboard-3--Streamline-Core" ><desc>{"Dashboard 3 Streamline Icon: https://streamlinehq.com"}</desc><g id="dashboard-3--app-application-dashboard-home-layout-vertical"><path id="Union" fill="#8fbffa" fillRule="evenodd" d="M1.5 0.5c-0.552285 0 -1 0.447715 -1 1v6c0 0.55229 0.447715 1 1 1h4c0.55229 0 1 -0.44771 1 -1v-6c0 -0.552285 -0.44771 -1 -1 -1h-4Zm6 1c0 -0.552285 0.44772 -1 1 -1h4c0.5523 0 1 0.447715 1 1v2.01c0 0.55228 -0.4477 1 -1 1h-4c-0.55228 0 -1 -0.44772 -1 -1V1.5Zm0 5c0 -0.55228 0.44772 -1 1 -1h4c0.5523 0 1 0.44772 1 1v6c0 0.5523 -0.4477 1 -1 1h-4c-0.55228 0 -1 -0.4477 -1 -1v-6Zm-7 3.99c0 -0.55229 0.447715 -1.00001 1 -1.00001h4c0.55229 0 1 0.44772 1 1.00001v2.01c0 0.5523 -0.44771 1 -1 1h-4c-0.552285 0 -1 -0.4477 -1 -1v-2.01Z" clipRule="evenodd" strokeWidth={1} /></g></svg>,
                dropDownButton: false
            },
            {
                btnType: "QR Student Entry",
                path: "/QRStudentEntry",
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height={17} width={17} id="User-Profile-Focus--Streamline-Core" ><desc>{"User Profile Focus Streamline Icon: https://streamlinehq.com"}</desc><g id="user-profile-focus--close-geometric-human-person-profile-focus-user"><path id="Union" fill="#c3fa8f" fillRule="evenodd" d="M2.07322 2.07322C2.12011 2.02634 2.1837 2 2.25 2h2c0.41421 0 0.75 -0.33579 0.75 -0.75C5 0.835786 4.66421 0.5 4.25 0.5h-2c-0.46413 0 -0.90925 0.184375 -1.23744 0.51256C0.684375 1.34075 0.5 1.78587 0.5 2.25v2c0 0.41421 0.335786 0.75 0.75 0.75 0.41421 0 0.75 -0.33579 0.75 -0.75v-2c0 -0.0663 0.02634 -0.12989 0.07322 -0.17678ZM9.75 0.5C9.33579 0.5 9 0.835786 9 1.25c0 0.41421 0.33579 0.75 0.75 0.75h2c0.0663 0 0.1299 0.02634 0.1768 0.07322 0.0469 0.04689 0.0732 0.11048 0.0732 0.17678v2c0 0.41421 0.3358 0.75 0.75 0.75s0.75 -0.33579 0.75 -0.75v-2c0 -0.46413 -0.1844 -0.90925 -0.5126 -1.23744C12.6592 0.684375 12.2141 0.5 11.75 0.5h-2Zm3 8.5c0.4142 0 0.75 0.33579 0.75 0.75v2c0 0.4641 -0.1844 0.9092 -0.5126 1.2374 -0.3282 0.3282 -0.7733 0.5126 -1.2374 0.5126h-2c-0.41421 0 -0.75 -0.3358 -0.75 -0.75s0.33579 -0.75 0.75 -0.75h2c0.0663 0 0.1299 -0.0263 0.1768 -0.0732 0.0469 -0.0469 0.0732 -0.1105 0.0732 -0.1768v-2c0 -0.41421 0.3358 -0.75 0.75 -0.75ZM2 9.75C2 9.33579 1.66421 9 1.25 9c-0.414214 0 -0.75 0.33579 -0.75 0.75v2c0 0.4641 0.184375 0.9092 0.51256 1.2374 0.32819 0.3282 0.77331 0.5126 1.23744 0.5126h2c0.41421 0 0.75 -0.3358 0.75 -0.75S4.66421 12 4.25 12h-2c-0.0663 0 -0.12989 -0.0263 -0.17678 -0.0732C2.02634 11.8799 2 11.8163 2 11.75v-2Z" clipRule="evenodd" strokeWidth={1} /><path id="Union_2" fill="#29c528" fillRule="evenodd" d="M8.99976 4.5c0 1.10457 -0.89543 2 -2 2s-2 -0.89543 -2 -2 0.89543 -2 2 -2 2 0.89543 2 2Zm-6.35824 5.8754C3.14104 8.4346 4.90221 7 6.99972 7c2.0975 0 3.85868 1.4346 4.35818 3.3754 0.0386 0.1497 0.0057 0.3088 -0.089 0.4309 -0.0947 0.1222 -0.2406 0.1937 -0.3952 0.1937H3.12574c-0.15458 0 -0.30047 -0.0715 -0.39517 -0.1937 -0.09471 -0.1221 -0.12758 -0.2812 -0.08905 -0.4309Z" clipRule="evenodd" strokeWidth={1} /></g></svg>,
                dropDownButton: false
            },
            {
                btnType: "Book",
                path: "/BookManagement",
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Book-2--Streamline-Core" height={17} width={17} ><desc>{"Book 2 Streamline Icon: https://streamlinehq.com"}</desc><g id="book-2--library-content-books-book-shelf-stack"><path id="Vector 3900" fill="#00cfff" d="M3.2142857142857144 0.5357142857142857H1.0714285714285714C0.7755621428571429 0.5357142857142857 0.5357142857142857 0.7755621428571429 0.5357142857142857 1.0714285714285714v12.857142857142858c0 0.29582142857142857 0.23984785714285714 0.5357142857142857 0.5357142857142857 0.5357142857142857h2.142857142857143c0.2958642857142857 0 0.5357142857142857 -0.23989285714285713 0.5357142857142857 -0.5357142857142857V1.0714285714285714c0 -0.2958664285714286 -0.23985 -0.5357142857142857 -0.5357142857142857 -0.5357142857142857Z" strokeWidth={1} /><path id="Intersect" fill="#087093" fillRule="evenodd" d="M3.75 9.910714285714285h-3.2142857142857144v1.6071428571428572h3.2142857142857144v-1.6071428571428572Z" clipRule="evenodd" strokeWidth={1} /><path id="Vector 3902" fill="#087093" d="M7.5 2.142857142857143H5.357142857142857c-0.2958642857142857 0 -0.5357142857142857 0.23985 -0.5357142857142857 0.5357142857142857V13.928571428571429c0 0.29582142857142857 0.23985 0.5357142857142857 0.5357142857142857 0.5357142857142857h2.142857142857143c0.2958642857142857 0 0.5357142857142857 -0.23989285714285713 0.5357142857142857 -0.5357142857142857V2.6785714285714284c0 -0.2958642857142857 -0.23985 -0.5357142857142857 -0.5357142857142857 -0.5357142857142857Z" strokeWidth={1} /><path id="Vector 3903" fill="#00cfff" d="M11.534142857142857 2.368457142857143c-0.07660714285714285 -0.2857821428571429 -0.3702857142857143 -0.4553892857142857 -0.6561428571428571 -0.3788142857142857l-2.069785714285714 0.5546142857142857c-0.2857928571428571 0.076575 -0.4553892857142857 0.3703285714285714 -0.3788142857142857 0.6561214285714286L11.341071428571428 14.067c0.07660714285714285 0.2858571428571428 0.37039285714285713 0.45546428571428565 0.6561428571428571 0.3788571428571429l2.069892857142857 -0.5545714285714285c0.28575 -0.07660714285714285 0.45535714285714285 -0.37039285714285713 0.37875 -0.6561428571428571L11.534142857142857 2.368457142857143Z" strokeWidth={1} /><path id="Intersect_2" fill="#087093" fillRule="evenodd" d="m13.317214285714284 9.02277857142857 -3.104764285714286 0.8319214285714286 0.4159607142857143 1.5523714285714285 3.1047321428571424 -0.8319107142857143 -0.4159285714285714 -1.552382142857143Z" clipRule="evenodd" strokeWidth={1} /></g></svg>,
                dropDownButton: true
            }
            ,
            {
                btnType: "Score",
                path: "/ScoreStudent",
                icon: <img src={medal} alt="modal" width={17} height={17} />,
                dropDownButton: false
            },
            {
                btnType: "Backup",
                path: "/Backup",
                icon: <img src={backup} alt="excel" width={17} height={17} />,
                dropDownButton: false
            }
        ]
    return (
        <>
            {/* if GetLinkPath = true it mean user in QRStudetnEntry Form So We need to hide the side bar and show only from for scan  */}
            <section className={`
                z-50 sidebar 
                ${isHideSideBar ? 'translate-x-0' : 'translate-x-[-250px]'}
                ${GetLinkPath === "/QRStudentEntry" ? 'absolute translate-x-[-250px]' : 'absolute sm:relative translate-x-0 sm:translate-x-0'}
                 transition-transform ease-in-out 
                delay-150 sm:left-0 sm:right-0  
                w-[223px] sm:w-fit lg:w-[223px] h-[100vh] shadow-xl 
                bg-secondary text-accent
            `}>
                {/* Sidebar header  */}
                {/* User Frofile  */}
                <header className='header-sidebar shadow-md bg-primary w-full h-[100px] p-[10px] lg:ps-[14px] bg-light-bg-sec flex items-center rounded-br-[50px] sm:rounded-br-[20px] lg:rounded-br-[50px] transition-transform ease-in-out duration-300'>
                    <div className="user-prfile w-[52px] h-[52px]">
                        <img src={imageProfile} alt="logo sru" />
                    </div>
                    <div className="user-name font-sans text-light-text ps-2 blok sm:hidden lg:block">
                        <p className='font-bold'>JOHN SEY</p>
                        <p className='text-[10px]'>ADMIN</p>
                    </div>
                </header>
                {/* User Frofile  */}
                {/* Sidebar header  */}
                {/* Sidebar menu  */}
                <section className='Sidebar-Menu-Container w-full h-fit px-[10px] mt-[40px]'>
                    {/* Show Summary data  */}
                    <div className="Side-menu w-full h-fit">
                        {BtnMenu.map((e, index) => (
                            <SidebarMenuButton
                                key={index}
                                btnMenuType={e.btnType}
                                path={e.path}
                                icon={e.icon}
                                dropDownButton={e.dropDownButton}
                            />
                        ))}
                        <div className="m-auto line w-[80%] h-[1px] bg-gray-400 my-5"></div>
                    </div>
                    {/* Show Summary data  */}
                    {/* Change Theme Dark-light  */}
                    <div className="themeSwitch w-full flex justify-center">
                        <label className="swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input id='themeSwitch' type="checkbox" onClick={toggleTheme} />
                            {/* sun icon */}
                            <svg className="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                            {/* moon icon */}
                            <svg className="swap-off fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                        </label>
                    </div>
                    {/* Change Theme Dark-light  */}
                </section>
                {/* Sidebar menu  */}
            </section>
        </>
    )
}

export default Sidebar
