import React from "react";
import {
  FaBarcode,
  FaBoxOpen,
  FaCreditCard,
  FaRegEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const ReadyToPickUp = () => {
  const unpaidParcels = [
    {
      _id: "1",
      trackingID: "ZAP-7821945",
      parcelName: "iPhone 15 Pro Max",
      deliveryCharge: 60,
      deliveryStatus: "parcel-created",
      deliveryChargeStatus: "unpaid",
    },
    {
      _id: "2",
      trackingID: "ZAP-9012354",
      parcelName: "Mechanical Keyboard",
      deliveryCharge: 120,
      deliveryStatus: "parcel-created",
      deliveryChargeStatus: "unpaid",
    },
    {
      _id: "3",
      trackingID: "ZAP-9012354",
      parcelName: "Mechanical Keyboard",
      deliveryCharge: 120,
      deliveryStatus: "parcel-created",
      deliveryChargeStatus: "unpaid",
    },
    {
      _id: "4",
      trackingID: "ZAP-9012354",
      parcelName: "Mechanical Keyboard",
      deliveryCharge: 120,
      deliveryStatus: "parcel-created",
      deliveryChargeStatus: "unpaid",
    },
  ];

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
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {unpaidParcels.map((parcel) => (
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
                      {parcel.deliveryCharge}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button className="flex items-center gap-2 text-[11px] font-black bg-orange-50 text-orange-600 px-4 py-2 rounded-xl hover:bg-orange-600 hover:text-white transition-all duration-300 cursor-pointer">
                      <RiMoneyDollarCircleFill size={14} />
                      PAY NOW
                    </button>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end items-center gap-1">
                      {/* Only allow edit/delete if status is 'parcel-created' */}
                      {parcel.deliveryStatus === "parcel-created" && (
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            title="Edit"
                            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                          >
                            <FaRegEdit size={16} />
                          </button>
                          <button
                            title="Delete"
                            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                          >
                            <FaTrashAlt size={15} />
                          </button>
                        </div>
                      )}
                      <button className="p-2.5 text-slate-300 hover:text-slate-600 rounded-xl transition-colors cursor-pointer">
                        <HiDotsVertical size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {unpaidParcels.length === 0 && (
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

export default ReadyToPickUp;
