import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { sendOTP } from "../../../firebase.init";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSendMail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        navigate("/auth/verify-OTP", { state: { email } });
      } else {
        alert(data.error || "Failed to send OTP");
      }
    } catch (error) {
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto md:mx-0">
      {/* Form Header */}
      <div className="mb-10 mt-16 md:mt-0">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-3 tracking-[-0.08rem]">
          Forgot Password
        </h1>
        <p className="text-gray-600 text-sm font-medium">
          Enter your email address and we'll send you a reset link to get back
          into your account.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label className="text-sm font-bold text-black ml-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all"
            required
          />
        </div>

        <button
          onClick={handleSendMail}
          type="submit"
          className="w-full bg-[#CAEB66] hover:bg-[#b8d65a] text-[#02312A] font-black py-4 rounded-xl text-base transition-all duration-300 active:scale-[0.98] shadow-md cursor-pointer"
        >
          Send Reset Link
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="mt-10 text-center md:text-left">
        <p className="text-gray-500 text-sm font-medium">
          Remember your password?{" "}
          <Link
            to="/auth/login"
            className="font-bold text-[#A5C141] hover:text-[#8ba335] transition-colors inline-flex items-center gap-1"
          >
            Login
          </Link>
        </p>

        <Link
          to="/auth/login"
          className="mt-6 inline-flex items-center gap-2 text-gray-400 hover:text-[#02312A] font-bold text-sm transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
