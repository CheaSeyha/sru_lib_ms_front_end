import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import imageProfile from "../assets/logo/sru_logo.png";
import SidebarMenuButton from "./components/SidebarMenuButton";
import { useHideSideBar } from "../context/HideSidebarContext";
import { useThemeSwitch } from "../context/ThemeSwitchContext";
import { useLocation } from "react-router-dom";
import {
  ChevronUp,
  BookPlus,
  NotebookPen,
  ShieldCheck,
  DatabaseBackup,
  BookUser,
  UserCog,
  User,
  Settings,
  LogIn,
} from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import Modal from "./components/Modal";
import { X } from "lucide-react";
import BtnGredient from "./components/BtnGredient";
import SRULogo from "../assets/logo/sru_logo.png";
import { getSoundState, setSoundState } from "../utils/soundUtils";
import {
  savePasscode,
  hasPasscode,
  verifyPasscode,
  getStoredPasscode,
} from "../utils/passcodeUtils";
import toast from "react-hot-toast";

const menuContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const menuItem = {
  hidden: { opacity: 0, x: -140, y: 20 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

// Persistent flag to track if the sidebar has already animated in this session
let hasAnimated = false;

function Sidebar() {
  // Initialize sound state from local storage
  const [soundEnabled, setSoundEnabled] = useState(getSoundState());
  const [isFirstLoad] = useState(!hasAnimated);

  useEffect(() => {
    if (!hasAnimated) hasAnimated = true;
  }, []);

  // Effect to update sound state in local storage when it changes
  useEffect(() => {
    setSoundState(soundEnabled);
  }, [soundEnabled]);

  // Handle sound toggle
  const handleSoundToggle = () => {
    setSoundEnabled((prevState) => !prevState);
  };

  const [passcode, setPasscode] = useState("");
  const [oldPasscode, setOldPasscode] = useState("");

  const handleSavePasscode = () => {
    // If passcode already exists, require old passcode verification
    if (hasPasscode()) {
      const stored = getStoredPasscode();
      if (!verifyPasscode(oldPasscode, stored)) {
        toast.error("លេខសម្ងាត់ចាស់មិនត្រឹមត្រូវ!");
        return;
      }
    }

    if (passcode.length === 4 && /^\d+$/.test(passcode)) {
      savePasscode(passcode);
      toast.success("លេខសម្ងាត់ត្រូវបានរក្សាទុក!");
      setPasscode("");
      setOldPasscode("");
    } else {
      toast.error("លេខសម្ងាត់ថ្មីត្រូវតែមាន ៤ ខ្ទង់!");
    }
  };
  const { theme, toggleTheme } = useThemeSwitch();
  const [isShowModal, setIsShowModal] = useState(false);
  const { userInfor, logout } = useAuth();

  const role = userInfor?.role || "";
  const username = userInfor?.username || userInfor?.name || "";

  // State to track the current theme
  // For disble and enable side bar on mobile screen
  const { isHideSideBar } = useHideSideBar();
  //Get The Link Path To Know Is In /QRStudentEntry if true then hide the sidebar
  const GetLinkPath = useLocation().pathname;

  const sidebarItems = [
    {
      btnType: "Dashboard",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
          height={17}
          width={17}
          id="Dashboard-3--Streamline-Core"
        >
          <desc>{"Dashboard 3 Streamline Icon: https://streamlinehq.com"}</desc>
          <g id="dashboard-3--app-application-dashboard-home-layout-vertical">
            <path
              id="Union"
              fill="#8fbffa"
              fillRule="evenodd"
              d="M1.5 0.5c-0.552285 0 -1 0.447715 -1 1v6c0 0.55229 0.447715 1 1 1h4c0.55229 0 1 -0.44771 1 -1v-6c0 -0.552285 -0.44771 -1 -1 -1h-4Zm6 1c0 -0.552285 0.44772 -1 1 -1h4c0.5523 0 1 0.447715 1 1v2.01c0 0.55228 -0.4477 1 -1 1h-4c-0.55228 0 -1 -0.44772 -1 -1V1.5Zm0 5c0 -0.55228 0.44772 -1 1 -1h4c0.5523 0 1 0.44772 1 1v6c0 0.5523 -0.4477 1 -1 1h-4c-0.55228 0 -1 -0.4477 -1 -1v-6Zm-7 3.99c0 -0.55229 0.447715 -1.00001 1 -1.00001h4c0.55229 0 1 0.44772 1 1.00001v2.01c0 0.5523 -0.44771 1 -1 1h-4c-0.552285 0 -1 -0.4477 -1 -1v-2.01Z"
              clipRule="evenodd"
              strokeWidth={1}
            />
          </g>
        </svg>
      ),
      dropDownButton: false,
    },
    {
      btnType: "QR Student Entry",
      path: "/qr-student-entry",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
          height={17}
          width={17}
          id="User-Profile-Focus--Streamline-Core"
        >
          <desc>
            {"User Profile Focus Streamline Icon: https://streamlinehq.com"}
          </desc>
          <g id="user-profile-focus--close-geometric-human-person-profile-focus-user">
            <path
              id="Union"
              fill="#c3fa8f"
              fillRule="evenodd"
              d="M2.07322 2.07322C2.12011 2.02634 2.1837 2 2.25 2h2c0.41421 0 0.75 -0.33579 0.75 -0.75C5 0.835786 4.66421 0.5 4.25 0.5h-2c-0.46413 0 -0.90925 0.184375 -1.23744 0.51256C0.684375 1.34075 0.5 1.78587 0.5 2.25v2c0 0.41421 0.335786 0.75 0.75 0.75 0.41421 0 0.75 -0.33579 0.75 -0.75v-2c0 -0.0663 0.02634 -0.12989 0.07322 -0.17678ZM9.75 0.5C9.33579 0.5 9 0.835786 9 1.25c0 0.41421 0.33579 0.75 0.75 0.75h2c0.0663 0 0.1299 0.02634 0.1768 0.07322 0.0469 0.04689 0.0732 0.11048 0.0732 0.17678v2c0 0.41421 0.3358 0.75 0.75 0.75s0.75 -0.33579 0.75 -0.75v-2c0 -0.46413 -0.1844 -0.90925 -0.5126 -1.23744C12.6592 0.684375 12.2141 0.5 11.75 0.5h-2Zm3 8.5c0.4142 0 0.75 0.33579 0.75 0.75v2c0 0.4641 -0.1844 0.9092 -0.5126 1.2374 -0.3282 0.3282 -0.7733 0.5126 -1.2374 0.5126h-2c-0.41421 0 -0.75 -0.3358 -0.75 -0.75s0.33579 -0.75 0.75 -0.75h2c0.0663 0 0.1299 -0.0263 0.1768 -0.0732 0.0469 -0.0469 0.0732 -0.1105 0.0732 -0.1768v-2c0 -0.41421 0.3358 -0.75 0.75 -0.75ZM2 9.75C2 9.33579 1.66421 9 1.25 9c-0.414214 0 -0.75 0.33579 -0.75 0.75v2c0 0.4641 0.184375 0.9092 0.51256 1.2374 0.32819 0.3282 0.77331 0.5126 1.23744 0.5126h2c0.41421 0 0.75 -0.3358 0.75 -0.75S4.66421 12 4.25 12h-2c-0.0663 0 -0.12989 -0.0263 -0.17678 -0.0732C2.02634 11.8799 2 11.8163 2 11.75v-2Z"
              clipRule="evenodd"
              strokeWidth={1}
            />
            <path
              id="Union_2"
              fill="#29c528"
              fillRule="evenodd"
              d="M8.99976 4.5c0 1.10457 -0.89543 2 -2 2s-2 -0.89543 -2 -2 0.89543 -2 2 -2 2 0.89543 2 2Zm-6.35824 5.8754C3.14104 8.4346 4.90221 7 6.99972 7c2.0975 0 3.85868 1.4346 4.35818 3.3754 0.0386 0.1497 0.0057 0.3088 -0.089 0.4309 -0.0947 0.1222 -0.2406 0.1937 -0.3952 0.1937H3.12574c-0.15458 0 -0.30047 -0.0715 -0.39517 -0.1937 -0.09471 -0.1221 -0.12758 -0.2812 -0.08905 -0.4309Z"
              clipRule="evenodd"
              strokeWidth={1}
            />
          </g>
        </svg>
      ),
      dropDownButton: false,
    },
    {
      btnType: "Book Manage",
      path: "/book-management/add-book",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
          id="Book-2--Streamline-Core"
          height={17}
          width={17}
        >
          <desc>{"Book 2 Streamline Icon: https://streamlinehq.com"}</desc>
          <g id="book-2--library-content-books-book-shelf-stack">
            <path
              id="Vector 3900"
              fill="#00cfff"
              d="M3.2142857142857144 0.5357142857142857H1.0714285714285714C0.7755621428571429 0.5357142857142857 0.5357142857142857 0.7755621428571429 0.5357142857142857 1.0714285714285714v12.857142857142858c0 0.29582142857142857 0.23984785714285714 0.5357142857142857 0.5357142857142857 0.5357142857142857h2.142857142857143c0.2958642857142857 0 0.5357142857142857 -0.23989285714285713 0.5357142857142857 -0.5357142857142857V1.0714285714285714c0 -0.2958664285714286 -0.23985 -0.5357142857142857 -0.5357142857142857 -0.5357142857142857Z"
              strokeWidth={1}
            />
            <path
              id="Intersect"
              fill="#087093"
              fillRule="evenodd"
              d="M3.75 9.910714285714285h-3.2142857142857144v1.6071428571428572h3.2142857142857144v-1.6071428571428572Z"
              clipRule="evenodd"
              strokeWidth={1}
            />
            <path
              id="Vector 3902"
              fill="#087093"
              d="M7.5 2.142857142857143H5.357142857142857c-0.2958642857142857 0 -0.5357142857142857 0.23985 -0.5357142857142857 0.5357142857142857V13.928571428571429c0 0.29582142857142857 0.23985 0.5357142857142857 0.5357142857142857 0.5357142857142857h2.142857142857143c0.2958642857142857 0 0.5357142857142857 -0.23989285714285713 0.5357142857142857 -0.5357142857142857V2.6785714285714284c0 -0.2958642857142857 -0.23985 -0.5357142857142857 -0.5357142857142857 -0.5357142857142857Z"
              strokeWidth={1}
            />
            <path
              id="Vector 3903"
              fill="#00cfff"
              d="M11.534142857142857 2.368457142857143c-0.07660714285714285 -0.2857821428571429 -0.3702857142857143 -0.4553892857142857 -0.6561428571428571 -0.3788142857142857l-2.069785714285714 0.5546142857142857c-0.2857928571428571 0.076575 -0.4553892857142857 0.3703285714285714 -0.3788142857142857 0.6561214285714286L11.341071428571428 14.067c0.07660714285714285 0.2858571428571428 0.37039285714285713 0.45546428571428565 0.6561428571428571 0.3788571428571429l2.069892857142857 -0.5545714285714285c0.28575 -0.07660714285714285 0.45535714285714285 -0.37039285714285713 0.37875 -0.6561428571428571L11.534142857142857 2.368457142857143Z"
              strokeWidth={1}
            />
            <path
              id="Intersect_2"
              fill="#087093"
              fillRule="evenodd"
              d="m13.317214285714284 9.02277857142857 -3.104764285714286 0.8319214285714286 0.4159607142857143 1.5523714285714285 3.1047321428571424 -0.8319107142857143 -0.4159285714285714 -1.552382142857143Z"
              clipRule="evenodd"
              strokeWidth={1}
            />
          </g>
        </svg>
      ),
      dropDownButton: true,
      dropDownButtonData: [
        {
          iconName: <BookPlus className="w-[18px]" />,
          dropDownBtnType: "Add Book",
          urlPath: "/book-management/add-book",
        },
        {
          iconName: <NotebookPen className="w-[18px]" />,
          dropDownBtnType: "Book Borrowed",
          urlPath: "/book-management/book-borrowed",
        },
        {
          iconName: <ShieldCheck className="w-[18px]" />,
          dropDownBtnType: "Time Spent",
          urlPath: "/book-management/time-spent",
        },
        {
          iconName: <DatabaseBackup className="w-[18px]" />,
          dropDownBtnType: "Book Trash",
          urlPath: "/book-management/book-trash",
        },
        {
          iconName: <BookUser className="w-[18px]" />,
          dropDownBtnType: "Donation",
          urlPath: "/book-management/donation",
        },
      ],
    },
    {
      requiredRole: ["ADMIN", "SUPER_ADMIN"],
      btnType: "Staff Manage",
      path: "/staff-manage",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
          id="No-Poverty--Streamline-Core"
          height={17}
          width={17}
        >
          <desc>{"No Poverty Streamline Icon: https://streamlinehq.com"}</desc>
          <g id="no-poverty">
            <path
              id="Union"
              fill="#2dd59c"
              fillRule="evenodd"
              d="M6.428571428571429 2.6785714285714284c0 1.1834678571428572 -0.9593892857142856 2.142857142857143 -2.142857142857143 2.142857142857143s-2.142857142857143 -0.9593892857142856 -2.142857142857143 -2.142857142857143 0.9593892857142856 -2.142857142857143 2.142857142857143 -2.142857142857143 2.142857142857143 0.9593892857142856 2.142857142857143 2.142857142857143ZM4.285714285714286 5.357142857142857C2.214642857142857 5.357142857142857 0.5357142857142857 7.036071428571429 0.5357142857142857 9.107142857142858c0 0.2958642857142857 0.23984785714285714 0.5357142857142857 0.5357142857142857 0.5357142857142857h3.682692857142857l0.0006428571428571428 -0.00040714285714285717C4.293032142857142 9.051632142857143 4.017857142857142 8.307953571428571 4.017857142857142 7.5c0 -0.7960714285714285 0.2671392857142857 -1.529742857142857 0.7166571428571429 -2.116275C4.587364285714285 5.366174999999999 4.437589285714286 5.357142857142857 4.285714285714286 5.357142857142857Zm5.9797714285714285 0.026582142857142856C10.715035714285714 5.970257142857142 10.982142857142858 6.703928571428571 10.982142857142858 7.5c0 0.8079535714285715 -0.275175 1.551642857142857 -0.7369071428571428 2.1424499999999997L10.245867857142857 9.642857142857142H13.928571428571429c0.29582142857142857 0 0.5357142857142857 -0.23985 0.5357142857142857 -0.5357142857142857C14.464285714285714 7.036071428571429 12.785357142857142 5.357142857142857 10.714285714285714 5.357142857142857c-0.15187499999999998 0 -0.30165000000000003 0.009032142857142857 -0.4488 0.026582142857142856ZM10.714285714285714 4.821428571428571c1.1835 0 2.142857142857143 -0.9593892857142856 2.142857142857143 -2.142857142857143s-0.9593571428571428 -2.142857142857143 -2.142857142857143 -2.142857142857143c-1.1834678571428572 0 -2.142857142857143 0.9593892857142856 -2.142857142857143 2.142857142857143s0.9593892857142856 2.142857142857143 2.142857142857143 2.142857142857143ZM9.642857142857142 7.5c0 1.1834678571428572 -0.9593892857142856 2.142857142857143 -2.142857142857143 2.142857142857143s-2.142857142857143 -0.9593892857142856 -2.142857142857143 -2.142857142857143 0.9593892857142856 -2.142857142857143 2.142857142857143 -2.142857142857143 2.142857142857143 0.9593892857142856 2.142857142857143 2.142857142857143Zm-5.892857142857142 6.428571428571429c0 -2.0710714285714285 1.6789285714285713 -3.75 3.75 -3.75s3.75 1.6789285714285713 3.75 3.75c0 0.29582142857142857 -0.23989285714285713 0.5357142857142857 -0.5357142857142857 0.5357142857142857H4.285714285714286c-0.2958642857142857 0 -0.5357142857142857 -0.23989285714285713 -0.5357142857142857 -0.5357142857142857Z"
              clipRule="evenodd"
              strokeWidth={1}
            />
          </g>
        </svg>
      ),
      dropDownButton: false,
      dropDownButtonData: [],
    },
    {
      requiredRole: ["SUPER_ADMIN"],
      btnType: "User Manage",
      path: "/user-manage",
      icon: <UserCog className="w-[18px] text-blue-300" />,
      dropDownButton: false,
      dropDownButtonData: [],
    },
    {
      btnType: "College Manage",
      path: "/college-manage",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
          id="Graduation-Cap--Streamline-Core"
          height={17}
          width={17}
        >
          <desc>
            {"Graduation Cap Streamline Icon: https://streamlinehq.com"}
          </desc>
          <g id="graduation-cap--graduation-cap-education">
            <path
              id="Subtract"
              fill="#e0ed66"
              fillRule="evenodd"
              d="m3.19983 6.03098 3.60135 1.56037c0.12682 0.05495 0.27073 0.05495 0.39756 0l3.60006 -1.55982 0.0006 2.87508c0 0.0886 -0.0235 0.17561 -0.0682 0.25212l-0.4318 -0.25203c0.4318 0.25203 0.4316 0.25231 0.4315 0.2526l-0.0004 0.0006 -0.0007 0.00129 -0.0018 0.00298 -0.0046 0.00751 -0.0131 0.02098c-0.0106 0.01655 -0.025 0.03811 -0.0433 0.06396 -0.0366 0.05167 -0.089 0.12063 -0.1592 0.20094 -0.1403 0.16061 -0.3518 0.36716 -0.64833 0.57114 -0.5982 0.4116 -1.5217 0.7982 -2.85986 0.7982 -1.33817 0 -2.26048 -0.3867 -2.85753 -0.7985 -0.29592 -0.2042 -0.50677 -0.41092 -0.64658 -0.5717 -0.0699 -0.08039 -0.12217 -0.14943 -0.1586 -0.20118 -0.01822 -0.02588 -0.0325 -0.04748 -0.04307 -0.06406l-0.01311 -0.02103 -0.00453 -0.00754 -0.00176 -0.00299 -0.00076 -0.0013 -0.00035 -0.0006c-0.00017 -0.00028 -0.00033 -0.00057 0.43226 -0.2513l-0.43259 0.25073c-0.04399 -0.07589 -0.06724 -0.16201 -0.06741 -0.24973l-0.00575 -2.87672Z"
              clipRule="evenodd"
              strokeWidth={1}
            />
            <path
              id="Subtract_2"
              fill="#0ae339"
              fillRule="evenodd"
              d="m3.19995 6.03101 3.60129 1.56035c0.12683 0.05495 0.27074 0.05495 0.39756 0l3.6001 -1.55983 0.0003 1.36216 -3.10344 1.34464c-0.44389 0.19232 -0.94758 0.19232 -1.39147 0L3.20291 7.39458l-0.00296 -1.36357Z"
              clipRule="evenodd"
              strokeWidth={1}
            />
            <path
              id="Union"
              fill="#e0ed66"
              fillRule="evenodd"
              d="M7.19878 1.04121c-0.12682 -0.054947 -0.27074 -0.054947 -0.39756 0L0.301219 3.8575C0.118352 3.93673 0 4.11699 0 4.31628c0 0.1993 0.118352 0.37956 0.301219 0.45879L6.80122 7.59136c0.12682 0.05495 0.27074 0.05495 0.39756 0l6.50002 -2.81629c0.1828 -0.07923 0.3012 -0.25949 0.3012 -0.45879 0 -0.19929 -0.1184 -0.37955 -0.3012 -0.45878L7.19878 1.04121Z"
              clipRule="evenodd"
              strokeWidth={1}
            />
            <path
              id="Subtract_3"
              fill="#0ae339"
              fillRule="evenodd"
              d="m2.32031 5.64989 -1.25 -0.54159v4.89151c0.18917 -0.09081 0.40115 -0.14169 0.62502 -0.14169 0.22385 0 0.43582 0.05087 0.62498 0.14168l0 -4.34991Z"
              clipRule="evenodd"
              strokeWidth={1}
            />
            <path
              id="Union_2"
              fill="#e0ed66"
              fillRule="evenodd"
              d="M1.69533 9.85812c-0.798572 0 -1.44594 0.64738 -1.44594 1.44598 0 0.7985 0.647368 1.4459 1.44594 1.4459 0.79857 0 1.44594 -0.6474 1.44594 -1.4459 0 -0.7986 -0.64737 -1.44598 -1.44594 -1.44598Z"
              clipRule="evenodd"
              strokeWidth={1}
            />
          </g>
        </svg>
      ),
      dropDownButton: false,
      dropDownButtonData: [],
    },
    {
      requiredRole: ["ADMIN", "SUPER_ADMIN"],
      btnType: "Analytic",
      path: "/Analytic",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
          id="Graph-Bar-Increase--Streamline-Core"
          height={17}
          width={17}
        >
          <desc>
            {"Graph Bar Increase Streamline Icon: https://streamlinehq.com"}
          </desc>
          <g id="graph-bar-increase--up-product-performance-increase-arrow-graph-business-chart">
            <path
              id="Union"
              fill="#00bcff"
              fillRule="evenodd"
              d="M14 6.5c0 -0.27614 -0.2239 -0.5 -0.5 -0.5h-2.8333c-0.2761 0 -0.5 0.22386 -0.5 0.5v7c0 0.2761 0.2239 0.5 0.5 0.5H13.5c0.2761 0 0.5 -0.2239 0.5 -0.5v-7ZM8.91675 8.25c0 -0.27614 -0.22386 -0.5 -0.5 -0.5H5.5835c-0.27615 0 -0.5 0.22386 -0.5 0.5v5.25c0 0.2761 0.22385 0.5 0.5 0.5h2.83325c0.27614 0 0.5 -0.2239 0.5 -0.5V8.25Zm-5.58338 1c0.27615 0 0.5 0.22386 0.5 0.5v3.75c0 0.2761 -0.22385 0.5 -0.5 0.5H0.500122c-0.276142 0 -0.49999993 -0.2239 -0.49999993 -0.5V9.75c0 -0.27614 0.22385793 -0.5 0.49999993 -0.5H3.33337Z"
              clipRule="evenodd"
              strokeWidth={1}
            />
            <path
              id="Union_2"
              fill="#00f6ff"
              fillRule="evenodd"
              d="M12.2208 4.84635c0.2022 0.012 0.3917 -0.09923 0.4798 -0.28167l1.2496 -2.58718c0.1196 -0.24768 0.0167 -0.54546 -0.2303 -0.66647L11.1463 0.050261c-0.1817 -0.0890302 -0.3992 -0.05973337 -0.5509 0.074213 -0.1517 0.133946 -0.2077 0.346125 -0.1418 0.537484l0.4113 1.195552L0.517923 5.47332c-0.391026 0.13664 -0.5972415 0.5644 -0.4605961 0.95543 0.1366451 0.39102 0.5644071 0.59724 0.9554331 0.46059L11.353 3.27591l0.4246 1.234c0.0659 0.19157 0.2409 0.32444 0.4432 0.33644Z"
              clipRule="evenodd"
              strokeWidth={1}
            />
          </g>
        </svg>
      ),
      dropDownButton: false,
      dropDownButtonData: [],
    },
  ];

  // Function to filter menu items based on role
  const getFilteredMenuItems = (role) => {
    return sidebarItems.filter((item) => {
      // If the item has required roles defined, check if user has one of them
      if (item.requiredRole) {
        return item.requiredRole.includes(role);
      }

      // Default logic for roles if no specifically requiredRole is set on the item
      if (role === "ADMIN" || role === "SUPER_ADMIN") return true;

      if (role === "USER") {
        const allowedItems = ["Dashboard", "QR Student Entry", "Book Manage"];
        return allowedItems.includes(item.btnType);
      }

      return false;
    });
  };

  const handleLogout = () => {
    logout();
    console.log("Logout");
  };

  const BtnMenu = getFilteredMenuItems(role);

  return (
    <>
      {/* if GetLinkPath = true it mean user in QRStudetnEntry Form So We need to hide the side bar and show only from for scan  */}
      <section
        className={`
                z-50 sidebar 
                ${isHideSideBar ? "translate-x-0" : "translate-x-[-250px]"}
                ${GetLinkPath === "/qr-student-entry" ? "absolute translate-x-[-250px]" : "absolute sm:relative translate-x-0 sm:translate-x-0"}
                 transition-transform ease-in-out 
                delay-150 sm:left-0 sm:right-0  
                w-[223px] sm:w-fit lg:w-[223px] h-[100vh] shadow-xl 
                bg-secondary text-accent
            `}
      >
        {/* Sidebar header  */}
        {/* User Frofile  */}
        <header className="header-sidebar shadow-md bg-primary w-full h-[100px] p-[10px] lg:ps-[14px] bg-light-bg-sec flex items-center rounded-br-[50px] sm:rounded-br-[20px] lg:rounded-br-[50px] transition-transform ease-in-out duration-300">
          <div className="user-prfile w-[52px] h-[52px]">
            <img src={imageProfile} alt="logo sru" />
          </div>
          <div className="user-name font-sans text-light-text ps-2 blok sm:hidden lg:block">
            <p className="font-bold uppercase">{username}</p>
            <p className="text-[10px]">ROLE : {role}</p>
          </div>
        </header>
        {/* User Frofile  */}
        {/* Sidebar header  */}
        {/* Sidebar menu  */}
        <motion.section
          variants={menuContainer}
          initial={isFirstLoad ? "hidden" : "show"}
          animate="show"
          className="Sidebar-Menu-Container w-full h-fit px-[10px] mt-[40px]"
        >
          {/* Show Summary data  */}
          <div className="Side-menu w-full h-fit">
            {BtnMenu.map((e, index) => (
              <motion.div key={index} variants={menuItem}>
                <SidebarMenuButton
                  key={index}
                  btnMenuType={e.btnType}
                  path={e.path}
                  icon={e.icon}
                  requiredRole={e.requiredRole}
                  dropDownButton={e.dropDownButton}
                  dropDownButtonData={e.dropDownButtonData || []} // Ensure it's an empty array if undefined
                />
              </motion.div>
            ))}
            <motion.div variants={menuItem}>
              <div className="m-auto line w-[80%] h-[1px] bg-gray-400 my-5"></div>
            </motion.div>
            <motion.div variants={menuItem}>
              <button
                className="sidebar-button hover:bg-base-100 ps-5 sm:ps-0 lg:ps-3 space-x-3 cursor-pointer 
                                        w-full h-[45px] flex sm:justify-center lg:justify-start items-center 
                                        rounded-[10px] ease-in-out duration-300 active:bg-base-100 relative"
              >
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                    id="Help-Chat-2--Streamline-Core"
                    height={17}
                    width={17}
                  >
                    <desc>
                      {"Help Chat 2 Streamline Icon: https://streamlinehq.com"}
                    </desc>
                    <g id="help-chat-2--bubble-help-mark-message-query-question-speech-circle">
                      <path
                        id="Union"
                        fill="#d3fa8f"
                        fillRule="evenodd"
                        d="M7 0C3.13401 0 0 3.13401 0 7c0 1.36787 0.392824 2.6453 1.07184 3.7241L0.0357617 13.3143c-0.0681472 0.1704 -0.0375012 0.3644 0.0798413 0.5054 0.117342 0.1411 0.302526 0.2066 0.482455 0.1706l3.377822 -0.6756C4.89179 13.7541 5.91783 14 7 14c3.866 0 7 -3.134 7 -7 0 -3.86599 -3.134 -7 -7 -7Z"
                        clipRule="evenodd"
                        strokeWidth={1}
                      />
                      <path
                        id="Union_2"
                        fill="#69c528"
                        fillRule="evenodd"
                        d="M6 5.125c0 -0.55228 0.44772 -1 1 -1s1 0.44772 1 1 -0.44772 1 -1 1c-0.41421 0 -0.75 0.33579 -0.75 0.75v0.75c0 0.41421 0.33579 0.75 0.75 0.75s0.75 -0.33579 0.75 -0.75v-0.11445C8.76428 7.19198 9.5 6.24441 9.5 5.125c0 -1.38071 -1.11929 -2.5 -2.5 -2.5s-2.5 1.11929 -2.5 2.5c0 0.41421 0.33579 0.75 0.75 0.75s0.75 -0.33579 0.75 -0.75Zm2 5.25c0 -0.55228 -0.44772 -1 -1 -1s-1 0.44772 -1 1c0 0.5523 0.44772 1 1 1s1 -0.4477 1 -1Z"
                        clipRule="evenodd"
                        strokeWidth={1}
                      />
                    </g>
                  </svg>
                </div>
                <p className="block sm:hidden lg:block text-[13px]">Help</p>
              </button>
            </motion.div>
            <motion.div variants={menuItem}>
              <button
                onClick={() => setIsShowModal(true)}
                className="sidebar-button hover:bg-base-100 ps-5 sm:ps-0 lg:ps-3 space-x-3 cursor-pointer 
                                        w-full h-[45px] flex sm:justify-center lg:justify-start items-center 
                                        rounded-[10px] ease-in-out duration-300 active:bg-base-100 relative"
              >
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                    id="Cog-1--Streamline-Core"
                    height={17}
                    width={17}
                  >
                    <desc>
                      {"Cog 1 Streamline Icon: https://streamlinehq.com"}
                    </desc>
                    <g id="cog-1--work-loading-cog-gear-settings-machine">
                      <path
                        id="Subtract"
                        fill="#95ed22"
                        fillRule="evenodd"
                        d="M5.55692 0.689231 5.09384 1.88462l-1.59385 0.90461 -1.27077 -0.19385c-0.21159 -0.02872 -0.42695 0.00612 -0.61871 0.10008 -0.19175 0.09396 -0.35125 0.2428 -0.45821 0.42762l-0.430769 0.75384c-0.110383 0.18776 -0.16124 0.40458 -0.145859 0.62184 0.015381 0.21726 0.096278 0.42475 0.232013 0.59509l0.807695 1.00153v1.80924L0.829223 8.90615c-0.135735 0.17034 -0.216631 0.37783 -0.232012 0.59509 -0.015382 0.21726 0.035475 0.43408 0.145858 0.62186l0.430771 0.7538c0.10696 0.1848 0.26646 0.3337 0.45821 0.4276 0.19175 0.094 0.40711 0.1288 0.61871 0.1001l1.27077 -0.1938 1.57231 0.9046 0.46308 1.1954c0.07809 0.2024 0.21549 0.3765 0.3942 0.4994 0.17871 0.123 0.3904 0.1892 0.60733 0.1898h0.90462c0.21694 -0.0006 0.42862 -0.0668 0.60733 -0.1898 0.17871 -0.1229 0.31611 -0.297 0.39421 -0.4994l0.46307 -1.1954L10.5 11.2108l1.2708 0.1938c0.2116 0.0287 0.4269 -0.0061 0.6187 -0.1001 0.1917 -0.0939 0.3512 -0.2428 0.4582 -0.4276l0.4308 -0.7538c0.1103 -0.18778 0.1612 -0.4046 0.1458 -0.62186 -0.0154 -0.21726 -0.0963 -0.42475 -0.232 -0.59509l-0.8077 -1.00153V6.09538l0.7862 -1.00153c0.1357 -0.17034 0.2166 -0.37783 0.232 -0.59509 0.0154 -0.21726 -0.0355 -0.43408 -0.1459 -0.62184l-0.4308 -0.75384c-0.1069 -0.18482 -0.2664 -0.33366 -0.4582 -0.42762 -0.1917 -0.09396 -0.4071 -0.1288 -0.6187 -0.10008l-1.2707 0.19385 -1.57235 -0.90461L8.44307 0.689231c-0.0781 -0.202393 -0.2155 -0.376481 -0.39421 -0.499464C7.87015 0.0667842 7.65847 0.00064083 7.44153 0h-0.88308c-0.21693 0.00064083 -0.42862 0.0667842 -0.60733 0.189767 -0.17871 0.122983 -0.31611 0.297071 -0.3942 0.499464ZM7 9.25c1.24264 0 2.25 -1.00736 2.25 -2.25S8.24264 4.75 7 4.75 4.75 5.75736 4.75 7 5.75736 9.25 7 9.25Z"
                        clipRule="evenodd"
                        strokeWidth={1}
                      />
                    </g>
                  </svg>
                </div>
                <p className="block sm:hidden lg:block text-[13px]">Setting</p>
              </button>
            </motion.div>
          </div>
          {/* Show Summary data  */}
        </motion.section>
        {/* Sidebar menu  */}
      </section>

      <Modal isVisible={isShowModal} key={"getReport"}>
        <div className="header-modal flex items-center justify-between font-noto text-accent">
          <div className="flex items-center gap-2">
            <Settings />
            <p>Setting</p>
          </div>
          <button
            onClick={() => setIsShowModal(false)}
            className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
          >
            <X />
          </button>
        </div>
        <div className="modal-body font-noto mt-5 text-accent w-full flex flex-col gap-5">
          <div className="card-user-infor w-full h-fit gap-4 bg-secondary p-5 rounded-5 rounded-[20px] flex md:flex-row flex-col items-center justify-between">
            <div className="user-profile h-full text-accent flex place-items-center w-full gap-2">
              <img src={SRULogo} alt="sru-logo" className="w-[60px] h-[60px]" />
              <div className="user h-fit flex flex-col justify-between">
                <div className="user-name font-bold">
                  <p>{username}</p>
                </div>
                <div className="user-role text-[13px]">
                  <p>{role}</p>
                </div>
              </div>
            </div>
            <button
              className="btn bg-red-500 border-none text-white hover:bg-red-600"
              onClick={handleLogout}
            >
              <LogIn />
              Logout
            </button>
          </div>
          <div className="theme-switch w-full flex flex-row bg-secondary p-5 rounded-[20px] text-accent">
            <div className="text w-full">
              <p>មុខផ្ទៃងងឹត</p>
            </div>
            <div className="themeSwitch w-fit flex justify-center">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input id="themeSwitch" type="checkbox" onClick={toggleTheme} />
                {/* sun icon */}
                <svg
                  className="swap-on fill-current w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
                {/* moon icon */}
                <svg
                  className="swap-off fill-current w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
          </div>
          <div className="tunr-on-camera-sound w-full flex flex-row bg-secondary p-5 rounded-[20px] text-accent">
            <div className="text w-full">
              <p>បិត/បើកសម្លេង Camera ពេលស្កេនកាត</p>
            </div>
            <label className="swap">
              {/* hidden checkbox to control the state */}
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={handleSoundToggle}
              />

              {/* volume on icon */}
              <svg
                className={`swap-on fill-current w-7 h-7 ${soundEnabled ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
              </svg>

              {/* volume off icon */}
              <svg
                className={`swap-off fill-current w-7 h-7 ${soundEnabled ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
              </svg>
            </label>
          </div>

          <div className="passcode-setting w-full flex flex-col bg-secondary p-5 rounded-[20px] text-accent gap-3">
            <p>
              លេខសម្ងាត់​​កាពារផ្ទាំងស្កេន​ចេញចូល{" "}
              {hasPasscode() && "(មានកូដរួចរាល់)"}
            </p>

            {hasPasscode() && (
              <div className="flex flex-col gap-1">
                <label className="text-[13px] opacity-70">លេខសម្ងាត់ចាស់</label>
                <input
                  type="password"
                  maxLength={4}
                  value={oldPasscode}
                  onChange={(e) => setOldPasscode(e.target.value)}
                  placeholder="xxxx"
                  className="input input-bordered bg-primary w-full text-center text-xl tracking-widest"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-[13px] opacity-70">
                {hasPasscode() ? "លេខសម្ងាត់ថ្មី" : "បញ្ចូលលេខសម្ងាត់"}
              </label>
              <div className="flex md:flex-row flex-col gap-2">
                <input
                  type="password"
                  maxLength={4}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="xxxx"
                  className="input input-bordered bg-primary flex-1 py-3 text-center text-xl tracking-widest"
                />
                <button
                  className="btn btn-info px-5"
                  onClick={handleSavePasscode}
                >
                  រក្សាទុក
                </button>
              </div>
            </div>

            <div className="text-[13px] opacity-70 space-y-1">
              <p>កំណត់លេខសម្ងាត់ដើម្បីការពារការចាកចេញពីផ្ទាំងស្កេន</p>
              <p className="text-blue-400 italic">
                * បើភ្លេចលេខសម្ងាត់ សូមចាកចេញ (Logout) រួចចូលម្តងទៀតដើម្បី Reset
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Sidebar;
