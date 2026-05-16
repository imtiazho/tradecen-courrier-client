import React from "react";
import {
  FaBarcode,
  FaBoxOpen,
  FaCreditCard,
  FaRegEdit,
  FaTrashAlt,
  FaTruckMoving,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Delivered = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: deliveredParcels = [], isLoading } = useQuery({
    queryKey: ["deliveredParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/status/${user.email}?status=delivered`,
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingModal isLoading={isLoading} />;

  return (
    <div className="p-4 bg-[#F8FAFC] min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Delivered Parcels
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            All your delivered parcels here!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#CAEB66] text-slate-900 px-5 py-3 rounded-2xl border border-slate-200 shadow-[0_2px_5px_rgba(0,0,0,0.01)]">
          <FaTruckMoving className="text-slate-900" />
          <span className="text-sm font-bold">
            Delivered: {deliveredParcels?.length}
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[15px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                  Tracking ID
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                  Parcel Name
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                  Charge
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {deliveredParcels.map((parcel) => (
                <tr
                  key={parcel._id}
                  className="group hover:bg-slate-50/80 transition-all duration-200"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <FaBarcode className="text-indigo-400 text-xs" />
                      <span className="font-mono font-bold text-indigo-600 tracking-tighter text-sm">
                        {parcel.trackingID}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <FaBoxOpen size={18} />
                      </div>
                      <span className="font-semibold text-slate-700 text-sm">
                        {parcel.parcelName}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1 font-black text-slate-900">
                      <span className="text-xs text-slate-400">৳</span>
                      {parcel.codAmount}
                    </div>
                  </td>

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {deliveredParcels.length === 0 && (
          <div className="py-24 text-center">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBoxOpen size={24} className="text-slate-300" />
            </div>
            <h3 className="text-slate-900 font-bold">All settled!</h3>
            <p className="text-slate-400 text-sm">No delivered parcel found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Delivered;
