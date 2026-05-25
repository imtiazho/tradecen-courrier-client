import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import { 
  FaCalendarAlt, 
  FaUserAlt, 
  FaMoneyBillWave, 
  FaBox, 
  FaHashtag 
} from "react-icons/fa";

const HubDepositToHQ = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: managerLoading, data: managerData = {} } = useQuery({
    queryKey: ["managerData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/hub-managers?email=${user.email}`,
      );
      return Array.isArray(res.data) && res.data.length > 0
        ? res.data[0]
        : res.data;
    },
    enabled: !!user?.email,
  });

  const { isLoading: historyLoading, data: depositData = {} } = useQuery({
    queryKey: ["depositHistory", managerData?.hubName],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/hub-deposit-history/${managerData?.hubName}`,
      );
      return res.data;
    },
    enabled: !!managerData?.hubName,
  });

  const historyList = depositData?.history || [];

  if (managerLoading || historyLoading) {
    return <LoadingModal isLoading={true}></LoadingModal>;
  }

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-black text-[#02312A] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></span>
            HQ Deposit History
          </h4>
          <p className="text-gray-500 text-xs mt-1 font-bold">
            Review and track all historical deposits submitted from Hub:{" "}
            <span className="text-[#02312A] font-black">{managerData?.hubName || "N/A"}</span>
          </p>
        </div>

        {/* Total Stat Box */}
        <div className="bg-yellow-50 rounded-[15px] border border-yellow-100 px-4 py-2 rounded-xl flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[10px] font-black text-yellow-600 uppercase tracking-widest">
            Total Submissions:
          </span>
          <span className="text-sm font-black text-[#02312A]">
            {depositData?.totalDeposits || 0}
          </span>
        </div>
      </div>

      {/* Main History View */}
      {historyList.length > 0 ? (
        /* Requests Table */
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr>
                <th className="py-4 px-4 text-[11px] font-black uppercase text-gray-400">
                  Submitted By
                </th>
                <th className="py-4 px-4 text-[11px] font-black uppercase text-gray-400">
                  Requested Date
                </th>
                <th className="py-4 px-4 text-[11px] font-black uppercase text-gray-400">
                  Method / TrxID
                </th>
                <th className="py-4 px-4 text-[11px] font-black uppercase text-gray-400 text-center">
                  Total Parcels
                </th>
                <th className="py-4 px-4 text-[11px] font-black uppercase text-gray-400">
                  Amount
                </th>
                <th className="py-4 px-4 text-[11px] font-black uppercase text-gray-400 text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-[#FFFFFF]">
              {historyList.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="bg-[#FFFFFF] hover:bg-[#F8F9FA]/60 transition-all duration-300 group"
                >
                  {/* 1. Submitted By with User Icon Box */}
                  <td className="py-4 px-4 rounded-l-[16px]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#02312A]/5 text-[#02312A] rounded-lg flex items-center justify-center shrink-0">
                        <FaUserAlt size={12} />
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-[#02312A]">
                          {invoice.submittedBy}
                        </span>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mt-0.5">
                          Hub: {invoice.hubName}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* 2. Date with Icon */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col text-[12px] font-semibold text-gray-500 gap-0.5">
                      <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                        <FaCalendarAlt size={11} className="text-gray-400" />
                        {new Date(invoice.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-[10px] text-gray-400 pl-4">
                        {new Date(invoice.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>

                  {/* 3. Method & TrxID with Monospace style */}
                  <td className="py-4 px-4">
                    <div className="text-[12px] font-black text-[#02312A] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#CAEB66] border border-[#02312A]/20 rounded-full"></span>
                      {invoice.paymentMethod}
                    </div>
                    <div className="text-[11px] font-mono font-bold text-slate-500 mt-1 flex items-center gap-1">
                      <FaHashtag size={9} className="text-gray-400" />
                      {invoice.transactionDetails?.slipNo || "N/A"}
                    </div>
                    {invoice.transactionDetails?.note && (
                      <p className="text-[10px] font-medium text-gray-400 mt-1 italic max-w-[180px] truncate">
                        - {invoice.transactionDetails.note}
                      </p>
                    )}
                  </td>

                  {/* 4. Total Parcels with Center alignment */}
                  <td className="py-4 px-4 text-center">
                    <div className="inline-flex items-center gap-1 text-[12px] font-bold text-slate-600 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg">
                      <FaBox size={11} className="text-slate-400" />
                      {invoice.totalParcelsCovered || invoice.parcelIds?.length || 0} Pcs
                    </div>
                  </td>

                  {/* 5. Amount with Premium styling */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-[13px] font-black text-[#02312A] bg-[#CAEB66]/20 px-2.5 py-1 rounded-xl border border-[#CAEB66]/40 w-fit">
                      <FaMoneyBillWave className="text-[#02312A]/70" size={12} />
                      ৳{invoice.depositedAmount?.toLocaleString()}
                    </div>
                  </td>

                  {/* 6. Dynamic Status Badge matched to right */}
                  <td className="py-4 px-4 rounded-r-[16px] text-right">
                    <div className="flex items-center justify-end">
                      {invoice.status === "pending" ? (
                        <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200/50 rounded-xl text-[10px] font-black uppercase tracking-wider animate-pulse inline-block">
                          Pending
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-green-50 text-green-600 border border-green-200/50 rounded-xl text-[10px] font-black uppercase tracking-wider inline-block">
                          Approved
                        </span>
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
            Hurrah! No deposit requests submitted yet. 📦
          </p>
        </div>
      )}
    </div>
  );
};

export default HubDepositToHQ;