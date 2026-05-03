import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaTruckFast } from "react-icons/fa6";
import AuthImg from "../../assets/authImage.png";

const AuthLayout = () => {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans bg-white">
      {/* 1. Left Side: Form Content */}
      <div className="flex flex-col justify-center px-10 md:px-20 lg:px-32 py-12">
        {/* Logo Section */}
        <div className="flex items-center gap-2 mb-16">
          <div className="bg-[#CAEB66] p-2 rounded-lg">
            <FaTruckFast className="text-[#02312A]" size={24} />
          </div>
          <span className="text-2xl font-bold text-[#02312A]">TradeCen</span>
        </div>

        <div className="w-full max-w-md">
          {/* Form Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">Login with TradeCen</p>
          </div>

          {/* Login Form */}
          <form className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all"
              />
            </div>

            <a
              href="#"
              className="inline-block text-sm font-medium text-gray-500 hover:underline decoration-1 underline-offset-4"
            >
              Forget Password?
            </a>

            {/* Main Login Button */}
            <button
              type="submit"
              className="w-full bg-[#D4ED71] hover:bg-[#c5df5e] text-[#02312A] font-bold py-3.5 rounded-lg transition-colors mt-2"
            >
              Login
            </button>
          </form>

          {/* Footer & Social */}
          <div className="mt-6 text-center space-y-6">
            <p className="text-sm text-gray-500">
              Don’t have any account?{" "}
              <a
                href="#"
                className="font-semibold text-[#8EB31F] hover:underline"
              >
                Register
              </a>
            </p>

            <div className="relative flex items-center justify-center">
              <span className="bg-white px-4 text-gray-400 text-sm z-10">
                Or
              </span>
              <div className="absolute w-full border-t border-gray-100"></div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 bg-[#E9EDF2] hover:bg-[#dfe4ea] text-[#02312A] font-bold py-3.5 rounded-lg transition-colors">
              <FcGoogle size={24} />
              Login with google
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center bg-[#FAFDF0] p-12">
        <div className="relative w-full max-w-lg">
          {/* This is where you will add your <img> tag for image_edc1c4.png */}
          <div
            className="aspect-square bg-contain bg-no-repeat bg-center opacity-90 transition-opacity hover:opacity-100"
            style={{ backgroundImage: `url('/path-to-your-image.png')` }}
          >
            <img src={AuthImg} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
