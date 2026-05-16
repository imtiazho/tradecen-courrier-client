import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaBarcode,
  FaBoxOpen,
  FaPhoneAlt,
  FaTruckMoving,
  FaMapMarkerAlt,
  FaTruckLoading,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";

const InTransitParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: inTransitParcels = [], isLoading } = useQuery({
    queryKey: ["inTransitParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/status/${user.email}?status=in-transit`,
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingModal isLoading={isLoading} />;
  console.log(inTransitParcels);
  return (
    <div className="p-4 bg-[#F8FAFC] shadow-[0_2px_5px_rgba(0,0,0,0.01)] min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            In-Transit Shipments
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Parcels are moving through our logistics network.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#CAEB66] text-slate-900 px-5 py-3 rounded-2xl border border-slate-200 shadow-[0_2px_5px_rgba(0,0,0,0.01)]">
          <FaTruckMoving className="text-slate-900" />
          <span className="text-sm font-bold">
            Total Moving: {inTransitParcels.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                  Shipment Info
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                  Transport Method
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                  Delivery Charge
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {inTransitParcels.map((parcel) => (
                <tr
                  key={parcel._id}
                  className="group hover:bg-slate-50/80 transition-all duration-200"
                >
                  {/* Shipment Info */}
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FaBarcode className="text-blue-400 text-xs" />
                        <span className="font-mono font-bold text-blue-600 tracking-tighter text-sm uppercase">
                          {parcel.trackingID}
                        </span>
                      </div>
                      <p className="font-bold text-slate-700 text-sm">
                        {parcel.parcelName}
                      </p>
                    </div>
                  </td>

                  {/* Transport Method */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                        <FaTruckLoading size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          Main Trunk Line
                        </p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Secured Cargo
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Payment Status */}
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-1 rounded-md w-fit ${
                          parcel.deliveryChargeStatus === "paid"
                            ? "bg-green-50 text-green-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {parcel.deliveryChargeStatus}
                      </span>
                      <span className="text-xs font-bold mt-1 text-slate-900">
                        ৳{parcel.deliveryCharge}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <p className="text-xs font-bold mt-1 text-slate-900">
                      {parcel.revMethod === "COD" ? parcel.codAmount : 0} (BDT)
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InTransitParcel;
