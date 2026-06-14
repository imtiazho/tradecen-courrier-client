import React, { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Wallet,
  DollarSign,
  ArrowDownLeft,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  History,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import DynamicTitle from "../../Components/DynamicTitle/DynamicTitle";

const ProfileWallet = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isRequesting, setIsRequesting] = useState(false);

  const { isLoading, data: riderAllData = {} } = useQuery({
    queryKey: ["riderAllData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/${user.email}`);
      return Array.isArray(res.data) && res.data?.length > 0
        ? res.data[0]
        : res.data;
    },

    enabled: !!user && !!user?.accessToken,
  });

  const riderData = riderAllData.riderData || {};
  const deliveredParcels = riderAllData?.deliveredParcels || [];
  const pickedUpParcels = riderAllData?.pickedUpParcels || [];

  const cashInHand = deliveredParcels.reduce((acc, curr) => {
    if (curr.revMethod === "COD" && !curr.isDepositedToHQ) {
      return acc + (curr.codAmount || 0);
    }
    return acc;
  }, 0);
  const RIDER_PICKUP_FEE = 15;
  const RIDER_DELIVERY_FEE = 30;
  const earnedBalance =
    pickedUpParcels?.length * RIDER_PICKUP_FEE +
    deliveredParcels?.length * RIDER_DELIVERY_FEE;

  const totalEarnings = riderAllData?.allHandledParcels?.length * 30;

  if (isLoading) {
    return <LoadingModal isLoading={true}></LoadingModal>;
  }

  return (
    <div className="w-full min-h-screen bg-[#ffffff] rounded-tradecen shadow-flat p-4 md:p-8 font-sans space-y-6">
      <DynamicTitle title="Dashboard | Profit & Wallet" />
      {/* ----------------- PAGE HEADER ----------------- */}
      <div className="border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-black text-[#02312A] tracking-tight uppercase">
          Profile & Strategic Wallet
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-1">
          Manage your field credentials, audit hand-to-hand corporate cash, and
          monitor pay-outs.
        </p>
      </div>

      {/* ----------------- ROW 1: NEW TOP NAME CARD (Full Width Corporate Pass) ----------------- */}
      <div className="bg-[#FFF9F2] border border-[#FFE7CC] p-6 rounded-2xl shadow-flat flex flex-col lg:flex-row justify-between items-center gap-6 relative overflow-hidden">
        {/* Left Side: Photo & Identity details */}
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5 w-full lg:w-auto">
          {/* Avatar */}
          <div className="flex-shrink-0 w-24 h-24 bg-[#02312A] text-[#CAEB66] rounded-full flex items-center justify-center font-black text-2xl uppercase shadow-md border-4 border-white overflow-hidden">
            <img
              src={riderData?.photoURL}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Core Credentials */}
          <div className="space-y-2">
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl font-black text-[#02312A] uppercase tracking-tight">
                  {riderData?.name || "Rider Name"}
                </h3>
                <span className="text-[9px] bg-[#02312A] text-white font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  Agent
                </span>
              </div>
              <p className="text-[11px] text-amber-800 font-bold uppercase mt-0.5 tracking-wide">
                Field Logistics Specialist
              </p>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs font-bold text-gray-600 pt-1 border-t border-amber-200/40">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-700/70" />
                <span>
                  ID:{" "}
                  <span className="font-mono text-gray-900 uppercase">
                    #{riderData._id?.slice(18, 24)}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-700/70" />
                <span className="text-gray-900 truncate max-w-[160px] sm:max-w-none">
                  {riderData?.email}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-700/70" />
                <span>
                  Hub: <span className="text-gray-900">{riderData?.area}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: KYC Status & Embedded Performance Metrics */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-stretch lg:items-end gap-3 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-amber-200/60 pt-4 lg:pt-0 lg:pl-6">
          {/* KYC Status Pin */}
          <div className="flex items-center gap-1.5 bg-emerald-100/90 border border-emerald-200 px-3 py-1 rounded-full self-center lg:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-[9px] text-emerald-800 font-black uppercase tracking-wider">
              KYC Verified Agent
            </span>
          </div>

          {/* Embedded Performance Indices */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="bg-white/80 border border-amber-200/60 px-3 py-2 rounded-xl text-center min-w-[90px]">
              <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-tight">
                Pick Rate
              </span>
              <span className="text-sm font-black text-gray-800">
                {riderAllData?.conversionRate || 0} %
              </span>
            </div>
            <div className="bg-white/80 border border-amber-200/60 px-3 py-2 rounded-xl text-center min-w-[90px]">
              <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-tight">
                Rating
              </span>
              <span className="text-sm font-black text-gray-800">
                {riderData?.rating} / 5.0
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Cash In Hand */}
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-flat relative overflow-hidden group flex flex-col justify-between min-h-[140px]">
          <Wallet className="absolute -right-4 -bottom-4 text-gray-100/60 size-24 pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-amber-700 mb-1">
              Cash In Hand (HQ Debt)
            </p>
            <h3 className="text-3xl font-black text-[#02312A] tracking-tight">
              ৳ {riderAllData?.totalCollectedAmount?.toLocaleString()}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-black text-amber-800 bg-amber-50 px-2 py-1 rounded-md mt-4 w-fit relative z-10">
            <Clock className="w-3 h-3" /> Remit to Hub Admin to Clear Debt
          </div>
        </div>

        {/* Card 2: Earned Balance */}
        <div className="bg-[#02312A] p-5 rounded-2xl text-white relative overflow-hidden group flex flex-col justify-between min-h-[140px]">
          <DollarSign className="absolute -right-4 -bottom-4 text-white/5 size-24 pointer-events-none" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-[#CAEB66] mb-1">
              Your Earned Balance
            </p>
            <h3 className="text-3xl font-black tracking-tight">
              ৳ {totalEarnings?.toLocaleString()}
            </h3>
          </div>
          <button
            onClick={() => {
              setIsRequesting(true);
              setTimeout(() => setIsRequesting(false), 1500);
            }}
            className="mt-4 w-full bg-[#CAEB66] text-[#02312A] py-2 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-[#b8d957] disabled:bg-gray-700 disabled:text-gray-400 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-black/10 cursor-pointer relative z-10"
          >
            {isRequesting ? (
              <div className="w-3.5 h-3.5 border-2 border-[#02312A] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <ArrowDownLeft className="w-3.5 h-3.5" /> Request Payout
              </>
            )}
          </button>
        </div>

        {/* Card 3: Logistics Trip Summary */}
        <div className="bg-[#F4F9F4] border border-[#E2EFE2] p-5 rounded-2xl flex flex-col justify-between min-h-[140px] text-xs font-bold text-green-800">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-green-700 mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>{" "}
              Field Metrics Summary
            </p>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center border-b border-green-200/50 pb-1.5">
                <span>Completed Pickups:</span>
                <span className="font-black bg-green-100 px-2 py-0.5 rounded text-green-900 font-mono">
                  {riderAllData?.allPickUpCompleteParcels?.length} Trips
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Completed Deliveries:</span>
                <span className="font-black bg-green-100 px-2 py-0.5 rounded text-green-900 font-mono">
                  {riderAllData?.allDeliveryCompleteParcels?.length} Trips
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- ROW 3: PERSONAL IDENTITY & EMERGENCY PASS (Full Width Grid Split) ----------------- */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-flat p-5 md:p-6 space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-gray-50 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#02312A]" />
            <h4 className="text-xs font-black text-[#02312A] uppercase tracking-wider">
              Personal Identity & Emergency Kit Pass
            </h4>
          </div>
          <span className="text-[9px] bg-emerald-50 text-emerald-800 font-black px-2 py-0.5 rounded-full uppercase border border-emerald-200 tracking-wider">
            Active Roster Status
          </span>
        </div>

        {/* ২ কলামের রেসপনসিভ পার্সোনাল ডিটেইলস গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-gray-600">
          {/* বাম পাশের কলামের তথ্য */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50/70 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-gray-400" />
                <span>Blood Group:</span>
              </div>
              <span className="font-black text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md text-[11px]">
                {riderData?.bloodGroup || "N/A"}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50/70 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <History className="w-3.5 h-3.5 text-gray-400" />
                <span>Joined Date:</span>
              </div>
              <span className="text-gray-900 text-[11px] font-mono">
                {riderData.createdAt
                  ? new Date(riderData.createdAt).toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recent"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50/70 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>Emergency Contact:</span>
              </div>
              <span className="text-gray-900 text-[11px] font-mono">
                {riderData?.phone || "017XXXXXXXX"}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50/70 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-gray-400" />
                <span>Driving License Status:</span>
              </div>
              <span className="text-emerald-800 bg-emerald-50 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border border-emerald-100">
                {riderData?.vehicle === "Cycle"
                  ? "Cycle / No Need"
                  : "Verified"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer text nested smoothly inside */}
        <div className="text-[10px] text-gray-400 font-medium text-center pt-2">
          Secured Corporate Profile — Information Managed by TradeCen Operations
          HQ.
        </div>
      </div>
    </div>
  );
};

export default ProfileWallet;
