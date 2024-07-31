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
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height={17} width={17} id="Dashboard-3--Streamline-Core" ><desc>{"Dashboard 3 Streamline Icon: https://streamlinehq.com"}</desc><g id="dashboard-3--app-application-dashboard-home-layout-vertical"><path id="Union" fill="#8fbffa" fillRule="evenodd" d="M1.5 0.5c-0.552285 0 -1 0.447715 -1 1v6c0 0.55229 0.447715 1 1 1h4c0.55229 0 1 -0.44771 1 -1v-6c0 -0.552285 -0.44771 -1 -1 -1h-4Zm6 1c0 -0.552285 0.44772 -1 1 -1h4c0.5523 0 1 0.447715 1 1v2.01c0 0.55228 -0.4477 1 -1 1h-4c-0.55228 0 -1 -0.44772 -1 -1V1.5Zm0 5c0 -0.55228 0.44772 -1 1 -1h4c0.5523 0 1 0.44772 1 1v6c0 0.5523 -0.4477 1 -1 1h-4c-0.55228 0 -1 -0.4477 -1 -1v-6Zm-7 3.99c0 -0.55229 0.447715 -1.00001 1 -1.00001h4c0.55229 0 1 0.44772 1 1.00001v2.01c0 0.5523 -0.44771 1 -1 1h-4c-0.552285 0 -1 -0.4477 -1 -1v-2.01Z" clipRule="evenodd" strokeWidth={1} /></g></svg>
            },
            {
                btnType: "QR Student Entry",
                path: "/QRStudentEntry",
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height={17} width={17} id="User-Profile-Focus--Streamline-Core" ><desc>{"User Profile Focus Streamline Icon: https://streamlinehq.com"}</desc><g id="user-profile-focus--close-geometric-human-person-profile-focus-user"><path id="Union" fill="#c3fa8f" fillRule="evenodd" d="M2.07322 2.07322C2.12011 2.02634 2.1837 2 2.25 2h2c0.41421 0 0.75 -0.33579 0.75 -0.75C5 0.835786 4.66421 0.5 4.25 0.5h-2c-0.46413 0 -0.90925 0.184375 -1.23744 0.51256C0.684375 1.34075 0.5 1.78587 0.5 2.25v2c0 0.41421 0.335786 0.75 0.75 0.75 0.41421 0 0.75 -0.33579 0.75 -0.75v-2c0 -0.0663 0.02634 -0.12989 0.07322 -0.17678ZM9.75 0.5C9.33579 0.5 9 0.835786 9 1.25c0 0.41421 0.33579 0.75 0.75 0.75h2c0.0663 0 0.1299 0.02634 0.1768 0.07322 0.0469 0.04689 0.0732 0.11048 0.0732 0.17678v2c0 0.41421 0.3358 0.75 0.75 0.75s0.75 -0.33579 0.75 -0.75v-2c0 -0.46413 -0.1844 -0.90925 -0.5126 -1.23744C12.6592 0.684375 12.2141 0.5 11.75 0.5h-2Zm3 8.5c0.4142 0 0.75 0.33579 0.75 0.75v2c0 0.4641 -0.1844 0.9092 -0.5126 1.2374 -0.3282 0.3282 -0.7733 0.5126 -1.2374 0.5126h-2c-0.41421 0 -0.75 -0.3358 -0.75 -0.75s0.33579 -0.75 0.75 -0.75h2c0.0663 0 0.1299 -0.0263 0.1768 -0.0732 0.0469 -0.0469 0.0732 -0.1105 0.0732 -0.1768v-2c0 -0.41421 0.3358 -0.75 0.75 -0.75ZM2 9.75C2 9.33579 1.66421 9 1.25 9c-0.414214 0 -0.75 0.33579 -0.75 0.75v2c0 0.4641 0.184375 0.9092 0.51256 1.2374 0.32819 0.3282 0.77331 0.5126 1.23744 0.5126h2c0.41421 0 0.75 -0.3358 0.75 -0.75S4.66421 12 4.25 12h-2c-0.0663 0 -0.12989 -0.0263 -0.17678 -0.0732C2.02634 11.8799 2 11.8163 2 11.75v-2Z" clipRule="evenodd" strokeWidth={1} /><path id="Union_2" fill="#29c528" fillRule="evenodd" d="M8.99976 4.5c0 1.10457 -0.89543 2 -2 2s-2 -0.89543 -2 -2 0.89543 -2 2 -2 2 0.89543 2 2Zm-6.35824 5.8754C3.14104 8.4346 4.90221 7 6.99972 7c2.0975 0 3.85868 1.4346 4.35818 3.3754 0.0386 0.1497 0.0057 0.3088 -0.089 0.4309 -0.0947 0.1222 -0.2406 0.1937 -0.3952 0.1937H3.12574c-0.15458 0 -0.30047 -0.0715 -0.39517 -0.1937 -0.09471 -0.1221 -0.12758 -0.2812 -0.08905 -0.4309Z" clipRule="evenodd" strokeWidth={1} /></g></svg>
            },
            {
                btnType: "Book",
                path: "/BookManagement",
                icon: <svg height={17} width={17} viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M630.4 13.92V32H608c-36.8 68.8-8 108.8 0 116.8h27.2V296h304v32h-22.4c-36.8 68.8-8 107.2 0 116.8H944v341.856c50.576-79.376 80-173.552 80-274.656 0-242-167.936-444.64-393.6-498.08zM385.6 905.6v-176H174.4h-3.2c-8 0-36.8-1.6-60.8-24-22.4-20.8-33.6-52.8-33.6-94.4V242.336C28.16 320.656 0 413.024 0 512c0 265.056 201.408 483.056 459.52 509.344-11.968-2.864-26.848-8.768-40.32-21.344-22.4-20.8-33.6-52.8-33.6-94.4zM475.2 294.4c-49.6 0-89.6 41.6-89.6 91.2 0-49.6 40-91.2 91.2-91.2h-1.6z" fill="#E8E8E8"></path><path d="M564.8 294.4h40V180.8h-41.6v113.6zM148.8 179.2c4.8 1.6 11.2 1.6 17.6 1.6h1.6c-6.4 0-11.2 0-17.6-1.6-7.168-1.6-14.336-3.984-21.104-7.168-6.512 7.328-12.8 14.88-18.896 22.576V611.2c0 32 6.4 56 22.4 70.4 17.6 17.6 41.6 16 41.6 16h211.2v-40H148.8V179.2zM166.4 148.8h404.8c-3.2-6.4-6.4-12.8-8-20.8H344V96h214.4v-12.8H259.2v-16.368a513.696 513.696 0 0 0-106.224 80.256c4.32 1.024 8.768 1.712 13.424 1.712zM564.8 51.2c3.2-6.4 4.8-12.8 8-19.2H333.6a512.79 512.79 0 0 0-44.96 19.2H564.8zM475.2 324.8c-32 0-57.6 27.2-57.6 59.2 0 33.6 25.6 59.2 57.6 59.2H880c-3.2-6.4-6.4-12.8-8-20.8H652.8v-32h214.4v-12.8H568v-32h305.6c3.2-6.4 4.8-12.8 8-19.2v-1.6H475.2z" fill="#E8E8E8"></path><path d="M771.008 953.6H872V475.2H473.6c-5.824 0-10.416-0.144-16-1.344V953.6h313.408z" fill="#9DE8F7"></path><path d="M475.2 443.2H880c-3.2-6.4-6.4-12.8-8-20.8H652.8v-32h214.4v-12.8H568v-32h305.6c3.2-6.4 4.8-12.8 8-19.2v-1.6H475.2c-32 0-57.6 27.2-57.6 59.2 0 33.6 25.6 59.2 57.6 59.2zM152.976 147.088c4.32 1.024 8.768 1.712 13.424 1.712h404.8c-3.2-6.4-6.4-12.8-8-20.8H344V96h214.4v-12.8H259.2v-32h305.6c3.2-6.4 4.8-12.8 8-19.2H166.4C136 32 108.8 57.6 108.8 89.6c0 28.72 18.768 51.44 44.176 57.488z" fill="#FFFFFF"></path><path d="M476.8 294.4h128V180.8H168c-6.4 0-11.2 0-17.6-1.6-7.168-1.6-14.336-3.984-21.104-7.168-6.832-3.2-13.264-7.216-18.896-12.032v451.2c0 32 6.4 56 22.4 70.4 17.6 17.6 41.6 16 41.6 16h211.2v-312c0-49.6 40-91.2 91.2-91.2z" fill="#FFFFFF"></path><path d="M916.8 444.8c-8-9.6-36.8-48 0-116.8h22.4v-32h-304V148.8H608c-8-8-36.8-48 0-116.8h22.4V0h-464C116.8 0 76.8 40 76.8 91.2v520c0 41.6 11.2 73.6 33.6 94.4 24 22.4 52.8 24 60.8 24H385.6v176c0 41.6 11.2 73.6 33.6 94.4 13.472 12.576 28.352 18.48 40.32 21.344 9.344 2.224 16.976 2.656 20.48 2.656h464V444.8h-27.2z m-35.2-120v1.6c-3.2 6.4-4.8 12.8-8 19.2H568v32h299.2v12.8H652.8v32H872c1.6 8 4.8 14.4 8 20.8H475.2c-32 0-57.6-25.6-57.6-59.2 0-32 25.6-59.2 57.6-59.2h406.4z m-496 332.8v40H174.4s-24 1.6-41.6-16c-16-14.4-22.4-38.4-22.4-70.4V160c5.632 4.816 12.064 8.832 18.896 12.032C136.064 175.216 143.232 177.6 150.4 179.2c6.4 1.6 11.2 1.6 17.6 1.6h436.8v113.6h-128c-51.2 0-91.2 41.6-91.2 91.2v272zM166.4 32h406.4c-3.2 6.4-4.8 12.8-8 19.2H259.2v32h299.2V96H344v32h219.2c1.6 8 4.8 14.4 8 20.8H166.4c-4.656 0-9.104-0.688-13.424-1.712C127.568 141.04 108.8 118.32 108.8 89.6 108.8 57.6 136 32 166.4 32zM912 831.424V992H481.6s-22.4 1.6-41.6-16c-16-14.4-24-38.4-24-70.4V454.4c11.2 9.6 25.6 16 40 19.2 0.576 0.144 1.04 0.128 1.6 0.256 5.584 1.2 10.176 1.344 16 1.344H912v356.224z" fill=""></path><path d="M475.2 294.4h88V180.8H166.4c-6.4 0-12.8 0-17.6-1.6v478.4h236.8v-272c0-49.6 40-91.2 89.6-91.2z" fill="#FAD97F"></path></g></svg>
            }
            ,
            {
                btnType: "Score",
                path: "/ScoreStudent",
                icon: <img src={medal} alt="modal" width={17} height={17}/>
            },
            {
                btnType: "Backup",
                path: "/Backup",
                icon: <img src={backup} alt="excel" width={17} height={17}/>
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
