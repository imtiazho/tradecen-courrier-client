import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  FaEdit,
  FaTrashAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Swal from "sweetalert2";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";

const AllParcelsMerchant = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  const {
    data: parcelsData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-parcels-merchant", user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${user?.email}&skip=${currentPage * limit}&limit=${limit}`,
      );
      return res.data;
    },
  });

  // Delete Logic
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#02312A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/parcel/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
        }
      }
    });
  };

  // Pagination
  const totalPages = Math.ceil((parcelsData?.totalCount || 0) / limit);

  if (isLoading) {
    return <LoadingModal isLoading={true}></LoadingModal>;
  }

  return (
    <div className="p-6 bg-white rounded-[30px] shadow-sm min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-[#02312A]">All Parcels</h2>
        <div className="bg-[#CAEB66] px-4 py-1 rounded-full text-[10px] font-bold uppercase">
          Total: {parcelsData?.count || 0}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[#ADB5BD] text-[11px] uppercase tracking-widest font-black">
              <th className="px-6 py-3">Tracking ID</th>
              <th className="px-6 py-3">Recipient</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Charge</th>
              <th className="px-6 py-3">COD Amount</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcelsData.length < 0 ? (
              <tr>
                <td colSpan={7} className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                    <span className="text-3xl">📄</span>
                    <p className="text-xs font-bold uppercase tracking-widest">
                      No parcels data available
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              parcelsData?.data?.map((parcel) => (
                <tr
                  key={parcel._id}
                  className="bg-[#F8F9FA]/60 hover:bg-white transition-all group"
                >
                  <td className="px-6 py-5 rounded-l-[20px] text-xs font-black text-[#02312A]">
                    #{parcel.trackingID}
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-bold text-[#02312A]">
                      {parcel.receiverInfo?.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {parcel.receiverInfo?.phone}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter 
                                        ${parcel.deliveryStatus === "delivered" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
                    >
                      {parcel.deliveryStatus.replace(/-/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-[#02312A]">
                    ৳{parcel.deliveryCharge}
                  </td>
                  <td className="px-6 py-5 text-xs font-black text-[#02312A]">
                    ৳{parcel.codAmount || 0}
                  </td>
                  <td className="px-6 py-5 rounded-r-[20px] text-center">
                    {parcel.deliveryStatus === "parcel-created" ||
                    parcel.deliveryStatus === "assign-pickup-rider" ? (
                      <div className="flex justify-center gap-3">
                        <button className="p-2 bg-[#CAEB66] text-[#02312A] rounded-lg hover:scale-110 transition-transform">
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(parcel._id)}
                          className="p-2 bg-red-100 text-red-500 rounded-lg hover:scale-110 transition-transform"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-300 italic">
                        Locked
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-10 flex justify-center items-center gap-4">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="p-2 rounded-full bg-[#F3F4F6] disabled:opacity-30 hover:bg-[#CAEB66] transition-colors"
        >
          <FaChevronLeft size={12} />
        </button>

        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${currentPage === index ? "bg-[#02312A] text-[#CAEB66]" : "bg-gray-100 text-gray-500"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="p-2 rounded-full bg-[#F3F4F6] disabled:opacity-30 hover:bg-[#CAEB66] transition-colors"
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default AllParcelsMerchant;
