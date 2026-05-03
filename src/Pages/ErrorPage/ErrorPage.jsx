import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import errorImg from "../../assets/error.png";

const ErrorPage = () => {
  return (
    <section className="min-h-screen bg-[#F2F4F7] flex items-center justify-center p-4 md:p-10 font-sans">
      <div className="w-full bg-white rounded-[30px] p-10 md:p-20 flex flex-col items-center text-center">
        {/* 1. Animated Icon Container */}
        <div className="relative">
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <img
              src={errorImg}
              alt="Error Character"
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
            />
            <motion.div
              className="absolute top-1/2 -right-4 md:-right-8"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              {/* If the wrench is part of the image, you can ignore this div */}
            </motion.div>
          </motion.div>

          {/* Shadow Animation */}
          <motion.div
            className="w-32 h-4 bg-black/5 rounded-[100%] mx-auto mt-4 blur-md"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* 2. Text Content */}
        <h1 className="text-[#02312A] text-5xl md:text-7xl font-black mb-6">
          Error 404
        </h1>
        <p className="text-[#5F7180] text-base md:text-lg max-w-md mb-10 leading-relaxed font-medium">
          Something went wrong or the page you are looking for doesn't exist.
          Don't worry, our team is working on it!
        </p>

        {/* 3. Action Button (Matching your Theme) */}
        <Link to="/">
          <button className="bg-[#CAEB66] hover:bg-[#b8d65a] text-[#02312A] font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-[#CAEB66]/20 active:scale-95 cursor-pointer">
            Go Home
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
