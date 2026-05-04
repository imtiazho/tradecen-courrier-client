import React, { useState, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiUser, FiUpload, FiX } from "react-icons/fi";
import logo from "./logo.png"; // Make sure to have your logo image in your project
import authImage from "./auth_image.png"; // Make sure to have your right-side image

const SignUpPage = () => {
  // State to handle image preview
  const [selectedImage, setSelectedImage] = useState(null);
  // Reference to the hidden file input
  const fileInputRef = useRef(null);

  // Handle when user selects a file
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Trigger the file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Remove the selected image and reset
  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Prevent triggering the upload click
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  return (
    <div className="w-full max-w-md mx-auto md:mx-0">
      {/* Form Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-1.5 tracking-tighter">
          Create an Account
        </h1>
        <p className="text-gray-600 text-sm font-medium">
          Register with ZapShift
        </p>
      </div>

      {/* Image Upload/Preview Component */}
      <div className="mb-8 relative w-20 h-20">
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Interactive Area */}
        <div
          onClick={selectedImage ? null : handleUploadClick} // Click to upload only when no image
          className={`
                                w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden border
                                ${
                                  selectedImage
                                    ? "bg-gray-100 border-gray-200"
                                    : "bg-[#F2F4F7] border-gray-200 hover:border-[#CAEB66] cursor-pointer group"
                                }
                            `}
        >
          {selectedImage ? (
            <>
              {/* --- Logic: If photo exists, show image and cancel button --- */}
              <img
                src={selectedImage}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />

              {/* The small cancel/remove button */}
              <button
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 bg-white p-1 rounded-full text-gray-500 hover:text-white hover:bg-gray-800 transition-colors shadow-sm"
                title="Remove photo"
              >
                <FiX size={14} strokeWidth={3} />
              </button>
            </>
          ) : (
            <>
              {/* --- Logic: Default placeholder and upload hint --- */}
              <div className="flex items-center justify-center relative">
                <div className="bg-gray-200 p-3 rounded-full text-gray-500 group-hover:bg-[#CAEB66]/20 transition-colors">
                  <FiUser size={30} />
                </div>
                <div className="absolute -right-3 bottom-0 bg-[#CAEB66] p-1.5 rounded-full text-gray-900 group-hover:bg-[#b5d35c] transition-colors border-4 border-white">
                  <FiUpload size={14} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Registration Form */}
      <form className="space-y-5">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-black ml-1">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all font-medium placeholder:text-gray-300"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-black ml-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all font-medium placeholder:text-gray-300"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-black ml-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all font-medium placeholder:text-gray-300"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-[#D1EE67] hover:bg-[#c2e25a] text-[#02312A] font-bold py-3.5 rounded-lg transition-colors mt-2 text-base shadow-[0px_4px_10px_rgba(209,238,103,0.2)]"
        >
          Register
        </button>
      </form>

      {/* Footer & Social */}
      <div className="mt-8 text-center space-y-6">
        <p className="text-sm font-medium text-gray-500">
          Already have an account?{" "}
          <a href="#" className="font-bold text-[#A5C141] hover:underline">
            Login
          </a>
        </p>

        <div className="relative flex items-center justify-center">
          <span className="bg-white px-4 text-gray-400 text-sm font-medium z-10">
            Or
          </span>
          <div className="absolute w-full border-t border-gray-100"></div>
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-3 bg-[#E9EDF2] hover:bg-[#dfe4ea] text-[#02312A] font-bold py-3.5 rounded-lg transition-colors">
          <FcGoogle size={24} />
          Register with google
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
