import React, { useState } from "react";
import { FaTruckFast } from "react-icons/fa6";

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password reset successful:", passwords.newPassword);
    // Add your API call or Firebase logic here
  };

  return (
    <div className="w-full max-w-md mx-auto md:mx-0">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-3 tracking-[-0.08rem]">
          Reset Password
        </h1>
        <p className="text-gray-500 text-sm font-medium leading-relaxed">
          Reset your password
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-black ml-1">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all font-medium placeholder:text-gray-300"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-black ml-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all font-medium placeholder:text-gray-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D1EE67] hover:bg-[#c2e25a] text-[#02312A] font-bold py-3.5 rounded-lg transition-all mt-4 text-base shadow-md active:scale-[0.98]"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
