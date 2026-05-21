import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaCheck,
  FaTimes,
  FaUserAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

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
        confirmButtonColor: "#02312A",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm Payment",
        inputValidator: (value) => {
          if (!value) return "You must enter a Transaction ID!";
        },
      });

      if (!inputTrx) return;
      trxID = inputTrx;
    } else {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "You want to reject this payout request?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "gray",
        confirmButtonText: "Yes, Reject",
      });
      if (!confirm.isConfirmed) return;
    }

    setProcessingId(id);

    try {
      const res = await axiosSecure.patch(`/approve-payout/${id}`, {
        status,
        trxID,
      });

      if (res.data.success) {
        Swal.fire({
          title: status === "Completed" ? "Paid!" : "Rejected",
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
  
  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#02312A]/5 p-5 rounded-2xl border border-[#02312A]/10">
        <div>
          <h4 className="text-sm font-black text-[#02312A] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></span>
            Global Pending Payouts ({payoutRequests.length})
          </h4>
          <p className="text-gray-500 text-xs mt-1 font-bold">
            Review and clear cashout requests from all registered merchants.
          </p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <span className="w-8 h-8 border-4 border-[#02312A] border-t-transparent rounded-full animate-spin"></span>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Loading Requests...
          </p>
        </div>
      ) : payoutRequests.length > 0 ? (
        /* Requests Table */
        <div className="overflow-x-auto rounded-[25px] border border-gray-50 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-[#F8F9FA]">
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">
                  Merchant Email
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">
                  Requested Date
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">
                  Method / Account
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">
                  Amount
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payoutRequests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-gray-50/40 transition-colors"
                >
                  {/* Merchant Email */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#02312A]/5 text-[#02312A] rounded-lg flex items-center justify-center shrink-0">
                        <FaUserAlt size={12} />
                      </div>
                      <span className="text-xs font-black text-[#02312A]">
                        {req.email}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <FaCalendarAlt size={11} className="text-gray-400" />
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
                  <td className="px-6 py-4">
                    <div className="text-xs font-black text-[#02312A] uppercase tracking-wider">
                      {req.method || req.paymentMethod?.type}
                    </div>
                    <div className="text-[11px] font-bold text-gray-400">
                      {req.accountNumber || req.paymentMethod?.number}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-xs font-black text-[#02312A]">
                      <FaMoneyBillWave className="text-green-600" />৳
                      {req.amount || req.withdrawAmount}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {processingId === req._id ? (
                        <span className="w-5 h-5 border-2 border-[#02312A] border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAction(req._id, "Completed")}
                            className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-xl transition-all active:scale-90"
                            title="Approve & Pay"
                          >
                            <FaCheck size={12} />
                          </button>

                          <button
                            onClick={() => handleAction(req._id, "Rejected")}
                            className="p-2 bg-red-50 text-red-50 hover:bg-red-100 rounded-xl transition-all active:scale-90"
                            title="Reject Request"
                          >
                            <FaTimes size={12} />
                          </button>
                        </>
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
