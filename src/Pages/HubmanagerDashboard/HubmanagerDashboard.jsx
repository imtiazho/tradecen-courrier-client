import React from "react";
import {
  RiAlarmWarningLine,
  RiArrowGoBackLine,
  RiCheckboxCircleLine,
  RiFocus2Line,
  RiMapPin2Line,
  RiTimeLine,
  RiTruckLine,
  RiUserReceivedLine,
  RiWallet3Line,
  RiQrScanLine,
  RiNotification3Line,
} from "react-icons/ri";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import { LucideWarehouse } from "lucide-react";
import { Link } from "react-router";

const HubmanagerDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading: managerLoading, data: managerData = {} } = useQuery({
    queryKey: ["managerData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/hub-managers?email=${user.email}`,
      );
      return Array.isArray(res.data) && res.data.length > 0
        ? res.data[0]
        : res.data;
    },
    enabled: !!user?.email,
  });

  const { isLoading: incomingLoading, data: incomingData = [] } = useQuery({
    queryKey: ["inComingData", managerData?.hubName],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/incoming/${managerData?.hubName}`,
      );
      return res.data;
    },

    enabled: !!managerData?.hubName,
  });

  const stats = [
    {
      label: "Incoming",
      count: incomingData.length,
      icon: <RiUserReceivedLine />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      path: '/dashboard/incoming'
    },
    {
      label: "In House",
      count: "12",
      icon: <LucideWarehouse />,
      color: "text-purple-600",
      bg: "bg-purple-50",
      path: ''
    },
    {
      label: "Out for Delivery",
      count: 28,
      icon: <RiTruckLine />,
      color: "text-orange-600",
      bg: "bg-orange-50",
      path: ''
    },
    {
      label: "Completed",
      count: 112,
      icon: <RiCheckboxCircleLine />,
      color: "text-green-600",
      bg: "bg-green-50",
      path: ''
    },
  ];

  if (managerLoading || incomingLoading) {
    <LoadingModal isLoading={true}></LoadingModal>;
  }

  return (
    <div className="px-8 py-5 space-y-8 min-h-screen font-sans">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[2px] text-gray-400">
            Hub Terminal {managerData?.district}
          </span>
          <h1 className="text-3xl font-black text-secondary mt-1">
            {managerData?.hubName} Hub
          </h1>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all">
            <RiNotification3Line size={20} />
          </button>
          <button className="bg-secondary text-[#CAEB66] px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all">
            <RiQrScanLine size={18} /> Quick Scan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <Link
            to={stat?.path}
            key={i}
            className="bg-white p-6 rounded-tradecen border border-gray-100 hover:border-[#CAEB66] shadow-flat transition-border "
          >
            <div
              className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4`}
            >
              {stat.icon}
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              {stat.label}
            </p>
            <h2 className="text-2xl font-black text-slate-800 mt-1">
              {stat.count}
            </h2>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 shadow-flat rounded-tradecen border border-orange-100 flex items-center justify-between group hover:border-orange-300 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-orange-50 p-3 rounded-2xl text-orange-500">
                  <RiArrowGoBackLine size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Return Requests</h4>
                  <p className="text-[10px] text-gray-400 uppercase font-black">
                    08 Items Pending
                  </p>
                </div>
              </div>
              <div className="text-orange-200 group-hover:text-orange-500 transition-colors">
                ➔
              </div>
            </div>

            <div className="bg-white p-6 shadow-flat rounded-tradecen border border-blue-100 flex items-center justify-between group hover:border-blue-300 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-500">
                  <RiFocus2Line size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">New Pickups</h4>
                  <p className="text-[10px] text-gray-400 uppercase font-black">
                    15 Requests Nearby
                  </p>
                </div>
              </div>
              <div className="text-blue-200 group-hover:text-blue-500 transition-colors">
                ➔
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-tradecen min-h-[70vh] border border-gray-100 shadow-flat">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-secondary text-base tracking-wide flex items-center gap-1">
                <div className="w-[6px] h-5 bg-[#CAEB66] rounded-[20px]"></div>
                Incoming Shipments
              </h3>
              <Link
                to="/dashboard/incoming"
                className="text-[10px] font-black uppercase text-gray-400 hover:text-[#02312A] tracking-widest transition-colors cursor-pointer"
              >
                See All
              </Link>
            </div>

            <div className="space-y-3">
              {incomingData?.map((parcel) => (
                <div
                  key={parcel._id}
                  className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-5 bg-white hover:bg-[#F8F9FA]/60 rounded-[15px] transition-all duration-300 gap-4 group"
                >
                  {/* Left Content Area */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1 w-full">
                    <div className="font-mono font-black text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-[10px] tracking-tighter uppercase group-hover:bg-[#02312A]/5 group-hover:text-[#02312A] transition-all shrink-0">
                      #{parcel.trackingID || "N/A"}
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="text-sm font-black text-[#02312A] tracking-tight truncate">
                          {parcel.parcelName}
                        </p>

                        {parcel.serviceCenters && (
                          <span className="text-[9px] font-black bg-gray-50 text-gray-500 border border-gray-200/60 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {parcel.serviceCenters.origin} →{" "}
                            {parcel.serviceCenters.destination}
                          </span>
                        )}
                      </div>

                      <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wide flex flex-wrap items-center gap-y-1">
                        Merchant:{" "}
                        <span className="text-gray-600 font-black ml-0.5">
                          {parcel.senderInfo?.name || "Unknown"}
                        </span>
                        <span className="mx-1.5 text-gray-300">•</span>
                        Weight:{" "}
                        <span className="text-gray-600 font-black ml-0.5">
                          {parcel.parcelWeight || 0}kg
                        </span>
                        <span className="mx-1.5 text-gray-300">•</span>
                        {parcel.revMethod === "COD" && (
                          <>
                            COD:{" "}
                            <span className="text-amber-600 font-black ml-0.5">
                              ৳{parcel.codAmount}
                            </span>
                            <span className="mx-1.5 text-gray-300">•</span>
                          </>
                        )}
                        <span className="text-[#02312A] font-black bg-[#CAEB66]/10 border border-[#CAEB66]/20 px-1.5 py-0.5 rounded-md text-[9px]">
                          {parcel.parcelType || "Standard"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="w-full lg:w-auto border-t lg:border-t-0 border-gray-50 pt-3 lg:pt-0 shrink-0">
                    <div className="text-right">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                        Booked At
                      </p>
                      <p className="text-[10px] font-black text-gray-500 mt-0.5">
                        {parcel.createdAt
                          ? new Date(parcel.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Just Now"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {(!incomingData || incomingData.length === 0) && (
                <div className="py-12 text-center border border-dashed border-gray-100 rounded-[20px]">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                    No incoming shipments for today
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-secondary p-8 rounded-tradecen text-white shadow-flat relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[2px]">
                Total Hand Cash
              </p>
              <h2 className="text-4xl font-black mt-2">৳ 45,670</h2>
              <div className="h-[1px] w-full bg-white/10 my-6"></div>
              <button className="w-full py-4 bg-[#CAEB66] text-[#002B36] rounded-2xl text-[11px] font-black uppercase tracking-wider hover:scale-[1.02] transition-transform cursor-pointer">
                Deposit to HQ
              </button>
            </div>
            <RiWallet3Line className="absolute -bottom-4 -right-4 text-white/5 size-32 rotate-12" />
          </div>

          <div className="bg-white p-6 rounded-tradecen border border-gray-100 shadow-flat">
            <div className="flex items-center gap-2 mb-6">
              <RiTimeLine className="text-blue-500" />
              <h3 className="font-black text-slate-800 text-sm">
                Aging Status
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-3 bg-green-50 rounded-[15px] border-green-100">
                <span className="text-[9px] font-black text-green-600 block">
                  24H
                </span>
                <span className="text-lg font-black text-green-800">85</span>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-[15px] border border-yellow-100">
                <span className="text-[9px] font-black text-yellow-600 block">
                  48H
                </span>
                <span className="text-lg font-black text-yellow-800">12</span>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-[15px] border border-red-100">
                <span className="text-[9px] font-black text-red-600 block">
                  72H+
                </span>
                <span className="text-lg font-black text-red-800">04</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-tradecen border border-gray-50 shadow-flat">
            <h3 className="font-black text-slate-800 mb-6 text-sm">
              On-Duty Riders
            </h3>
            <div className="space-y-6">
              {[
                {
                  name: "Sabbir",
                  status: "Busy",
                  count: 12,
                  color: "text-orange-500",
                },
                {
                  name: "Rakib",
                  status: "Idle",
                  count: 0,
                  color: "text-green-500",
                },
              ].map((rider, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-2xl border border-gray-100 flex items-center justify-center font-bold text-xs">
                      {rider.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-700">
                        {rider.name}
                      </p>
                      <p
                        className={`text-[9px] font-black uppercase ${rider.color}`}
                      >
                        {rider.status}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xs text-slate-800">
                      {rider.count}
                    </p>
                    <p className="text-[8px] uppercase font-bold text-gray-300">
                      Jobs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-tradecen border border-gray-100 shadow-flat">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-black text-[#02312A] text-sm tracking-tight flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CAEB66] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CAEB66]"></span>
              </span>
              Hub Efficiency Flow
            </h3>
            <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-wider">
              Live Logistics Metrics
            </p>
          </div>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
            ZapShift Engine
          </p>
        </div>

        <div className="h-3.5 w-full bg-gray-100/70 rounded-full overflow-hidden flex shadow-inner">
          <div
            title="Incoming / Sorting — 30%"
            className="h-full bg-[#02312A]/30 border-r border-white/40 transition-all duration-500 hover:opacity-90 cursor-pointer"
            style={{ width: "30%" }}
          ></div>
          <div
            title="In Transit / Dispatch — 45%"
            className="h-full bg-[#02312A] border-r border-white/40 transition-all duration-500 hover:opacity-90 cursor-pointer"
            style={{ width: "45%" }}
          ></div>
          <div
            title="Successfully Delivered — 25%"
            className="h-full bg-[#CAEB66] transition-all duration-500 hover:opacity-90 cursor-pointer"
            style={{ width: "25%" }}
          ></div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-gray-50">
          {/* Sorting Metric */}
          <div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[#02312A]/30 shrink-0"></span>
              <span className="text-[9px] font-black uppercase tracking-wider truncate">
                Sorting
              </span>
            </div>
            <p className="text-sm font-black text-[#02312A] mt-0.5">30%</p>
          </div>

          {/* Dispatch Metric */}
          <div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[#02312A] shrink-0"></span>
              <span className="text-[9px] font-black uppercase tracking-wider truncate">
                Transit
              </span>
            </div>
            <p className="text-sm font-black text-[#02312A] mt-0.5">45%</p>
          </div>

          {/* Delivered Metric */}
          <div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[#CAEB66] shrink-0"></span>
              <span className="text-[9px] font-black uppercase tracking-wider truncate">
                Delivered
              </span>
            </div>
            <p className="text-sm font-black text-[#02312A] mt-0.5">25%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubmanagerDashboard;
