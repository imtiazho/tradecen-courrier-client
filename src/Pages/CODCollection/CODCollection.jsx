import React, { useState } from "react";
import {
  Wallet,
  CheckCircle2,
  Package,
  User,
  MapPin,
  TrendingUp,
  Ban,
  AlertTriangle,
} from "lucide-react";
import { FaHandshake } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import FinanceAlert from "../FinanceAlert/FinanceAlert";

const CODCollection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    enabled: !!user?.email,
  });

  const deliveredParcels = riderAllData?.deliveredParcels || [];

  const totalCashInHand = deliveredParcels.reduce((acc, curr) => {
    if (
      curr.deliveryStatus === "delivered" &&
      curr.revMethod === "COD" &&
      !curr.isDepositedToHQ
    ) {
      return acc + curr.codAmount;
    }
    return acc;
  }, 0);

  const codParcelsCount = deliveredParcels.filter(
    (p) => p.revMethod === "COD" && p.deliveryStatus === "delivered",
  ).length;
  const nonCodParcelsCount = deliveredParcels.filter(
    (p) => p.revMethod !== "COD" && p.deliveryStatus === "delivered",
  ).length;

  const handleHubDepositSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-[#ffffff] rounded-tradecen shadow-flat p-4 md:p-8 font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#02312A] tracking-tight uppercase">
          COD Collection Center
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-1">
          Manage collected physical cash, handovers and payment methods.
        </p>
      </div>

      <FinanceAlert></FinanceAlert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#02312A] p-8 rounded-2xl text-white relative overflow-hidden group flex flex-col justify-between border border-[#02312A] shadow-lg shadow-[#02312A]/10 min-h-[220px]">
          <Wallet className="absolute -right-4 -bottom-4 text-white/5 size-28 pointer-events-none group-hover:scale-110 transition-transform duration-500" />

          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-[#CAEB66] mb-2">
              Total Cash In Hand
            </p>
            <h3 className="text-4xl font-black tracking-tight">
              ৳ {totalCashInHand.toLocaleString()}
            </h3>

            <p className="text-[#CAEB66]/80 text-[11px] font-black mt-4 inline-flex items-center gap-1.5 uppercase tracking-wider">
              ● Pending Hub Settlement
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 z-10">
            <button
              onClick={handleHubDepositSubmit}
              disabled={totalCashInHand <= 0 || isSubmitting || submitSuccess}
              className="w-full bg-[#CAEB66] text-[#02312A] py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-[#b8d957] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 shadow-md shadow-[#CAEB66]/10 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Processing..."
              ) : submitSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Submitted to Hub
                </>
              ) : (
                <>
                  <FaHandshake className="w-4 h-4" /> Handover to Hub
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-[#FFF9F2] p-8 rounded-2xl border border-[#FFE7CC] relative overflow-hidden group flex flex-col justify-between min-h-[220px] shadow-flat">
          <Package className="absolute -right-4 -bottom-4 text-[#D35400]/5 size-28 pointer-events-none group-hover:scale-110 transition-transform duration-500" />

          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-[#D35400] mb-2">
              COD Deliveries
            </p>
            <h3 className="text-4xl font-black text-[#02312A] tracking-tight">
              {codParcelsCount}{" "}
              <span className="text-lg text-gray-400 font-bold">Parcels</span>
            </h3>
          </div>

          <div className="mt-auto">
            <p className="text-[#D35400] text-[11px] font-black inline-flex items-center gap-1.5 uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" /> Cash collected from
              doorstep
            </p>
          </div>
        </div>

        <div className="bg-[#F4F9F4] p-8 rounded-2xl border border-[#E2EFE2] relative overflow-hidden group flex flex-col justify-start min-h-[220px] shadow-flat">
          <Ban className="absolute -right-4 -bottom-4 text-green-600/5 size-28 pointer-events-none group-hover:scale-110 transition-transform duration-500" />

          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-green-700 mb-2">
              Non-COD / Prepaid
            </p>
            <h3 className="text-4xl font-black text-[#02312A] tracking-tight">
              {nonCodParcelsCount}{" "}
              <span className="text-lg text-gray-400 font-bold">Parcels</span>
            </h3>
          </div>

          <div className="mt-auto pt-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Zero cash risk, pre-paid channels
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-tradecen shadow-flat overflow-hidden">
        <div className="p-4 border-b border-gray-50">
          <h2 className="text-xs font-black text-[#02312A] uppercase tracking-wider">
            Today's Handover & Collection Summary
          </h2>
        </div>

        <div>
          {deliveredParcels.length > 0 && (
            <div className="divide-y divide-gray-100">
              {deliveredParcels.map((parcel) => (
                <div
                  key={parcel._id}
                  className="p-4 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-tradecen"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2.5 rounded-xl shrink-0 ${
                        parcel.revMethod === "COD"
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : "bg-blue-50 text-blue-700 border border-blue-100"
                      }`}
                    >
                      <Package className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-gray-800 tracking-wide">
                          {parcel.trackingID}
                        </span>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold uppercase ${
                            parcel.revMethod === "COD"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {parcel.revMethod}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-gray-500 capitalize">
                        {parcel.parcelName} ({parcel.parcelWeight} kg)
                      </p>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] text-gray-400 font-medium">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />{" "}
                          {parcel.receiverInfo?.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{" "}
                          {parcel.receiverInfo?.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end justify-between shrink-0 gap-2">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-gray-400 font-bold block">
                        {parcel.deliveredAt
                          ? new Date(parcel.deliveredAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )
                          : "N/A"}
                      </span>
                      <span
                        className={`text-sm font-black ${
                          parcel.revMethod === "COD"
                            ? "text-[#02312A]"
                            : "text-gray-400 line-through"
                        }`}
                      >
                        ৳{parcel.codAmount}
                      </span>
                    </div>

                    <div className="mt-1">
                      {parcel.revMethod === "COD" ? (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                            parcel.isDepositedToHQ
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-orange-50 text-orange-700 border border-orange-100 animate-pulse"
                          }`}
                        >
                          {parcel.isDepositedToHQ
                            ? "● Settled"
                            : "● In Rider Wallet"}
                        </span>
                      ) : (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 bg-gray-50 text-gray-500 border border-gray-200 rounded-md flex items-center gap-1">
                          ● No Cash Collection
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {deliveredParcels.length === 0 && (
            <div className="py-16 text-center bg-[#FFFFFF] rounded-2xl border border-dashed border-gray-200 p-6">
              <div className="bg-[#FFF9F2] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#FFE7CC] text-[#02312A]/40 shadow-inner">
                <Package className="w-6 h-6 text-[#02312A]" />
              </div>
              <h3 className="text-[#02312A] font-black text-sm uppercase tracking-tight">
                No Delivered Parcels Yet
              </h3>
              <p className="text-gray-400 text-[11px] font-bold max-w-[280px] mx-auto mt-1 leading-relaxed">
                Your completed shipments will appear here. Safe travels on the
                road, agent!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CODCollection;
