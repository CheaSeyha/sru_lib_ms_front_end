import React, { useState, useEffect } from "react";
import BGImag from "../../assets/image/sru_lib_Vector1.jpg";
import SRUlogo from "../../assets/logo/sru_logo.png";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom"; // Import useNavigate
function LoginForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPConfirmed, setIsOTPConfirmed] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [hidePW, setHidePW] = useState(true);
  const [otpCountdown, setOtpCountdown] = useState(0); // State for countdown timer
  const [isLoading, setIsLoading] = useState(false); // Add this line
  const [isRegistering, setIsRegistering] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Remember Me state
  const { login, register, requestOtp, verifyOtp, changePassword } = useAuth();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Please entry email");
      return;
    }
    setIsLoading(true); // Show loading spinner
    try {
      await requestOtp(email);
      setIsOTPSent(true);
      setOtpCountdown(60); // Start countdown of 60 seconds
      toast.success("OTP sent to your email");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data || error.message);
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setIsLoading(false); // Hide loading spinner after request
    }
  };

  const handleConfirmOTP = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp(email, otp); // Verify OTP using the method from context
      setIsForgotPassword(false);
      setIsOTPConfirmed(true);
      toast.success("OTP Confirm Success");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data || error.message);
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        await changePassword(email, newPassword);
        toast.success("Password reset successful.");
        try {
          await login(email, newPassword, true); // Pass "Remember Me" state
          toast.success("Login Success");
          navigate("/"); // Redirect after login
        } catch (error) {
          console.error("Login failed:", error);
          if (error.response) {
            toast.error(error.response.data.message || error.message);
          } else {
            toast.error("Network error. Please try again later.");
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          toast.error(error.response.data || error.message);
        } else {
          toast.error("Network error. Please try again later.");
        }
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  // Handle login form submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Assuming 'login' is a function that performs the login request
      await login(loginEmail, loginPassword, rememberMe);
      toast.success("Login Success");
      navigate("/"); // Redirect after login
    } catch (error) {
      //   console.error("Login failed:", error);
      // Check for specific error status (e.g., 401 Unauthorized)
      if (error.response) {
        toast.error(error.response.data.message || error.message);
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true); // Show loading spinner

    try {
      await register(registerEmail, registerUserName, registerPassword);
      toast.success("Register Success");
      //if register success set auto login for user
      try {
        await login(registerEmail, registerPassword, true); // Pass "Remember Me" state
        toast.success("Login Success");
        navigate("/"); // Redirect after login
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || error.message);
        } else {
          toast.error("Network error. Please try again later.");
        }
      }
    } catch (error) {
      //   console.error("Registration failed:", error);
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setIsRegistering(false); // Hide loading spinner
    }
  };

  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setIsOTPSent(false); // Re-enable the button when countdown is complete
    }
    return () => clearInterval(timer); // Clear the interval on component unmount
  }, [otpCountdown]);

  const handleHidePW = () => {
    setHidePW(!hidePW);
  };

  const handleBackToLoign = () => {
    setIsLogin(true);
    setIsForgotPassword(false);
    setIsOTPConfirmed(false);
  };

  return (
    <div
      className="grid place-items-center h-screen w-full relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, #00B2FFbb ,#FFFFFF), url(${BGImag})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
      }}
    >
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="login-register-form text-center w-[300px] md:w-[447px] border border-[#cef1ff] h-fit backdrop-blur-[10px] drop-shadow-lg bg-[#ffffff2d] backdrop-filter rounded-[20px] p-5"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="header-container flex justify-center relative w-full h-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="icon-sru absolute w-[90px] h-[90px] md:w-[112px] md:h-[112px] bottom-[68%]"
              >
                <img src={SRUlogo} alt="" />
              </motion.div>
              <motion.div
                className="header-sru-text font-noto text-black pt-[47px]"
                initial={{ opacity: 0, y: 90 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <p>ប្រព័ន្ធគ្របគ្រងបណ្ណាល័យ</p>
                <p className="text-[24px]">សកលវិទ្យាល័យស្វាយរៀង</p>
              </motion.div>
            </div>
            <motion.form
              className="loginForm font-noto grid gap-2"
              initial={{ opacity: 0, y: -90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              onSubmit={(e) => {
                e.preventDefault();

                if (isLogin && !isForgotPassword && !isOTPConfirmed) {
                  handleLoginSubmit(e); // Trigger login
                } else if (!isLogin) {
                  handleRegisterSubmit(e); // Trigger registration
                } else if (isForgotPassword) {
                  handleConfirmOTP(e); // Trigger OTP sending
                } else if (!isForgotPassword && isOTPConfirmed) {
                  handleResetPassword(e); // Trigger password reset
                }
              }}
            >
              {/* Login Form */}
              {isLogin && !isForgotPassword && !isOTPConfirmed && (
                <div className="form-container">
                  <p className="pt-10 pb-5">សូមស្វាគមន៍ត្រលប់មកវិញ</p>
                  <div className="login text-start grid gap-2">
                    <label htmlFor="loginEmail">Email</label>
                    <input
                      type="email"
                      id="loginEmail"
                      placeholder="Email"
                      className="input input-bordered bg-white border-none w-full"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                    <label htmlFor=" ">Password</label>
                    <div className="relative w-full h-[46px] flex items-center">
                      <input
                        type={hidePW ? "password" : "text"}
                        id="loginPassword"
                        placeholder="Password"
                        className="input input-bordered bg-white border-none w-full h-full pr-12"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <label className="swap absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        <input
                          id="hidePW"
                          type="checkbox"
                          onChange={handleHidePW}
                          className="hidden"
                        />
                        <Eye className="swap-on h-5 w-5 text-gray-500" />
                        <EyeOff className="swap-off h-5 w-5 text-gray-500" />
                      </label>
                    </div>
                    <div className="create-acc-rememberMe flex justify-between">
                      <div className="remberme flex gap-2">
                        <input
                          id="rememberMe"
                          type="checkbox"
                          className="checkbox"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)} // Toggle checkbox
                        />
                        <label htmlFor="rememberMe">Remember me</label>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-blue-500"
                      >
                        Forget Password?
                      </button>
                    </div>
                  </div>
                  <div className="w-full mt-10">
                    <button
                      type="submit"
                      disabled=
                      className="w-full h-[46px] active:scale-95 rounded-[50px] border-none bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] transition-all ease-in-out duration-100"
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner loading-md"></span> // Loading spinner
                      ) : (
                        "Login" // Default button text
                      )}
                    </button>
                  </div>
                  <div className="w-full mt-5">
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-accent"
                    >
                      Don't have an account? <b>Register</b>
                    </button>
                  </div>
                </div>
              )}

              {/* Register Form */}
              {!isLogin && (
                <div className="">
                  <p className="pt-10 pb-5">សូមបំពេញព័តមានខាងក្រោម</p>
                  <div className="login text-start grid gap-2">
                    <label htmlFor="registerUserName">User Name</label>
                    <input
                      type="text"
                      id="registerUserName"
                      placeholder="User name"
                      className="input input-bordered bg-white border-none w-full"
                      value={registerUserName}
                      onChange={(e) => setRegisterUserName(e.target.value)}
                      required
                    />
                    <label htmlFor="registerEmail">Email</label>
                    <input
                      type="email"
                      id="registerEmail"
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
                        id="registerPassword"
                        placeholder="Password"
                        className="input input-bordered bg-white border-none w-full h-full pr-12"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                      />
                      <label className="swap absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        <input
                          id="hidePW"
                          type="checkbox"
                          onChange={handleHidePW}
                          className="hidden"
                        />
                        <Eye className="swap-on h-5 w-5 text-gray-500" />
                        <EyeOff className="swap-off h-5 w-5 text-gray-500" />
                      </label>
                    </div>
                    <div className=" w-full flex justify-end">
                      <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className="text-blue-500 "
                      >
                        Already have an account
                      </button>
                    </div>
                  </div>
                  <div className="w-full">
                    <button
                      type="submit"
                      className="w-full h-[46px] active:scale-95 mt-10 rounded-[50px] border-none bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] transition-all ease-in-out duration-100"
                      disabled={isRegistering} // Disable button while registering
                    >
                      {isRegistering ? (
                        <span className="loading loading-spinner loading-md"></span> // Loading spinner
                      ) : (
                        "Register" // Default button text
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Forgot Password Form */}
              {isForgotPassword && (
                <div className="">
                  <p className="pt-10 pb-5">
                    សូមបញ្ចូលអ៊ីមែលរបស់អ្នកដើម្បីទទួល OTP
                  </p>
                  <div className="text-start grid gap-2">
                    <label htmlFor="emailForGetPW">Email</label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        id="emailForGetPW"
                        placeholder="Email"
                        className="input input-bordered bg-white border-none w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <button
                        className="btn text-accent w-[80px] px-0"
                        onClick={handleSendOTP}
                        disabled={otpCountdown > 0 || isLoading}
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : otpCountdown > 0 ? (
                          `${otpCountdown}s`
                        ) : (
                          "Get OTP"
                        )}
                      </button>
                    </div>
                    <label htmlFor="otp">OTP</label>
                    <input
                      type="text"
                      id="otp"
                      placeholder="OTP"
                      className="input input-bordered bg-white border-none w-full"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>

                  <div className="w-full mt-10">
                    <button
                      type="submit"
                      className="w-full h-[46px] active:scale-95 rounded-[50px] border-none bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] transition-all ease-in-out duration-100"
                    >
                      Confirm OTP
                    </button>
                  </div>
                  <div className="w-full mt-3">
                    <button
                      type="button"
                      onClick={handleBackToLoign}
                      className="text-accent"
                    >
                      Back to login
                    </button>
                  </div>
                </div>
              )}

              {/* Reset Password Form */}
              {!isForgotPassword && isOTPConfirmed && (
                <div className="">
                  <p className="pt-10 pb-5">សូមបញ្ចូលពាក្យសម្ងាត់ថ្មី</p>
                  <div className="text-start grid gap-2">
                    <label htmlFor="newPassword">New Password</label>
                    <div className="relative w-full h-[46px] flex items-center">
                      <input
                        type={hidePW ? "password" : "text"}
                        id="newPassword"
                        placeholder="New Password"
                        className="input input-bordered bg-white border-none w-full"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <label className="swap absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        <input
                          id="hidePW1"
                          type="checkbox"
                          onChange={handleHidePW}
                          className="hidden"
                        />
                        <Eye className="swap-on h-5 w-5 text-gray-500" />
                        <EyeOff className="swap-off h-5 w-5 text-gray-500" />
                      </label>
                    </div>

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="relative w-full h-[46px] flex items-center">
                      <input
                        type={hidePW ? "password" : "text"}
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        className="input input-bordered bg-white border-none w-full"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <label className="swap absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        <input
                          id="hidePW2"
                          type="checkbox"
                          onChange={handleHidePW}
                          className="hidden"
                        />
                        <Eye className="swap-on h-5 w-5 text-gray-500" />
                        <EyeOff className="swap-off h-5 w-5 text-gray-500" />
                      </label>
                    </div>
                  </div>
                  <div className="w-full mt-10">
                    <button
                      type="submit"
                      className="w-full h-[46px] active:scale-95 rounded-[50px] border-none bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] transition-all ease-in-out duration-100"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              )}
            </motion.form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default LoginForm;
