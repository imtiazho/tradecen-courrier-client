import { Bike, MapPin, Power } from "lucide-react";
import React, { useState } from "react";
import {
  RiTruckLine,
  RiCheckboxCircleLine,
  RiCompass3Line,
  RiHandCoinLine,
  RiAlertLine,
  RiPhoneLine,
  RiMapPin2Line,
  RiMap2Line,
  RiQrScanLine,
  RiSignalTowerLine,
  RiCheckDoubleLine,
  RiStarFill,
  RiAwardLine,
  RiShieldUserLine,
  RiAlertFill,
  RiToolsFill,
  RiCustomerService2Fill,
  RiPhoneFill,
  RiGovernmentFill,
} from "react-icons/ri";
import { TbUserQuestion } from "react-icons/tb";
import { Link } from "react-router";

const RiderState = () => {
  const [isOnline, setIsOnline] = useState(true); // 🔘 Rider Status Controls
  const [riderData, setRiderData] = useState({
    displayName: "Rahat Hasan",
    email: "rahat.rider@TradeCen.com",
    photoURL:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    role: "rider",
    contact: "+8801712345678",
    region: "Dhaka",
    district: "Dhaka",
    area: "Dhanmondi",
    vehicleType: "Bike",
    workStatus: "available", // available, offline
    currentTasks: 2,
    successRate: 96.5,
    rating: 4.8,
    totalEarnings: 4520,
  });

  // 📝 Core Logistic Stats Only
  const [stats] = useState({
    totalAssigned: 25,
    pendingDelivery: 7,
    deliveredToday: 18,
    cashCollected: 16400,
    codPendingSubmit: 12000,
  });

  // 📦 Active Delivery Manifest (Important Operational Items Only)
  const [assignedParcels, setAssignedParcels] = useState([
    {
      id: "ZS-90821",
      name: "Abir Rahman",
      phone: "01712345678",
      area: "Dhanmondi 27",
      cod: 4500,
      type: "Same Day",
      priority: "high",
      status: "pending",
    },
    {
      id: "ZS-90822",
      name: "Karim Ullah",
      phone: "01898765432",
      area: "Sobhanbag",
      cod: 3200,
      type: "Express",
      priority: "high",
      status: "pending",
    },
    {
      id: "ZS-90823",
      name: "Nusrat Jahan",
      phone: "01555443322",
      area: "Kalabagan",
      cod: 1200,
      type: "Regular",
      priority: "normal",
      status: "delivered",
    },
  ]);

  const toggleStatus = () => {
    setRiderData((prev) => ({
      ...prev,
      workStatus: prev.workStatus === "available" ? "offline" : "available",
    }));
  };

  return (
    <div className="min-h-screen text-[#02312A] font-sans antialiased selection:bg-[#CAEB66]/30">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="bg-[#CAEB66] p-6 rounded-[28px] border border-[#02312A]/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden transition-all duration-300">
          {/* ⚡ Subtle background glow pattern tuned for light contrast */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/40 rounded-full blur-3xl pointer-events-none"></div>

          {/* Left Side: Avatar and Identity Details */}
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row z-10">
            <div className="relative">
              <img
                src={riderData.photoURL}
                alt={riderData.displayName}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-2 border-[#02312A]/10 shadow-md"
              />
              {/* Status Dot */}
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-[#CAEB66] shadow-sm ${
                  riderData.workStatus === "available"
                    ? "bg-[#02312A]"
                    : "bg-rose-500"
                }`}
              ></span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-col md:flex-row items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#02312A]">
                  {riderData.displayName}
                </h1>
                <span className="text-[10px] font-black tracking-wider text-white bg-[#02312A] px-2 py-0.5 rounded-md uppercase shadow-sm">
                  {riderData.role} center
                </span>
              </div>

              <p className="text-[#02312A]/70 text-xs flex items-center justify-center md:justify-start gap-1.5 font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#02312A]" />{" "}
                {riderData.area}, {riderData.district}
              </p>

              {/* Badge Tags Container */}
              <div className="mt-3 flex gap-2 justify-center md:justify-start pt-1">
                <span className="bg-[#02312A]/5 border border-[#02312A]/10 px-3 py-1 rounded-xl text-[11px] font-black text-[#02312A] flex items-center gap-1.5 shadow-sm/5">
                  <Bike className="w-3.5 h-3.5 text-[#02312A]" />{" "}
                  {riderData.vehicleType} Fleet
                </span>
                <span className="bg-[#02312A]/5 border border-[#02312A]/10 px-3 py-1 rounded-xl text-[11px] font-black text-[#02312A]/60">
                  ID: ZS-R-442
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Telemetry Link & Action Trigger */}
          <div className="flex flex-col items-center md:items-end gap-2.5 w-full md:w-auto border-t border-[#02312A]/10 pt-4 md:pt-0 md:border-none z-10">
            <span className="text-[10px] text-[#02312A]/60 uppercase tracking-widest font-black flex items-center gap-1">
              <RiSignalTowerLine
                className={
                  riderData.workStatus === "available"
                    ? "text-[#02312A] animate-pulse"
                    : "text-gray-400"
                }
              />
              Telemetry Link
            </span>

            <button
              onClick={toggleStatus}
              className={`w-full md:w-auto px-6 py-2.5 rounded-xl font-black text-xs tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 border hover:scale-[1.02] ${
                riderData.workStatus === "available"
                  ? "bg-[#02312A] text-[#CAEB66] border-[#02312A] hover:bg-[#03443a]"
                  : "bg-white text-rose-600 border-white hover:bg-gray-50 hover:text-rose-700"
              }`}
            >
              <Power className="w-3.5 h-3.5 stroke-[2.5]" />
              {riderData.workStatus === "available"
                ? "GO OFFLINE"
                : "GO ONLINE"}
            </button>
          </div>
        </div>

        {/* CORE SUMMARY MATRICES */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            {
              label: "Assigned",
              val: stats.totalAssigned,
              icon: <RiTruckLine />,
              col: "text-[#02312A]",
            },
            {
              label: "Pending",
              val: stats.pendingDelivery,
              icon: <RiCompass3Line />,
              col: "text-amber-500",
            },
            {
              label: "Delivered",
              val: stats.deliveredToday,
              icon: <RiCheckboxCircleLine />,
              col: "text-emerald-500",
            },
            {
              label: "Collected Cash",
              val: `৳${stats.cashCollected}`,
              icon: <RiHandCoinLine />,
              col: "text-emerald-600",
            },
            {
              label: "Due to Hub",
              val: `৳${stats.codPendingSubmit}`,
              icon: <RiAlertLine />,
              col: "text-rose-600 bg-rose-50/40 border-rose-100",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`bg-white border border-gray-100 p-4 rounded-[20px] shadow-sm flex flex-col justify-between transition-all hover:border-[#CAEB66] ${card.col.includes("bg-rose-50") ? "border-rose-100 bg-rose-50/30" : ""} ${idx === 4 ? "col-span-2 md:col-span-1" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {card.label}
                </span>
                <div className={`text-base ${card.col.split(" ")[0]}`}>
                  {card.icon}
                </div>
              </div>
              <h3 className="text-xl font-black mt-3 tracking-tight">
                {card.val}
              </h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT: ACTIVE DELIVERY MANIFEST TERMINAL */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[24px] shadow-sm overflow-hidden">
            {/* =========================================================================
      CARD HEADER WITH "SEE ALL" ROUTE LINK
      ========================================================================= */}
            <div className="p-5 border-b border-gray-50 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black tracking-tight">
                    Active Delivery Manifest
                  </h3>
                  <span className="text-[10px] bg-amber-500/10 text-amber-700 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Top 5 Today
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">
                  Quick access to your immediate pending dispatches
                </p>
              </div>

              {/* 🔗 এখানে ক্লিক করলে সরাসরি অল টাস্ক পেজে নিয়ে যাবে */}
              <Link
                to="/rider/all-manifest" // তোমার কাঙ্ক্ষিত রাউট পাথটি এখানে বসাও ভাই
                className="text-xs font-black text-[#02312A] hover:text-[#CAEB66] bg-gray-50 hover:bg-[#02312A] px-3 py-1.5 rounded-xl transition-all duration-200 border border-gray-100 flex items-center gap-1 shadow-sm"
              >
                See All ({assignedParcels.length}) →
              </Link>
            </div>

            {/* =========================================================================
      PARCEL LIST (STRICTLY SLICED TO TOP 5)
      ========================================================================= */}
            <div className="divide-y divide-gray-50">
              {/* 💡 .slice(0, 5) দিয়ে লিস্টকে সবসময় ড্যাশবোর্ডে ৫ টায় লক করে রাখা হয়েছে */}
              {assignedParcels.slice(0, 5).map((parcel) => (
                <div
                  key={parcel.id}
                  className={`p-5 transition-all ${parcel.priority === "high" ? "bg-amber-50/15" : ""}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Package Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-gray-400">
                          {parcel.id}
                        </span>
                        {parcel.priority === "high" && (
                          <span className="bg-rose-100 text-rose-700 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {parcel.type}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-black text-[#02312A]">
                        {parcel.name}
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <RiMapPin2Line size={13} className="text-gray-400" />{" "}
                        {parcel.area}
                      </p>
                    </div>

                    {/* COD amount */}
                    <div className="sm:text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        COD to Collect
                      </p>
                      <h4 className="text-base font-black text-[#02312A]">
                        ৳{parcel.cod.toLocaleString()}
                      </h4>
                    </div>

                    {/* Action Terminal Buttons */}
                    <div className="flex items-center gap-1.5 self-end sm:self-center">
                      <a
                        href={`tel:${parcel.phone}`}
                        className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-all"
                      >
                        <RiPhoneLine size={15} />
                      </a>
                      <button className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-all">
                        <RiMap2Line size={15} />
                      </button>

                      {parcel.status === "pending" ? (
                        <div className="flex items-center gap-1.5 pl-1">
                          <button
                            onClick={() =>
                              alert(`Parcel ${parcel.id} marked as HOLD`)
                            }
                            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 text-xs font-bold px-3 py-2 rounded-xl transition-all"
                          >
                            Hold
                          </button>
                          <button
                            onClick={() =>
                              alert(`Parcel ${parcel.id} marked as DELIVERED`)
                            }
                            className="bg-[#02312A] hover:bg-[#03443a] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all"
                          >
                            Complete
                          </button>
                        </div>
                      ) : (
                        <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-3 py-2 rounded-xl flex items-center gap-1">
                          <RiCheckDoubleLine /> Delivered
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* =========================================================================
      BOTTOM QUICK FOOTER HINT
      ========================================================================= */}
            {assignedParcels.length > 5 && (
              <div className="p-3.5 bg-gray-50/50 border-t border-gray-50 text-center">
                <p className="text-[11px] text-gray-400 font-medium">
                  You have{" "}
                  <span className="font-bold text-[#02312A]">
                    {assignedParcels.length - 5} more
                  </span>{" "}
                  assigned parcels in your wallet.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4 w-full">
            {/* Terminal Actions Panel */}
            <div className="bg-[#02312A] text-white p-5 rounded-[24px] shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-black tracking-tight text-[#CAEB66]">
                  Terminal Actions
                </h3>
                <p className="text-[11px] text-gray-300 font-medium mt-0.5">
                  Quick access triggers for on-field operations
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button className="bg-white/10 hover:bg-white/15 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group">
                  <RiQrScanLine
                    size={18}
                    className="text-[#CAEB66] group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs font-bold">Scan Inbound</span>
                </button>
                <button className="bg-white/10 hover:bg-white/15 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group">
                  <RiHandCoinLine
                    size={18}
                    className="text-[#CAEB66] group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs font-bold">Submit COD</span>
                </button>
              </div>
            </div>

            {/* Live Performance / Rank Snapshot */}
            <div className="bg-white border border-gray-100 p-5 rounded-[24px] shadow-sm space-y-3.5">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">
                Shift Metrics Dock
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100/60">
                  <span className="text-[10px] font-bold text-gray-400 block uppercase">
                    Conversion Rate
                  </span>
                  <div className="flex items-center gap-1 mt-1 font-black text-sm text-[#02312A]">
                    <RiCheckboxCircleLine className="text-emerald-500" />{" "}
                    {riderData.successRate}%
                  </div>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100/60">
                  <span className="text-[10px] font-bold text-gray-400 block uppercase">
                    Rider Rating
                  </span>
                  <div className="flex items-center gap-1 mt-1 font-black text-sm text-[#02312A]">
                    <RiStarFill className="text-amber-500" /> {riderData.rating}{" "}
                    / 5.0
                  </div>
                </div>
              </div>
              <div className="bg-[#CAEB66]/10 border border-[#CAEB66]/30 p-3 rounded-xl flex justify-between items-center text-xs font-bold text-[#02312A]">
                <span>Today's Incentives:</span>
                <span className="font-black">৳{riderData.totalEarnings}</span>
              </div>
            </div>
          </div>
        </div>

        {/* EMERGENCY SOS & RIDER SUPPORT DISPATCH CENTER (FULL WIDTH) */}
        <div className="w-full bg-white border border-rose-100 rounded-[24px] shadow-sm overflow-hidden mt-6 animate-pulse-subtle">
          {/* Header Section (Emergency Theme) */}
          <div className="p-5 border-b border-rose-50 flex justify-between items-center bg-rose-50/20">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black tracking-tight text-rose-950">
                  Emergency SOS & Support Dispatch
                </h3>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                </span>
              </div>
              <p className="text-[11px] text-rose-700/70 font-medium">
                On-road crisis protocol. Instant connection to TradeCen helpdesk
              </p>
            </div>

            <span className="text-[10px] font-black text-white bg-rose-600 px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm animate-bounce-slow">
              Critical Unit
            </span>
          </div>

          <div className="p-5 space-y-5">
            {/* ⚡ INSTANT TRIGGER TRIPLE BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Report Accident */}
              <button
                onClick={() =>
                  alert("Initiating Accident Protocol... Hub Manager notified.")
                }
                className="p-4 bg-rose-50 hover:bg-rose-100/70 border border-rose-100 rounded-2xl flex items-center gap-3.5 text-left transition-all group hover:scale-[1.01]"
              >
                <div className="p-3 bg-rose-600 text-white rounded-xl shadow-md group-hover:bg-rose-700 transition-colors">
                  <RiAlertFill size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-rose-950">
                    Report Accident
                  </h4>
                  <p className="text-[10px] text-rose-700 font-medium mt-0.5">
                    Crash or personal injury
                  </p>
                </div>
              </button>

              {/* Vehicle Breakdown */}
              <button
                onClick={() =>
                  alert("Dispatching technical backup or relief rider query...")
                }
                className="p-4 bg-amber-50/60 hover:bg-amber-100/50 border border-amber-100 rounded-2xl flex items-center gap-3.5 text-left transition-all group hover:scale-[1.01]"
              >
                <div className="p-3 bg-amber-500 text-white rounded-xl shadow-md group-hover:bg-amber-600 transition-colors">
                  <RiToolsFill size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-amber-950">
                    Bike Breakdown
                  </h4>
                  <p className="text-[10px] text-amber-700 font-medium mt-0.5">
                    Engine or tire puncture
                  </p>
                </div>
              </button>

              {/* Customer Dispute */}
              <button
                onClick={() =>
                  alert("Connecting to Dispute Escalation Desk...")
                }
                className="p-4 bg-blue-50/60 hover:bg-blue-100/50 border border-blue-100 rounded-2xl flex items-center gap-3.5 text-left transition-all group hover:scale-[1.01]"
              >
                <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md group-hover:bg-blue-700 transition-colors">
                  <TbUserQuestion size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-blue-950">
                    Customer Issue
                  </h4>
                  <p className="text-[10px] text-blue-700 font-medium mt-0.5">
                    Refusal, harassment or cash gap
                  </p>
                </div>
              </button>
            </div>

            {/* 📞 COMMUNICATIONS TERMINAL (Quick Actions & Dialers) */}
            <div className="pt-2 border-t border-gray-100">
              {/* Right Part: Direct Hotline Dialers */}
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                {/* Hub Manager Phone */}
                <a
                  href="tel:+8801700000000"
                  className="w-full sm:w-auto text-center text-[11px] font-bold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <RiPhoneFill size={13} className="text-gray-400" /> Hub
                  Manager
                </a>

                {/* National Emergency 999 */}
                <a
                  href="tel:999"
                  className="w-full sm:w-auto text-center text-[11px] font-black text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-100 px-3 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <RiGovernmentFill size={13} /> Police / Ambulance (999)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Completion Run */}
        <div className="bg-white border border-gray-100 p-5 rounded-[24px] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-black tracking-tight text-[#02312A]">
              Delivery Completion Run
            </span>
            <span className="text-xs font-black text-[#02312A] bg-[#CAEB66] px-2.5 py-1 rounded-lg">
              {Math.round((stats.deliveredToday / stats.totalAssigned) * 100)}%
              Done
            </span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-[#02312A] h-full rounded-full transition-all duration-500"
              style={{
                width: `${(stats.deliveredToday / stats.totalAssigned) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderState;
