import React, { useState } from "react";
import SRULogo from "../../assets/logo/sru_logo.png";
import { useAuth } from "../../context/AuthProvider";
import { useThemeSwitch } from "../../context/ThemeSwitchContext";
import {
  savePasscode,
  hasPasscode,
  verifyPasscode,
  getStoredPasscode,
} from "../../utils/passcodeUtils";
import toast from "react-hot-toast";

function SettingForm() {
  const { username, role, logout } = useAuth();
  const { theme, toggleTheme } = useThemeSwitch();
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

  return (
    <main className="w-full h-full space-y-5 font-noto">
      <div className="card-user-infor w-full h-[120px] bg-secondary p-5 rounded-[20px] flex items-center justify-between">
        <div className="user-profile h-full text-accent flex gap-5">
          <img src={SRULogo} alt="sru-logo" className="w-full h-full" />
          <div className="user h-full flex flex-col justify-between">
            <div className="user-name text-2xl font-bold">
              <p>{username}</p>
            </div>
            <div className="user-role">
              <p>{role}</p>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="theme-switch flex flex-col bg-secondary p-5 rounded-[20px] text-accent space-y-3">
          <p className="font-bold">Change Theme</p>
          <div className="themeSwitch w-full flex justify-center flex-1 items-center">
            <label className="swap swap-rotate scale-150">
              <input
                id="themeSwitch"
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <svg
                className="swap-on fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
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

        <div className="passcode-setting flex flex-col bg-secondary p-5 rounded-[20px] text-accent space-y-3">
          <p className="font-bold">Admin Passcode Setting</p>
          <div className="flex flex-col space-y-4">
            {hasPasscode() && (
              <div className="flex flex-col gap-1">
                <label className="text-sm opacity-70">លេខសម្ងាត់ចាស់</label>
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
              <label className="text-sm opacity-70">
                {hasPasscode() ? "លេខសម្ងាត់ថ្មី" : "បញ្ចូលលេខសម្ងាត់ថ្មី"}
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  maxLength={4}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="xxxx"
                  className="input input-bordered bg-primary flex-1 text-center text-xl tracking-widest"
                />
                <button
                  className="btn btn-info px-8"
                  onClick={handleSavePasscode}
                >
                  Save
                </button>
              </div>
            </div>

            <div className="text-[12px] opacity-70 space-y-1">
              <p>កំណត់លេខសម្ងាត់ដើម្បីការពារការចាកចេញពីផ្ទាំងស្កេន</p>
              <p className="text-blue-400 italic">
                * បើភ្លេចលេខសម្ងាត់ សូមចាកចេញ (Logout) រួចចូលម្តងទៀតដើម្បី Reset
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SettingForm;
