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

const HubmanagerDashboard = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const { isLoading: managerLoading, data: managerData = {} } = useQuery({
    queryKey: ["managerData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/hub-managers/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log(managerData);
  const stats = [
    {
      label: "Incoming",
      count: 45,
      icon: <RiUserReceivedLine />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Out for Delivery",
      count: 28,
      icon: <RiTruckLine />,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Completed",
      count: 112,
      icon: <RiCheckboxCircleLine />,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Pending COD",
      count: "৳ 12.5k",
      icon: <RiWallet3Line />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#F9FAFB] min-h-screen font-sans">
      {/* --- ১. স্মার্ট হেডার (Minimal) --- */}
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[2px] text-gray-400">
            Hub Terminal DN-01
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-1">
            Dhaka North
          </h1>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all">
            <RiNotification3Line size={20} />
          </button>
          <button className="bg-[#002B36] text-[#CAEB66] px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all">
            <RiQrScanLine size={18} /> Quick Scan
          </button>
        </div>
      </div>

      {/* --- ২. কী-মেট্রিক্স (Clean & Minimal) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
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
          </div>
        ))}
      </div>

      {/* --- ৩. মেইন অপারেশনাল এরিয়া (Grid Layout) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* বাম পাশ: রিসেন্ট পার্সেল এবং কুইক শর্টকাট (8 Columns) */}
        <div className="lg:col-span-8 space-y-8">
          {/* কুইক অ্যাকশন কার্ডস (Small & Sleek) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[30px] border border-orange-100 flex items-center justify-between group hover:border-orange-300 transition-all cursor-pointer">
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

            <div className="bg-white p-6 rounded-[30px] border border-blue-100 flex items-center justify-between group hover:border-blue-300 transition-all cursor-pointer">
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

          {/* পার্সেল লিস্ট (Clean Table Style) */}
          <div className="bg-white p-8 rounded-[35px] border border-gray-50 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-slate-800 tracking-tight flex items-center gap-2">
                <div className="w-2 h-6 bg-[#CAEB66] rounded-full"></div>{" "}
                Incoming Shipments
              </h3>
              <button className="text-[11px] font-black uppercase text-blue-600 tracking-widest">
                See All
              </button>
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-5 bg-white border border-gray-50 rounded-[25px] hover:shadow-sm transition-all"
                >
                  <div className="flex gap-4 items-center">
                    <div className="text-[10px] font-black text-gray-300">
                      #ZP-10{24 + i}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">
                        Ariful Islam
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Weight: 2.5kg •{" "}
                        <span className="text-blue-500 font-bold">
                          Standard
                        </span>
                      </p>
                    </div>
                  </div>
                  <button className="bg-[#F3F4F6] px-5 py-2.5 rounded-xl text-[10px] font-black uppercase text-slate-600 hover:bg-[#CAEB66] hover:text-[#002B36] transition-all">
                    Assign
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ডান পাশ: রাইডার এবং মানি ট্যাকার (4 Columns) */}
        <div className="lg:col-span-4 space-y-8">
          {/* ক্যাশ বোর্ড (Minimalist Dark Card) */}
          <div className="bg-[#002B36] p-8 rounded-[35px] text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[2px]">
                Total Hand Cash
              </p>
              <h2 className="text-4xl font-black mt-2">৳ 45,670</h2>
              <div className="h-[1px] w-full bg-white/10 my-6"></div>
              <button className="w-full py-4 bg-[#CAEB66] text-[#002B36] rounded-2xl text-[11px] font-black uppercase tracking-wider hover:scale-[1.02] transition-transform">
                Deposit to HQ
              </button>
            </div>
            <RiWallet3Line className="absolute -bottom-4 -right-4 text-white/5 size-32 rotate-12" />
          </div>

          {/* ইনভেন্টরি এজিং (Action Oriented) */}
          <div className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <RiTimeLine className="text-blue-500" />
              <h3 className="font-black text-slate-800 text-sm">
                Aging Status
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-3 bg-green-50 rounded-2xl">
                <span className="text-[9px] font-black text-green-600 block">
                  24H
                </span>
                <span className="text-lg font-black text-green-800">85</span>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-2xl border border-yellow-100">
                <span className="text-[9px] font-black text-yellow-600 block">
                  48H
                </span>
                <span className="text-lg font-black text-yellow-800">12</span>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-2xl border border-red-100">
                <span className="text-[9px] font-black text-red-600 block">
                  72H+
                </span>
                <span className="text-lg font-black text-red-800">04</span>
              </div>
            </div>
          </div>

          {/* রাইডার সেকশন */}
          <div className="bg-white p-8 rounded-[35px] border border-gray-50 shadow-sm">
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

      {/* --- ৪. বটম চার্ট (Optional but Looks Cool) --- */}
      <div className="bg-white p-8 rounded-[35px] border border-gray-50 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-slate-800 text-sm italic">
            Hub Efficiency Flow
          </h3>
          <p className="text-[10px] font-bold text-gray-400">
            Real-time data from ZapShift Engine
          </p>
        </div>
        <div className="flex items-center gap-1.5 h-2 w-full bg-gray-50 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: "30%" }}
          ></div>
          <div
            className="h-full bg-orange-500 rounded-full"
            style={{ width: "45%" }}
          ></div>
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: "25%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HubmanagerDashboard;
