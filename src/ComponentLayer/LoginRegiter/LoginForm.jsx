import React, { useState } from 'react';
import BGImag from '../../assets/image/sru_lib_Vector1.jpg';
import SRUlogo from '../../assets/logo/sru_logo.png';
import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function LoginForm({ handleLogin }) {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerIdCard, setRegisterIdCard] = useState('');
    const [registerFirstName, setRegisterFirstName] = useState('');
    const [registerLastName, setRegisterLastName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [hidePW, setHidePW] = useState(true);
    const [isLogin, setIsLogin] = useState(true);

    const handleHidePW = () => {
        setHidePW(!hidePW);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Login CHeck")
        if (loginEmail === "admin@gmail.com" && loginPassword === "123") {
            handleLogin(); // Call handleLogin if credentials are correct
        } else {
            // Optionally, handle invalid credentials here
            console.log("Invalid credentials");
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        // Handle register submit logic here
        console.log("Regiter click")
    };

    return (
        <div className='grid place-items-center h-screen sm:h-screen relative'
            style={{
                backgroundImage: `linear-gradient(to bottom, #00B2FFbb ,#FFFFFF), url(${BGImag})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <div className="container-circle absolute w-[112px] h-[112px]">
                <div className="circle w-36 h-36 bg-[#1e61f1] rounded-full absolute left-[120%] md:left-[180%] bottom-[50%]"></div>
                <div className="circle w-28 h-28 bg-[#1e61f1] rounded-full absolute right-[130%] md:right-[200%]"></div>
            </div>
            <AnimatePresence>
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="login-register-form text-center w-[300px] md:w-[447px] border border-[#cef1ff] h-fit backdrop-blur-[10px] drop-shadow-lg bg-[#ffffff2d] backdrop-filter rounded-[20px] p-5"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <div className="header-container flex justify-center relative w-full h-full">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="icon-sru absolute w-[90px] h-[90px] md:w-[112px] md:h-[112px] bottom-[68%]">
                                <img src={SRUlogo} alt="" />
                            </motion.div>
                            <motion.div
                                className="header-sru-text font-noto text-black pt-[47px]"
                                initial={{ opacity: 0, y: 90 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.5 }}
                            >
                                <p>ប្រព័ន្ធគ្របគ្រងបណ្ណាល័យ</p>
                                <p className='text-[24px]'>សកលវិទ្យាល័យស្វាយរៀង</p>
                            </motion.div>
                        </div>
                        {isLogin ? (
                            <motion.form
                                className="loginForm font-noto grid gap-2"
                                initial={{ opacity: 0, y: -90 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5, duration: 0.5 }}
                                onSubmit={handleLoginSubmit}
                            >
                                <motion.p
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.9, duration: 0.5 }}
                                    className='pt-10 pb-5'>សូមស្វាគមន៍ត្រលប់មកវិញ</motion.p>
                                <div className="login text-start grid gap-2">
                                    <label htmlFor="loginEmail">Email</label>
                                    <input
                                        type="email"
                                        id='loginEmail'
                                        placeholder="Email"
                                        className="input input-bordered bg-white border-none w-full"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="loginPassword">Password</label>
                                    <div className="relative w-full h-[46px] flex items-center">
                                        <input
                                            type={hidePW ? "password" : "text"}
                                            id='loginPassword'
                                            placeholder="Password"
                                            className="input input-bordered bg-white border-none w-full h-full pr-12"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            required
                                        />
                                        <label className="swap absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                                            <input id='hidePW' type="checkbox" onChange={handleHidePW} className="hidden" />
                                            <Eye className="swap-on h-5 w-5 text-gray-500" />
                                            <EyeOff className="swap-off h-5 w-5 text-gray-500" />
                                        </label>
                                    </div>
                                    <div className="create-acc-rememberMe flex justify-between">
                                        <div className="remberme flex gap-2">
                                            <input id='rememberMe' type="checkbox" className="checkbox" />
                                            <label htmlFor="rememberMe">Remember me</label>
                                        </div>
                                        <button type="button" onClick={() => setIsLogin(false)} className='text-blue-500'>Don't have an account?</button>
                                    </div>
                                </div>
                                <div className="w-full mt-10">
                                    <button
                                        type="submit"
                                        className='w-full h-[46px] active:scale-95 rounded-[50px] border-none bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] transition-all ease-in-out duration-100'
                                    >
                                        Login
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.form
                                className="registerAccount font-noto grid gap-2"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                exit={{ y: 20 }}
                                transition={{ duration: 0.3 }}
                                onSubmit={handleRegisterSubmit}
                            >
                                <p className='pt-10 pb-5'>សូមបំពេញព័តមានខាងក្រោម</p>
                                <div className="login text-start grid gap-2">
                                    <label htmlFor="registerIdCard">ID Card</label>
                                    <input
                                        type="text"
                                        id='registerIdCard'
                                        placeholder="ID Card"
                                        className="input input-bordered bg-white border-none w-full"
                                        value={registerIdCard}
                                        onChange={(e) => setRegisterIdCard(e.target.value)}
                                        required
                                    />

                                    <div className="firstLastName grid grid-cols-2 gap-5">
                                        <div className="">
                                            <label htmlFor="registerFirstName">First Name</label>
                                            <input
                                                type="text"
                                                id='registerFirstName'
                                                placeholder="First Name"
                                                className="input input-bordered bg-white border-none w-full"
                                                value={registerFirstName}
                                                onChange={(e) => setRegisterFirstName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="registerLastName">Last Name</label>
                                            <input
                                                type="text"
                                                id='registerLastName'
                                                placeholder="Last Name"
                                                className="input input-bordered bg-white border-none w-full"
                                                value={registerLastName}
                                                onChange={(e) => setRegisterLastName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <label htmlFor="registerEmail">Email</label>
                                    <input
                                        type="email"
                                        id='registerEmail'
                                        placeholder="Email"
                                        className="input input-bordered bg-white border-none w-full"
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                        required
                                    />

                                    <label htmlFor="registerPassword">Password</label>
                                    <div className="relative w-full h-[46px] flex items-center">
                                        <input
                                            type={hidePW ? "password" : "text"}
                                            id='registerPassword'
                                            placeholder="Password"
                                            className="input input-bordered bg-white border-none w-full h-full pr-12"
                                            value={registerPassword}
                                            onChange={(e) => setRegisterPassword(e.target.value)}
                                            required
                                        />
                                        <label className="swap absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                                            <input id='hidePW' type="checkbox" onChange={handleHidePW} className="hidden" />
                                            <Eye className="swap-on h-5 w-5 text-gray-500" />
                                            <EyeOff className="swap-off h-5 w-5 text-gray-500" />
                                        </label>
                                    </div>
                                    <button type="button" onClick={() => setIsLogin(true)} className='text-blue-500 text-end'>Already have an account</button>
                                </div>
                                <div className="w-full">
                                    <button
                                        type="submit"
                                        className='w-full h-[46px] active:scale-95 mt-10 rounded-[50px] border-none bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] transition-all ease-in-out duration-100'
                                    >
                                        {isLogin ? "Login" : "Create account"}
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default LoginForm;
