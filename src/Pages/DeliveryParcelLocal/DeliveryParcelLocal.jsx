import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaMapMarkerAlt,
  FaShippingFast,
  FaTimes,
  FaBiking,
  FaBoxOpen,
} from "react-icons/fa";

const DeliveryParcelLocal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [chosenRider, setChosenRider] = useState(null);

  const { data: managerData = {} } = useQuery({
    queryKey: ["managerData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/hub-managers?email=${user.email}`,
      );
      return Array.isArray(res.data) ? res.data[0] : res.data;
    },
    enabled: !!user?.email,
  });

  const {
    isLoading: inHouseLoading,
    data: inHouse = {},
    refetch,
  } = useQuery({
    queryKey: ["inComingData", managerData?.hubName],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/warehouse/sorting-house/${managerData?.hubName}`,
      );
      return res.data;
    },
    enabled: !!managerData?.hubName,
  });

  const { data: riders = [] } = useQuery({
    queryKey: ["hubRiders", managerData?.hubName],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/available/${managerData?.hubName}`,
      );
      return res.data;
    },
    enabled: !!managerData?.hubName,
  });

  const handleReceiveFromTransit = async (id) => {
    try {
      const res = await axiosSecure.patch(`/parcels/hub/received/${id}`);
      if (res.data.success) {
        Swal.fire(
          "Received!",
          "Parcel is now in your hub inventory.",
          "success",
        );
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Could not confirm reception", "error");
    }
  };

  const handleAssignDelivery = async () => {
    if (!chosenRider) {
      return Swal.fire("Wait!", "Please select a rider first", "warning");
    }

    try {
      const assignmentData = {
        parcelId: selectedParcel._id,
        riderId: chosenRider._id,
        riderName: chosenRider.name,
        riderEmail: chosenRider.email,
        riderPhone: chosenRider.phone,
        trackingID: selectedParcel.trackingID,
      };

      const res = await axiosSecure.patch(
        "/parcels/assign-delivery",
        assignmentData,
      );

      if (res.data.success) {
        Swal.fire({
          title: "Rider Assigned!",
          text: `${chosenRider.name} is now responsible for this delivery.`,
          icon: "success",
          confirmButtonColor: "#002B36",
        });

        setIsModalOpen(false);
        setChosenRider(null);
        refetch();
      }
    } catch (error) {
      console.error("Assignment Error:", error);
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong during assignment",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-800">
          Local Delivery Management
        </h2>
        <p className="text-xs text-gray-400">
          Assign riders for parcels that reached your destination hub.
        </p>
      </div>

      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-gray-400 text-[11px] uppercase font-black tracking-widest">
            <th className="px-6 py-3">Parcel Info</th>
            <th className="px-6 py-3">Customer Location</th>
            <th className="px-6 py-3 text-center">Operation</th>
          </tr>
        </thead>
        <tbody>
          {(inHouse.deliveryList || []).map((parcel) => (
            <tr
              key={parcel._id}
              className="bg-white hover:shadow-sm transition-all border border-gray-50"
            >
              <td className="px-6 py-4 rounded-l-2xl">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#CAEB66] bg-[#002B36] px-2 py-0.5 rounded-full w-fit mb-1 font-mono">
                    {parcel.trackingID}
                  </span>
                  <span className="text-sm font-black text-slate-800">
                    {parcel.receiverInfo.name}
                  </span>
                  <span className="text-[10px] text-blue-500 font-bold uppercase">
                    {parcel.deliveryStatus.replace(/-/g, " ")}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                  <FaMapMarkerAlt className="text-[#CAEB66]" />
                  {parcel.receiverInfo.area}, {parcel.receiverInfo.district}
                </div>
              </td>
              <td className="px-6 py-4 rounded-r-2xl text-center">
                {parcel.deliveryStatus === "in-transit" ? (
                  <button
                    onClick={() => handleReceiveFromTransit(parcel._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 mx-auto hover:bg-blue-700 transition-all"
                  >
                    <FaBoxOpen /> Confirm Receive
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedParcel(parcel);
                      setIsModalOpen(true);
                    }}
                    className="bg-[#002B36] text-[#CAEB66] px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-[#CAEB66] hover:text-[#002B36] transition-all shadow-sm border border-[#CAEB66]/20"
                  >
                    Assign Delivery Rider
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- MODAL SECTION --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-gray-100">
            {/* Modal Header */}
            <div className="bg-[#002B36] p-8 text-[#CAEB66]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
              >
                <FaTimes size={24} />
              </button>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
                Assign Rider
              </h2>
              <p className="text-[11px] mt-2 text-[#CAEB66]/60 font-medium tracking-widest uppercase">
                Target: {selectedParcel?.receiverInfo.area}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <label className="text-[10px] font-black text-gray-400 uppercase mb-4 block tracking-widest">
                Available Delivery Agents
              </label>

              <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {riders.map((rider) => (
                  <div
                    key={rider._id}
                    onClick={() => setChosenRider(rider)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
                      chosenRider?._id === rider._id
                        ? "border-[#CAEB66] bg-[#CAEB66]/5 shadow-inner"
                        : "border-gray-50 bg-gray-50/30 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl transition-colors ${chosenRider?._id === rider._id ? "bg-[#002B36] text-[#CAEB66]" : "bg-white text-slate-400"}`}
                      >
                        <FaBiking size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">
                          {rider.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-bold">
                          {rider.phone}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-black bg-white px-2 py-1 rounded-lg border border-gray-100 text-slate-500 uppercase">
                        {rider.currentTasks || 0} active
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <button
                onClick={handleAssignDelivery}
                disabled={!chosenRider}
                className="w-full mt-8 bg-[#002B36] text-[#CAEB66] py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:shadow-2xl transition-all disabled:opacity-20 flex items-center justify-center gap-3 active:scale-95"
              >
                <FaShippingFast size={16} /> Confirm Delivery Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryParcelLocal;
