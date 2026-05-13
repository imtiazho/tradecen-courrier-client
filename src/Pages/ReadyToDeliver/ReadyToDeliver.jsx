import React from "react";
import {
  FaBarcode,
  FaBoxOpen,
  FaCreditCard,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegEdit,
  FaTrashAlt,
  FaTruckLoading,
  FaUserCircle,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";

const ReadyToDeliver = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: readyToDeliverParcels = [], isLoading } = useQuery({
    queryKey: ["inTransitParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/status/${user.email}?status=ready-to-deliver`,
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
            Unpaid Invoices
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Settle your pending delivery charges to keep shipments moving.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#bef264] cursor-pointer text-slate-900 font-bold py-3 px-8 rounded-2xl transition-all duration-300 shadow-[0_4px_14px_0_rgba(190,242,100,0.39)]">
          <FaCreditCard />
          Pay Total Due (৳180)
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[15px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                  Shipment Details
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                  Assigned Rider
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                  Charge Info
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {readyToDeliverParcels.map((parcel) => (
                <tr
                  key={parcel._id}
                  className="group hover:bg-slate-50/80 transition-all duration-200"
                >
                  {/* Shipment Details */}
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FaBarcode className="text-indigo-400 text-xs" />
                        <span className="font-mono font-bold text-indigo-600 tracking-tighter text-sm uppercase">
                          {parcel.trackingID}
                        </span>
                      </div>
                      <p className="font-bold text-slate-700 text-sm">
                        {parcel.parcelName}
                      </p>
                    </div>
                  </td>

                  {/* Assigned Rider - Dynamic Data */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                        <FaUserCircle size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {parcel.deliveryRider?.name || "Assigning..."}
                        </p>

                        {parcel.deliveryRider?.phone ? (
                          <a
                            href={`tel:${parcel.pickupRider.phone}`}
                            className="flex items-center gap-1.5 text-[10px] font-black text-indigo-500 hover:text-indigo-700 transition-colors uppercase tracking-wider cursor-pointer"
                          >
                            <FaPhoneAlt size={10} /> {parcel.deliveryRider.phone}
                          </a>
                        ) : (
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Number not available
                          </p>
                        )}
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

                  {/* Pickup Status */}
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border border-blue-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                      On the way
                    </span>
                  </td>

                  {/* <td className="px-8 py-6 text-right">
                                    <button className="p-2.5 text-slate-300 hover:text-slate-600 hover:bg-white hover:shadow-sm rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-100">
                                      <HiDotsVertical size={20} />
                                    </button>
                                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {readyToDeliverParcels.length === 0 && (
          <div className="py-24 text-center">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBoxOpen size={24} className="text-slate-300" />
            </div>
            <h3 className="text-slate-900 font-bold">All settled!</h3>
            <p className="text-slate-400 text-sm">
              No unpaid delivery charges found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadyToDeliver;
