import React from "react";
import {
  TrendingUp,
  DollarSign,
  PackageCheck,
  Calendar,
  ArrowUpRight,
  User,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import FinanceAlert from "../FinanceAlert/FinanceAlert";
import DynamicTitle from "../../Components/DynamicTitle/DynamicTitle";

const RiderMyEarning = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isLoading: riderLoading,
    data: riderAllData = {},
    refetch,
  } = useQuery({
    queryKey: ["riderAllData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/${user.email}`);
      return Array.isArray(res.data) && res.data.length > 0
        ? res.data[0]
        : res.data;
    },
    
    enabled: !!user && !!user?.accessToken,
  });

  const allHandledParcels = riderAllData?.allHandledParcels || [];
  const todaysHandledParcels = riderAllData?.todaysParcels || [];

  const RIDER_FEE_PER_PARCEL = 30;

  const todaysEarning = todaysHandledParcels.length * RIDER_FEE_PER_PARCEL;
  const totalEarnings = allHandledParcels.length * RIDER_FEE_PER_PARCEL;

  if (riderLoading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#02312A]"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#ffffff] rounded-tradecen shadow-flat p-4 md:p-8 font-sans">
      <DynamicTitle title="Dashboard | My Earnings" />
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#02312A] tracking-tight uppercase">
          My Earnings & Commission
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-1">
          Track your delivery performance, payouts, and completed trip rewards.
        </p>
      </div>

      {/* <FinanceAlert></FinanceAlert> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#02312A] p-8 rounded-2xl text-white relative overflow-hidden group flex flex-col justify-between border border-[#02312A] shadow-lg shadow-[#02312A]/10 min-h-[160px]">
          <DollarSign className="absolute -right-4 -bottom-4 text-white/5 size-28 pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-[#CAEB66] mb-2">
              Total Earnings
            </p>
            <h3 className="text-4xl font-black tracking-tight">
              ৳ {totalEarnings.toLocaleString()}
            </h3>
          </div>
          <div className="mt-4 pt-2 border-t border-white/10">
            <p className="text-[#CAEB66]/80 text-[11px] font-black uppercase tracking-wider">
              ● Based on ৳{RIDER_FEE_PER_PARCEL} per delivery
            </p>
          </div>
        </div>

        <div className="bg-[#FFF9F2] p-8 rounded-2xl border border-[#FFE7CC] relative overflow-hidden group flex flex-col justify-between min-h-[160px] shadow-flat">
          <Calendar className="absolute -right-4 -bottom-4 text-[#D35400]/5 size-28 pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-[#D35400] mb-2">
              Todays Earnings
            </p>
            <h3 className="text-4xl font-black text-[#02312A] tracking-tight">
              ৳ {todaysEarning.toLocaleString()}
            </h3>
          </div>
          <div className="mt-4">
            <p className="text-[#D35400] text-[11px] font-black inline-flex items-center gap-1.5 uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" /> Updated live
            </p>
          </div>
        </div>

        <div className="bg-[#F4F9F4] p-8 rounded-2xl border border-[#E2EFE2] relative overflow-hidden group flex flex-col justify-between min-h-[160px] shadow-flat">
          <PackageCheck className="absolute -right-4 -bottom-4 text-green-600/5 size-28 pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-green-700 mb-2">
              Successful Handled
            </p>
            <h3 className="text-4xl font-black text-[#02312A] tracking-wide">
              {allHandledParcels.length}{" "}
              <span className="text-lg text-gray-400 font-bold">Trips</span>
            </h3>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              100% completion rate
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-tradecen overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xs font-black text-[#02312A] uppercase tracking-wider">
            Earnings Breakdown per Delivery
          </h2>
          <span className="text-[10px] bg-gray-100 text-gray-600 font-black px-2 py-0.5 rounded uppercase">
            Live Logs
          </span>
        </div>

        <div>
          {allHandledParcels?.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-400 font-medium">
              No delivered parcels found to compute earnings.
            </div>
          ) : (
            allHandledParcels?.map((parcel) => (
              <div
                key={parcel._id}
                className="p-4 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-tradecen"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl shrink-0 bg-gray-50 text-gray-700 border border-gray-100">
                    <ArrowUpRight className="w-5 h-5 text-[#02312A]" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-gray-800 tracking-wide">
                        {parcel.trackingID}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-500 capitalize">
                      {parcel.parcelName} ({parcel.parcelWeight} kg)
                    </p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] text-gray-400 font-medium">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> To:{" "}
                        {parcel.receiverInfo?.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Hub:{" "}
                        {parcel.serviceCenters?.destination}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-between sm:items-end justify-between shrink-0 text-right">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block">
                      {parcel.deliveredAt
                        ? new Date(parcel.deliveredAt).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          })
                        : "Recent"}
                    </span>
                    <span className="text-sm font-black text-emerald-600">
                      +৳{RIDER_FEE_PER_PARCEL}
                    </span>
                  </div>

                  <div className="mt-1">
                    <span className="text-[9px] font-extrabold px-2 py-0.5 text-gray-500 rounded block sm:inline-block">
                      COD : ৳{parcel.codAmount}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderMyEarning;
