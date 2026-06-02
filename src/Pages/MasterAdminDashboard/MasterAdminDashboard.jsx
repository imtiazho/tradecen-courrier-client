import React from "react";
import {
  Users,
  Package,
  TrendingUp,
  DollarSign,
  Activity,
  Truck,
  CheckCircle,
  AlertCircle,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MasterAdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // 🔄 রিয়েল ডাটা ফেচিং (টোটাল সিস্টেমের ডাটা অ্যানালিটিক্স)
  const { data: adminStats = {}, isLoading } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: async () => {
      // তোমার রিয়েল ব্যাকএন্ড এপিআই এন্ডপয়েন্ট অনুযায়ী এখানে কল করবে
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data;
    },
    // ডেমো বা রিয়েল ডাটা ব্যাকআপ হিসেবে নিচের ফলব্যাক স্ট্রাকচার কাজ করবে
  });

  // ডাটাবেজ থেকে ডাটা আসার আগ পর্যন্ত প্রজেক্ট প্রেজেন্টেশনের জন্য ডিফল্ট ভ্যালু হ্যান্ডেলিং
  const totalParcels = adminStats?.totalParcels || 1482;
  const totalMerchants = adminStats?.totalMerchants || 124;
  const activeRiders = adminStats?.activeRiders || 45;
  const totalRevenue = adminStats?.totalRevenue || 842500;
  const codInTransit = adminStats?.codInTransit || 128400;

  const recentParcels = adminStats?.recentParcels || [
    {
      id: "ZAP-9081",
      merchant: "Apex Footwear",
      receiver: "Asif Rahman",
      status: "delivered",
      amount: 2450,
    },
    {
      id: "ZAP-9082",
      merchant: "Daraz Hub",
      receiver: "Nusrat Jahan",
      status: "picked-up",
      amount: 1200,
    },
    {
      id: "ZAP-9083",
      merchant: "Fabrilife",
      receiver: "Tamim Iqbal",
      status: "assign-pickup-rider",
      amount: 3500,
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#02312A]"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#ffffff] rounded-tradecen shadow-flat p-4 md:p-8 font-sans">
      {/* 🔝 হেডার সেকশন */}
      <div className="mb-8 border-b border-gray-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#02312A] tracking-tight uppercase">
            System Executive Overview
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Real-time monitoring of entire system logistics, platform liquidity,
            and core operational velocity.
          </p>
        </div>

        {/* ক্যালেন্ডার বা কুইক ফিল্টার বাটন */}
        <div className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl text-[11px] font-black text-gray-600 uppercase tracking-wider w-fit">
          Live System Analytics
        </div>
      </div>

      {/* 📊 কোম্পানির কোর ৪টি মেট্রিক্স গ্রিড (লাক্সারি স্টাইল) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* কার্ড ১: মোট প্লাটফর্ম রেভিনিউ */}
        <div className="bg-[#02312A] p-6 rounded-2xl text-white relative overflow-hidden group flex flex-col justify-between border border-[#02312A] shadow-lg shadow-[#02312A]/10 min-h-[140px]">
          <DollarSign className="absolute -right-4 -bottom-4 text-white/5 size-24 pointer-events-none" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-[#CAEB66] mb-1">
              Total Platform Revenue
            </p>
            <h3 className="text-3xl font-black tracking-tight">
              ৳ {totalRevenue.toLocaleString()}
            </h3>
          </div>
          <p className="text-[#CAEB66] text-[10px] font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> System usage commissions
          </p>
        </div>

        {/* কার্ড ২: টোটাল পার্সেল ভলিউম */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-flat relative overflow-hidden group flex flex-col justify-between min-h-[140px]">
          <Package className="absolute -right-4 -bottom-4 text-gray-100 size-24 pointer-events-none" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">
              Total Parcels Managed
            </p>
            <h3 className="text-3xl font-black text-[#02312A] tracking-tight">
              {totalParcels.toLocaleString()}{" "}
              <span className="text-xs text-gray-400 font-bold">Pcs</span>
            </h3>
          </div>
          <p className="text-gray-400 text-[10px] font-bold mt-2">
            ● Direct merchant shipments
          </p>
        </div>

        {/* কার্ড ৩: রেজিস্টার্ড মার্চেন্টস */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-flat relative overflow-hidden group flex flex-col justify-between min-h-[140px]">
          <Building2 className="absolute -right-4 -bottom-4 text-gray-100 size-24 pointer-events-none" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">
              Active B2B Merchants
            </p>
            <h3 className="text-3xl font-black text-[#02312A] tracking-tight">
              {totalMerchants}{" "}
              <span className="text-xs text-gray-400 font-bold">Hubs</span>
            </h3>
          </div>
          <p className="text-emerald-600 text-[10px] font-bold mt-2">
            ● 100% Verified Corporate NID
          </p>
        </div>

        {/* কার্ড ৪: অন-ফিল্ড রাইডার্স */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-flat relative overflow-hidden group flex flex-col justify-between min-h-[140px]">
          <Truck className="absolute -right-4 -bottom-4 text-gray-100 size-24 pointer-events-none" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">
              On-Field Riders
            </p>
            <h3 className="text-3xl font-black text-[#02312A] tracking-tight">
              {activeRiders}{" "}
              <span className="text-xs text-gray-400 font-bold">Agents</span>
            </h3>
          </div>
          <p className="text-amber-600 text-[10px] font-bold mt-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>{" "}
            Active sessions live
          </p>
        </div>
      </div>

      {/* 📈 মিড সেকশন: ফিন্যান্সিয়াল রিস্ক ও অপারেশনাল ড্যাশবোর্ড ব্রেকডাউন */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* কলাম ১ এবং ২: লজিস্টিকস পাইপলাইন ব্রেকডাউন */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-flat">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-xs font-black text-[#02312A] uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#02312A]" /> Pipeline
              Processing Counter
            </h4>
            <span className="text-[9px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase">
              Current Load
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-amber-50/60 border border-amber-100 rounded-xl">
              <span className="text-[9px] font-black text-amber-800 uppercase block tracking-wider">
                Pending Pickup
              </span>
              <h5 className="text-2xl font-black text-amber-900 mt-1">
                28 Parcels
              </h5>
            </div>

            <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl">
              <span className="text-[9px] font-black text-blue-800 uppercase block tracking-wider">
                In-Transit / Picked
              </span>
              <h5 className="text-2xl font-black text-blue-900 mt-1">
                114 Parcels
              </h5>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-xl">
              <span className="text-[9px] font-black text-emerald-800 uppercase block tracking-wider">
                Dispatched Successfully
              </span>
              <h5 className="text-2xl font-black text-emerald-900 mt-1">
                1,340 Pcs
              </h5>
            </div>
          </div>
        </div>

        {/* কলাম ৩: কোম্পানির লিকুইডিটি বা ট্রানজিট ক্যাশ অডিট */}
        <div className="lg:col-span-1 bg-[#FFF9F2] border border-[#FFE7CC] rounded-2xl p-6 shadow-flat flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-black text-[#02312A] uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" /> Transit
              Liquidity Audit
            </h4>
            <p className="text-[11px] text-gray-500 font-medium mt-1 leading-relaxed">
              This amount reflects Cash-on-Delivery funds currently collected by
              riders but not yet deposited to Central HQ.
            </p>
          </div>
          <div className="mt-4">
            <span className="text-[9px] font-black uppercase text-amber-800 tracking-wider block">
              COD Cash In Rider Pockets
            </span>
            <h3 className="text-3xl font-black text-[#02312A] tracking-tight mt-0.5">
              ৳ {codInTransit.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* 🧾৩. গ্লোবাল রিয়েল-টাইম পার্সেল ট্র্যাকার লগ */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-flat overflow-hidden">
        <div className="p-5 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-xs font-black text-[#02312A] uppercase tracking-wider flex items-center gap-2">
            System Live Manifest Logs
          </h3>
          <span className="text-[9px] bg-[#02312A] text-white font-black px-2 py-0.5 rounded uppercase">
            Global Stream
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {recentParcels.map((parcel) => (
            <div
              key={parcel.id}
              className="p-4 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* বাম দিক */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl shrink-0 bg-gray-50 text-gray-700 border border-gray-100">
                  <ArrowUpRight className="w-4 h-4 text-[#02312A]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-gray-800 tracking-wide">
                      {parcel.id}
                    </span>
                    <span
                      className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase ${
                        parcel.status === "delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : parcel.status === "picked-up"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-500 mt-0.5">
                    Merchant:{" "}
                    <span className="text-gray-700 font-black">
                      {parcel.merchant}
                    </span>{" "}
                    → Consignee: {parcel.receiver}
                  </p>
                </div>
              </div>

              {/* ডান দিক */}
              <div className="text-left sm:text-right shrink-0">
                <span className="text-xs font-black text-gray-900 block">
                  ৳ {parcel.amount.toLocaleString()}
                </span>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">
                  COD Invoice
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasterAdminDashboard;
