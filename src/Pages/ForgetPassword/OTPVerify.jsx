import React, { useState, useRef } from "react";
import { FaTruckFast } from "react-icons/fa6";
import { useNavigate } from "react-router";

const OTPVerify = () => {
    const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input automatically
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Focus previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCode = otp.join("");
    console.log("Submitted OTP:", finalCode);

    // Add your verification logic here
    navigate('/auth/reset-password')
  };

  return (
    <div className="w-full max-w-md mx-auto md:mx-0">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-3 tracking-[-0.08rem]">
          Enter Code
        </h1>
        <p className="text-gray-500 text-sm font-medium leading-relaxed">
          Enter 6 digit code that we sent in your email address
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* OTP Input Grid */}
        <div className="flex gap-2 sm:gap-3">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#CAEB66] focus:border-[#CAEB66] outline-none transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-[#CAEB66] hover:bg-[#b8d65a] text-[#02312A] font-black py-4 rounded-xl text-base transition-all duration-300 active:scale-[0.98] shadow-md cursor-pointer"
        >
          Verify Code
        </button>
      </form>

      <p className="mt-8 text-center md:text-left text-sm font-medium text-gray-500">
        Didn't receive a code?{" "}
        <button className="font-bold text-[#A5C141] hover:text-[#8ba335] transition-colors cursor-pointer">
          Resend
        </button>
      </p>
    </div>
  );
};

export default OTPVerify;
