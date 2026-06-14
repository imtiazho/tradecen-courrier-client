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
import { RiEBikeLine } from "react-icons/ri";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingModal from "../LoadingModal/LoadingModal";
import DynamicTitle from "../DynamicTitle/DynamicTitle";

const AdminState = () => {
  const axiosSecure = useAxiosSecure();

  const { data: adminStats = {}, isLoading } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/master-admin/main-dashboard");
      return res.data;
    },
  });

  const metrics = adminStats?.metrics || {};
  const pipeline = adminStats?.pipeline || {};
  const recentParcels = adminStats?.recentParcels || {};

  if (isLoading) {
    return <LoadingModal isLoading={true}></LoadingModal>;
  }

  return (
    <div className="w-full min-h-screen bg-[#ffffff] rounded-tradecen shadow-flat p-4 md:p-8 font-sans">
      <DynamicTitle title="Admin Dashboard" />
      <div className="mb-7 border-b border-gray-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#02312A] tracking-tight uppercase">
            System Executive Overview
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Real-time monitoring of entire system logistics, platform liquidity,
            and core operational velocity.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl text-[11px] font-black text-gray-600 uppercase tracking-wider w-fit">
          Live System Analytics
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
        <div className="bg-[#02312A] p-6 rounded-2xl text-white relative overflow-hidden group flex flex-col justify-between border border-[#02312A] shadow-lg shadow-[#02312A]/10 min-h-[140px]">
          <DollarSign className="absolute -right-4 -bottom-4 text-white/5 size-24 pointer-events-none" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-[#CAEB66] mb-1">
              Total Platform Revenue
            </p>
            <h3 className="text-3xl font-black tracking-tight">
              ৳ {metrics?.totalRevenue.toLocaleString()}
            </h3>
          </div>
          <p className="text-[#CAEB66] text-[10px] font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> System usage commissions
          </p>
        </div>

        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-flat relative overflow-hidden group flex flex-col justify-between min-h-[140px]">
          <Package className="absolute -right-4 -bottom-4 text-gray-50 size-24 pointer-events-none" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">
              Total Parcels Managed
            </p>
            <h3 className="text-3xl font-black text-[#02312A] tracking-tight">
              {metrics?.totalParcels.toLocaleString()}{" "}
              <span className="text-xs text-gray-400 font-bold">Pcs</span>
            </h3>
          </div>
          <p className="text-gray-400 text-[10px] font-bold mt-2">
            ● Direct merchant shipments
          </p>
        </div>

        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-flat relative overflow-hidden group flex flex-col justify-between min-h-[140px]">
          <Building2 className="absolute -right-4 -bottom-4 text-gray-50 size-24 pointer-events-none" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">
              Active B2B Merchants
            </p>
            <h3 className="text-3xl font-black text-[#02312A] tracking-tight">
              {metrics?.totalMerchants}{" "}
              <span className="text-xs text-gray-400 font-bold">Merchants</span>
            </h3>
          </div>
          <p className="text-emerald-600 text-[10px] font-bold mt-2">
            ● 100% Verified Corporate NID
          </p>
        </div>

        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-flat relative overflow-hidden group flex flex-col justify-between min-h-[140px]">
          <RiEBikeLine className="absolute -right-4 -bottom-4 text-gray-50 size-24 pointer-events-none" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">
              On-Field Riders
            </p>
            <h3 className="text-3xl font-black text-[#02312A] tracking-tight">
              {metrics?.activeRiders}{" "}
              <span className="text-xs text-gray-400 font-bold">Agents</span>
            </h3>
          </div>
          <p className="text-amber-600 text-[10px] font-bold mt-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>{" "}
            Active sessions live
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">
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
                {pipeline?.pendingPickUpAndDeliveryCount} Parcels
              </h5>
            </div>

            <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl">
              <span className="text-[9px] font-black text-blue-800 uppercase block tracking-wider">
                In-Transit / Picked
              </span>
              <h5 className="text-2xl font-black text-blue-900 mt-1">
                {pipeline?.inTransitAndPickedCount} Parcels
              </h5>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-xl">
              <span className="text-[9px] font-black text-emerald-800 uppercase block tracking-wider">
                Dispatched Successfully
              </span>
              <h5 className="text-2xl font-black text-emerald-900 mt-1">
                {pipeline?.dispatchCount} Pcs
              </h5>
            </div>
          </div>
        </div>

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
              ৳ {metrics?.codInTransit.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

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
                        parcel?.deliveryStatus === "delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : parcel.status === "picked-up"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {parcel?.deliveryStatus}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-500 mt-0.5">
                    Merchant:{" "}
                    <span className="text-gray-700 font-black">
                      {parcel.senderInfo?.name}
                    </span>{" "}
                    → Recipient: {parcel.receiverInfo?.name}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-xs font-black text-gray-900 block">
                  ৳ {parcel?.codAmount.toLocaleString()}
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

export default AdminState;
