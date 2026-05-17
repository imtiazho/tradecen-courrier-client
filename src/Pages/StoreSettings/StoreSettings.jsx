import React from "react";
import {
  FaStore,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaCamera,
} from "react-icons/fa";
import Swal from "sweetalert2";

const StoreSettings = () => {
  const handleUpdate = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Success!",
      text: "Store information updated successfully.",
      icon: "success",
      confirmButtonColor: "#02312A",
    });
  };

  return (
    <div className="p-6 md:p-10 bg-white rounded-[40px] shadow-sm min-h-screen">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-[#02312A] mb-2">
          Store Settings
        </h2>
        <p className="text-gray-500 text-sm">
          Manage your business identity and default pickup locations.
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-8">
        {/* 1. Store Logo Section */}
        <div className="flex items-center gap-6 p-6 bg-[#F8F9FA] rounded-[30px] border border-dashed border-gray-200">
          <div className="relative group">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-[#CAEB66] overflow-hidden">
              <FaStore size={40} className="text-gray-300" />
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 p-2 bg-[#02312A] text-[#CAEB66] rounded-full hover:scale-110 transition-transform"
            >
              <FaCamera size={14} />
            </button>
          </div>
          <div>
            <h4 className="font-black text-[#02312A]">Store Logo</h4>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Recommended size: 500x500px
            </p>
          </div>
        </div>

        {/* 2. Main Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Store Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2">
              <FaStore className="text-[#CAEB66]" /> Store Name
            </label>
            <input
              type="text"
              defaultValue="My Awesome Store"
              className="bg-[#F8F9FA] p-4 rounded-2xl text-xs font-bold text-[#02312A] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] border border-transparent"
            />
          </div>

          {/* Official Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2">
              <FaPhoneAlt className="text-[#CAEB66]" /> Official Phone
            </label>
            <input
              type="text"
              defaultValue="+880 1700 000000"
              className="bg-[#F8F9FA] p-4 rounded-2xl text-xs font-bold text-[#02312A] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] border border-transparent"
            />
          </div>

          {/* Pickup Address */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#CAEB66]" /> Default Pickup
              Location
            </label>
            <textarea
              rows="3"
              defaultValue="House 24, Road 7, Sector 4, Uttara, Dhaka"
              className="bg-[#F8F9FA] p-4 rounded-2xl text-xs font-bold text-[#02312A] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] border border-transparent resize-none"
            />
          </div>

          {/* Store Website (Optional) */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2">
              <FaGlobe className="text-[#CAEB66]" /> Website / Social Link
            </label>
            <input
              type="url"
              placeholder="https://yourstore.com"
              className="bg-[#F8F9FA] p-4 rounded-2xl text-xs font-bold text-[#02312A] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] border border-transparent"
            />
          </div>

          {/* Business Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2">
              <FaEnvelope className="text-[#CAEB66]" /> Business Email
            </label>
            <input
              type="email"
              defaultValue="store@example.com"
              className="bg-[#F8F9FA] p-4 rounded-2xl text-xs font-bold text-[#02312A] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] border border-transparent"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="bg-[#CAEB66] text-[#02312A] px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-[#CAEB66]/20"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreSettings;
