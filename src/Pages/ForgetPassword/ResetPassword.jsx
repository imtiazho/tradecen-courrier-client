import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // OTP ভেরিফিকেশন পেজ থেকে আসা ইমেইলটি রিসিভ করা
  const email = location.state?.email;

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return alert("Session expired. Please restart the process.");
    }

    if (!passwords.newPassword || !passwords.confirmPassword) {
      return alert("Please fill all fields");
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      setLoading(true);

      // আপনার এক্সপ্রেস ব্যাকঅ্যান্ডে রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Password reset successful!");
        navigate("/auth/login");
      } else {
        alert(data.error || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto md:mx-0">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-3 tracking-[-0.08rem]">
          Reset Password
        </h1>

        <p className="text-gray-500 text-sm font-medium">
          Create a new password for your account
        </p>

        {email && (
          <p className="text-sm font-bold text-[#A5C141] mt-2">{email}</p>
        )}
      </div>

      {/* FORM */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* NEW PASSWORD */}
        <div>
          <label className="text-sm font-bold text-black ml-1">
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full border border-gray-200 rounded-lg py-3 px-4 mt-1 focus:ring-2 focus:ring-[#CAEB66] focus:border-[#CAEB66] outline-none"
            required
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="text-sm font-bold text-black ml-1">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full border border-gray-200 rounded-lg py-3 px-4 mt-1 focus:ring-2 focus:ring-[#CAEB66] focus:border-[#CAEB66] outline-none"
            required
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#D1EE67] hover:bg-[#c2e25a] text-[#02312A] font-bold py-3.5 rounded-lg transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
