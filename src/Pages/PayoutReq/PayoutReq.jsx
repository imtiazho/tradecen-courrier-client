import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaCheck,
  FaUserAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";

const PayoutReq = () => {
  const axiosSecure = useAxiosSecure();
  const [processingId, setProcessingId] = useState(null);

  const {
    isLoading,
    data: payoutRequests = [],
    refetch,
  } = useQuery({
    queryKey: ["allPendingPayoutRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-payouts");
      return res.data.data || [];
    },
  });

  const handleAction = async (id, status) => {
    let trxID = null;

    if (status === "Completed") {
      const { value: inputTrx } = await Swal.fire({
        title: "Enter bKash TrxID",
        input: "text",
        inputPlaceholder: "e.g. BK2026M789X",
        showCancelButton: true,
        confirmButtonColor: "#CAEB66",
        cancelButtonColor: "#d33",

        confirmButtonText:
          '<span style="color: #02312A; font-weight: bold;">Confirm Payment</span>',

        inputValidator: (value) => {
          if (!value) return "You must enter a Transaction ID!";
        },
      });

      if (!inputTrx) return;
      trxID = inputTrx;
    }

    setProcessingId(id);

    try {
      const res = await axiosSecure.patch(`/approve-payout/${id}`, {
        status,
        trxID,
      });

      if (res.data.success) {
        Swal.fire({
          title: "Paid!",
          text: res.data.message,
          icon: "success",
          confirmButtonColor: "#02312A",
        });
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to update payout status",
        icon: "error",
      });
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return <LoadingModal isLoading={true}></LoadingModal>;
  }

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-black text-[#02312A] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></span>
            Hub Merchant Pending Payouts
          </h4>
          <p className="text-gray-500 text-xs mt-1 font-bold">
            Review and clear cashout requests from all registered merchants.
          </p>
        </div>
      </div>

      {/* Loading State */}
      {payoutRequests.length > 0 ? (
        /* Requests Table */
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr>
                <th className="py-4 px-4 text-[11px] font-black uppercase text-gray-400">
                  Merchant Email
                </th>
                <th className="py-4 px-4 text-[11px] font-black uppercase text-gray-400">
                  Requested Date
                </th>
                <th className="py-4 px-4 text-[11px] font-black uppercase text-gray-400">
                  Method / Account
                </th>
                <th className="py-4 px-4 text-[11px] font-black uppercase text-gray-400">
                  Amount
                </th>
                <th className="py-4 px-4 text-[11px] font-black uppercase text-gray-400 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-[#FFFFFF] hover:bg-[#F8F9FA]/60 transition-all duration-300">
              {payoutRequests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-gray-50/40 transition-colors"
                >
                  {/* Merchant Email */}
                  <td className="py-4 px-4 rounded-l-[16px]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#02312A]/5 text-[#02312A] rounded-lg flex items-center justify-center shrink-0">
                        <FaUserAlt size={12} />
                      </div>
                      <span className="text-[13px] font-bold text-[#02312A]">
                        {req.email}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-500">
                      <FaCalendarAlt size={12} className="text-gray-400" />
                      {new Date(req.requestedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>

                  {/* Method & Number */}
                  <td className="py-4 px-4">
                    <div className="text-[12px] font-bold text-[#02312A] uppercase tracking-wider">
                      {req.method || req.paymentMethod?.type}
                    </div>
                    <div className="text-[12px] font-mono font-medium text-gray-400 mt-0.5">
                      {req.accountNumber || req.paymentMethod?.number}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-[14px] font-black text-[#002B36]">
                      <FaMoneyBillWave className="text-emerald-600" size={13} />
                      ৳{(req.amount || req.withdrawAmount)?.toLocaleString()}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 rounded-r-[16px]">
                    <div className="flex items-center justify-center">
                      {processingId === req._id ? (
                        <span className="w-5 h-5 border-2 border-[#02312A] border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <button
                          onClick={() => handleAction(req._id, "Completed")}
                          className="p-2 px-3 bg-green-50 text-green-600 hover:bg-green-100 rounded-xl transition-all active:scale-95 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider cursor-pointer border border-green-200/40"
                          title="Approve & Pay"
                        >
                          <FaCheck size={10} /> Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-[25px] border border-dashed border-gray-200">
          <p className="text-sm font-bold text-gray-400">
            Hurrah! No pending payout requests at the moment. 🎉
          </p>
        </div>
      )}
    </div>
  );
};

export default PayoutReq;
