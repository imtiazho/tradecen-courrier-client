import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";

const OTPVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ForgetPassword পেজ থেকে আসা ইমেইলটি রিসিভ করা
  const email = location.state?.email;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  // ইনপুট হ্যান্ডলিং লজিক
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // অটো ফোকাস পরবর্তী বক্সে
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // OTP ভেরিফাই করার ফাংশন
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (!email) {
      return alert("Email missing. Please restart process.");
    }

    if (finalOtp.length !== 6) {
      return alert("Please enter full 6 digit OTP");
    }

    try {
      setLoading(true);

      // আপনার এক্সপ্রেস সার্ভারে রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: finalOtp }),
      });

      const data = await response.json();

      if (data.success) {
        // ভেরিফিকেশন সফল হলে রিসেট পাসওয়ার্ড পেজে পাঠানো
        navigate("/auth/reset-password", {
          state: { email },
        });
      } else {
        alert(data.error || "Invalid or expired OTP");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // OTP পুনরায় পাঠানোর ফাংশন
  const handleResend = async () => {
    try {
      if (!email) return alert("Email not found!");

      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        alert("A new OTP has been sent to your email.");
      } else {
        alert("Failed to resend OTP.");
      }
    } catch (error) {
      console.error("Resend Error:", error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-black mb-2">Enter Code</h1>
        <p className="text-gray-500 text-sm">
          Enter the 6-digit OTP sent to your email:
        </p>
        <p className="text-sm font-bold text-[#A5C141] mt-1">{email}</p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* OTP INPUTS */}
        <div className="flex gap-2 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#CAEB66] focus:border-[#CAEB66] outline-none"
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#CAEB66] hover:bg-[#b8d65a] text-[#02312A] font-black py-4 rounded-xl transition-all disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>
      </form>

      {/* RESEND SECTION */}
      <p className="mt-6 text-center text-sm text-gray-500">
        Didn’t receive code?{" "}
        <button
          type="button"
          onClick={handleResend}
          className="font-bold text-[#A5C141] hover:text-[#8ba335]"
        >
          Resend OTP
        </button>
      </p>
    </div>
  );
};

export default OTPVerify;
