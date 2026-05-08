import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";

const TrackParcels = () => {
  const [trackingCode, setTrackingCode] = useState("");

  // 
  const parcelInfo = {
    date: "May 31, 2025 03:41 pm",
    id: "148976175",
    invoice: "24227",
    trackingCode: "01JWJVEXWZ9823Q7HSH5SYV7",
    receiver: "Zahid Hossain",
    address: "Madrasha Road, Chandpur sadar, Chandpur, Chandpur, 3600, BD",
    phone: "01780448866",
    weight: "1 KG",
    cod: "৳ 0",
    status: "Pending",
  };

  const updates = [
    {
      date: "Jun 02, 2025",
      time: "12:21 am",
      message: "Assigned to rider.",
      completed: true,
    },
    {
      date: "Jun 02, 2025",
      time: "12:21 am",
      message: "Assigned to rider.",
      completed: true,
    },
    {
      date: "Jun 02, 2025",
      time: "12:21 am",
      message: "Assigned to rider.",
      completed: true,
    },
    {
      date: "Jun 02, 2025",
      time: "12:21 am",
      message: "Assigned to rider.",
      completed: true,
    },
    {
      date: "Jun 02, 2025",
      time: "12:21 am",
      message: "Assigned to rider.",
      completed: true,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-12 bg-white min-h-screen font-sans mt-12 rounded-2xl">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#02312A] mb-2 tracking-tight">
          Track Your Consignment
        </h1>
        <p className="text-gray-400 font-medium">
          Now you can easily track your consignment
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm mb-12">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tracking code here"
          className="w-full bg-[#F3F4F6] border-none rounded-full py-3.5 pl-12 pr-28 focus:ring-2 focus:ring-[#CAEB66] transition-all outline-none text-sm"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
        />
        <button className="absolute right-1.5 top-1.5 bg-[#CAEB66] text-[#02312A] font-bold px-6 py-2 rounded-full hover:bg-[#b8d65a] transition-colors">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Card: Product Details */}
        <div className="bg-[#F3F7F9] p-8 rounded-[40px] space-y-6">
          <h2 className="text-2xl font-black text-[#02312A] mb-4">
            Product details
          </h2>

          <div className="space-y-1">
            <p className="text-gray-400 text-sm font-bold">{parcelInfo.date}</p>
            <p className="text-gray-700 font-medium">
              <span className="text-gray-500 font-bold">ID :</span>{" "}
              {parcelInfo.id}
            </p>
            <p className="text-gray-700 font-medium">
              <span className="text-gray-500 font-bold">Invoice :</span>{" "}
              {parcelInfo.invoice}
            </p>
            <p className="text-gray-700 font-medium break-all">
              <span className="text-gray-500 font-bold">Tracking Code :</span>{" "}
              {parcelInfo.trackingCode}
            </p>
          </div>

          <div className="space-y-1 pt-4">
            <p className="text-gray-700 font-medium">
              <span className="text-gray-500 font-bold">Name :</span>{" "}
              {parcelInfo.receiver}
            </p>
            <p className="text-gray-700 font-medium leading-relaxed">
              <span className="text-gray-500 font-bold">Address :</span>{" "}
              {parcelInfo.address}
            </p>
            <p className="text-gray-700 font-medium">
              <span className="text-gray-500 font-bold">Phone Number :</span>{" "}
              {parcelInfo.phone}
            </p>
          </div>

          <div className="space-y-1 pt-4">
            <p className="text-gray-700 font-medium">
              <span className="text-gray-500 font-bold">Approved :</span> N/A
            </p>
            <p className="text-gray-700 font-medium">
              <span className="text-gray-500 font-bold">Weight :</span>{" "}
              {parcelInfo.weight}
            </p>
            <p className="text-gray-700 font-medium">
              <span className="text-gray-500 font-bold">COD :</span>{" "}
              {parcelInfo.cod}
            </p>
            <p className="text-[#FFB800] font-black uppercase text-sm pt-2">
              {parcelInfo.status}
            </p>
          </div>
        </div>

        {/* Right Card: Tracking Updates */}
        <div className="bg-[#F3F7F9] p-8 rounded-[40px]">
          <h2 className="text-2xl font-black text-[#02312A] mb-8">
            Tracking Updates
          </h2>

          <div className="relative space-y-8">
            {updates.map((step, index) => (
              <div key={index} className="flex items-start gap-6 relative">
                {/* Vertical Line */}
                {index !== updates.length - 1 && (
                  <div className="absolute left-[103px] top-8 w-0.5 h-12 bg-gray-200"></div>
                )}

                {/* Date & Time */}
                <div className="w-24 text-right shrink-0">
                  <p className="text-xs font-bold text-gray-500 leading-tight">
                    {step.date}
                  </p>
                  <p className="text-xs font-medium text-gray-400">
                    {step.time}
                  </p>
                </div>

                {/* Status Icon */}
                <div className="relative z-10">
                  <IoCheckmarkCircle className="text-[#CAEB66] text-3xl bg-white rounded-full" />
                </div>

                {/* Status Message */}
                <div className="pt-1">
                  <p className="text-sm font-bold text-[#02312A]">
                    {step.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackParcels;
