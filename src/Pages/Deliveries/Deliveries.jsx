import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  RiCalendarLine,
  RiEditLine,
  RiMore2Fill,
  RiSearch2Line,
  RiFilter3Line,
} from "react-icons/ri";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";

const Deliveries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [totalParcels, setTotalParcels] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  const { isLoading: shippingLoading, data: shippingData = [] } = useQuery({
    queryKey: ["shippingData", user?.email, currentPage, statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${user.email}&limit=${limit}&skip=${limit * currentPage}&status=${statusFilter}`,
      );
      setTotalParcels(res.data.count);
      setTotalPages(Math.ceil(res.data.count / limit));
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  const filteredData = shippingData.filter(
    (item) =>
      item?.receiverInfo?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item?.trackingID.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (shippingLoading) return <LoadingModal loading={shippingLoading} />;

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-[25px] shadow-sm border border-gray-50 w-full">
        {/* --- ২. Search & Filter Area --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <RiSearch2Line className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID or Client Name..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent focus:border-[#CAEB66] rounded-xl text-sm transition-all outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <RiFilter3Line className="text-gray-400" />
            <select
              className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-600 outline-none cursor-pointer"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="parcel-created">Unpaid</option>
              <option value="pending">Pending</option>
              <option value="ready-to-pickup">Ready Pickup</option>
              <option value="in-transit">In-Transit</option>
              <option value="ready-to-deliver">Ready Deliver</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Table Area (আপনার আগের কোড) */}
        <div className="overflow-x-auto border border-gray-100 p-2 rounded-[20px]">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-[#2d2d2d] text-left">
                <th className="pb-4 pl-4 font-bold text-[11px] uppercase tracking-wider">
                  ID
                </th>
                <th className="pb-4 font-bold text-[11px] uppercase tracking-wider">
                  Client
                </th>
                <th className="pb-4 font-bold text-[11px] uppercase tracking-wider">
                  Destination
                </th>{" "}
                {/* নতুন কলাম */}
                <th className="pb-4 font-bold text-[11px] uppercase tracking-wider">
                  Date
                </th>
                <th className="pb-4 font-bold text-[11px] uppercase tracking-wider">
                  Price
                </th>
                <th className="pb-4 font-bold text-[11px] uppercase tracking-wider">
                  Status
                </th>
                <th className="pb-4 pr-4 text-right font-bold text-[11px] uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <tr key={idx} className="group transition-all rounded-xl">
                  <td className="py-5 pl-5 rounded-l-[20px] bg-[#F8F9FA]/60 font-bold text-blue-600 text-xs uppercase">
                    #{item?.trackingID}
                  </td>
                  <td className="py-5 bg-[#F8F9FA]/60 text-xs font-semibold text-gray-700">
                    <div>
                      <p>{item?.receiverInfo?.name}</p>
                      <p className="text-[10px] text-gray-400">
                        {item?.receiverInfo?.phone}
                      </p>
                    </div>
                  </td>
                  <td className="py-5 bg-[#F8F9FA]/60 text-xs text-gray-500 italic">
                    {item?.receiverInfo?.district || "N/A"}{" "}
                    {/* লোকেশন দেখালে ভালো লাগে */}
                  </td>
                  <td className="py-5 bg-[#F8F9FA]/60 text-xs text-gray-500">
                    {new Date(item?.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-5 bg-[#F8F9FA]/60 text-xs font-black text-slate-800">
                    ৳ {item?.cost}
                  </td>
                  <td className="py-5 bg-[#F8F9FA]/60">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide 
                      ${
                        item.deliveryStatus === "intransit"
                          ? "bg-blue-100 text-blue-600"
                          : item.deliveryStatus === "delivered"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {item.deliveryStatus}
                    </span>
                  </td>
                  <td className="py-5 pr-5 rounded-r-[20px] bg-[#F8F9FA]/60 text-right">
                    <button className="p-2 bg-white rounded-lg border border-gray-100 text-gray-400 hover:text-[#002B36] transition-all">
                      <RiMore2Fill size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="text-center py-20 text-gray-400 font-bold">
              No results found.
            </div>
          )}
        </div>

        {/* Pagination Placeholder */}
        <div className="mt-8 grid grid-cols-3 items-center justify-center">
          <div className="flex justify-start">
            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:text-[#002B36] transition-all flex items-center gap-2 cursor-pointer"
              >
                ← Previous
              </button>
            )}
          </div>
          <div className="flex gap-2 justify-center">
            {[...Array(totalPages).keys()].map((n, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(n)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${n === currentPage ? "bg-[#CAEB66] text-[#002B36]" : "text-gray-400 hover:bg-gray-50"}`}
              >
                {n + 1}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            {currentPage < totalPages - 1 && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:text-[#002B36] transition-all flex items-center gap-2 cursor-pointer"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
