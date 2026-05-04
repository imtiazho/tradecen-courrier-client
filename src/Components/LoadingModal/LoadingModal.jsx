import React from "react";

const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#CAEB66] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#02312A] font-bold text-lg animate-pulse">
          Processing...
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;
