import React from "react";
import {
  FaWallet,
  FaArrowUp,
  FaHistory,
  FaUniversity,
  FaMobileAlt,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const PaymentPayout = () => {
  return (
    <div className="p-6 md:p-10 bg-[#FBFBFA] min-h-screen rounded-[40px]">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-[#02312A] mb-2">
          Payments & Payouts
        </h2>
        <p className="text-gray-500 text-sm">
          Track your earnings and manage your withdrawal methods.
        </p>
      </div>

      {/* 1. Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#02312A] p-8 rounded-[35px] text-white relative overflow-hidden">
          <FaWallet className="absolute -right-4 -bottom-4 text-white/5 size-24" />
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#CAEB66] mb-2">
            Available Balance
          </p>
          <h3 className="text-4xl font-black">৳ 12,450.00</h3>
        </div>
        <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100">
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">
            Pending Payouts
          </p>
          <h3 className="text-4xl font-black text-[#02312A]">৳ 3,200.00</h3>
        </div>
        <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100">
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">
            Total Withdrawn
          </p>
          <h3 className="text-4xl font-black text-[#02312A]">৳ 85,000.00</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 2. Payout Method (Left Side) */}
        <div className="lg:col-span-1 space-y-6">
          <h4 className="text-lg font-black text-[#02312A] flex items-center gap-2">
            <FaArrowUp className="text-[#CAEB66]" /> Withdrawal Method
          </h4>

          {/* Bkash Method */}
          <div className="p-6 bg-white rounded-[30px] border-2 border-[#CAEB66] shadow-sm relative">
            <div className="absolute top-4 right-4">
              <FaCheckCircle className="text-[#CAEB66]" size={20} />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600">
                <FaMobileAlt size={24} />
              </div>
              <div>
                <p className="font-black text-[#02312A]">bKash</p>
                <p className="text-[10px] text-gray-400 uppercase">
                  Mobile Banking
                </p>
              </div>
            </div>
            <p className="text-xs font-bold text-[#02312A]">01700-XXXXXX</p>
          </div>

          {/* Add Bank Method (Static Placeholder) */}
          <div className="p-6 bg-[#F3F4F6] rounded-[30px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors">
            <FaUniversity className="text-gray-400" size={24} />
            <p className="text-xs font-bold text-gray-500">Add Bank Account</p>
          </div>
        </div>

        {/* 3. Transaction History (Right Side) */}
        <div className="lg:col-span-2">
          <h4 className="text-lg font-black text-[#02312A] mb-6 flex items-center gap-2">
            <FaHistory className="text-[#CAEB66]" /> Recent Transactions
          </h4>

          <div className="bg-white rounded-[35px] overflow-hidden shadow-sm border border-gray-50">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F9FA]">
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">
                    Date
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  {
                    date: "May 18, 2026",
                    id: "TRX-99201",
                    amount: "4,500",
                    status: "Completed",
                  },
                  {
                    date: "May 12, 2026",
                    id: "TRX-88124",
                    amount: "12,000",
                    status: "Pending",
                  },
                  {
                    date: "May 05, 2026",
                    id: "TRX-77610",
                    amount: "2,100",
                    status: "Completed",
                  },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 text-xs font-bold text-gray-500">
                      {row.date}
                    </td>
                    <td className="px-6 py-5 text-xs font-black text-[#02312A]">
                      {row.id}
                    </td>
                    <td className="px-6 py-5 text-xs font-black text-[#02312A]">
                      ৳{row.amount}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          row.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPayout;
