import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";

const Incoming = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);

  // --- Logic remains exactly same ---
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

  const {
    isLoading: incomingLoading,
    data: incomingData = [],
    refetch: refetchParcels,
  } = useQuery({
    queryKey: ["inComingData", managerData?.hubName],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/incoming/${managerData?.hubName}`,
      );
      return res.data;
    },
    enabled: !!managerData?.hubName,
  });

  const { data: riders = [], refetch: refetchRiders } = useQuery({
    queryKey: ["availableRiders", managerData?.hubName],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/available/${managerData?.hubName}`,
      );
      return res.data;
    },
    enabled: !!managerData?.hubName,
  });

  const handleAssignRider = async (rider) => {
    const assignInfo = {
      parcelId: selectedParcel._id,
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
      riderPhone: rider.phone,
      trackingID: selectedParcel.trackingID,
    };

    try {
      const res = await axiosSecure.patch("/parcels/assign-rider", assignInfo);
      if (res.data.success) {
        document.getElementById("rider_modal").close();
        Swal.fire({
          title: "Success!",
          text: `Parcel assigned to ${rider.name} for pickup.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        refetchParcels();
        refetchRiders();
      }
    } catch (error) {
      document.getElementById("rider_modal").close();
      Swal.fire("Error", "Failed to assign rider", "error");
    }
  };

  const handleReceiveAtHub = async (id) => {
    try {
      const res = await axiosSecure.patch(`/parcels/hub/received/${id}`);
      if (res.data.success) {
        Swal.fire({
          title: "Received!",
          text: "Parcel is now ready for local delivery.",
          icon: "success",
          confirmButtonColor: "#002B36",
        });
        refetchParcels();
      }
    } catch (error) {
      Swal.fire("Error", "Could not mark as received", "error");
    }
  };

  if (managerLoading || incomingLoading) {
    return <LoadingModal isLoading={true} />;
  }

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#002B36] tracking-tight">
            Incoming Parcels
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Manage and track all parcels entering the hub.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#CAEB66]/20 px-4 py-2 rounded-full border border-[#CAEB66]">
          <div className="w-2 h-2 bg-[#002B36] rounded-full animate-pulse"></div>
          <span className="text-[#002B36] font-bold text-sm uppercase tracking-wider">
            {managerData?.hubName} Hub Control
          </span>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl shadow-[0_2px_5px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#CAEB66] text-[#002B36]">
                <th className="py-5 pl-6 text-xs uppercase tracking-widest text-center">
                  Tracking ID
                </th>
                <th className="py-5 pl-6 text-xs uppercase tracking-widest text-center">
                  Details
                </th>
                <th className="py-5 pl-6 text-xs uppercase tracking-widest text-center">
                  Sender
                </th>
                <th className="py-5 pl-6 text-xs uppercase tracking-widest text-center">
                  Specs
                </th>
                <th className="py-5 pl-6 text-xs uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="py-5 pl-6 text-xs uppercase tracking-widest text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {incomingData?.map((parcel) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-[#CAEB66]/5 transition-colors group text-center"
                >
                  <td className="py-7 pl-6">
                    <span className="bg-gray-100 px-3 py-1.5 rounded-lg font-mono font-bold text-[#002B36] text-sm group-hover:bg-[#CAEB66]/30 transition-all">
                      #{parcel.trackingID}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-[#002B36]">
                        {parcel.parcelName}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-gray-400">
                        Dest: {parcel.receiverInfo.area}
                      </span>
                    </div>
                  </td>
                  <td>
                    <p className="font-bold text-sm text-gray-700">
                      {parcel.senderInfo.name}
                    </p>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {parcel.senderInfo.phone}
                    </p>
                  </td>
                  <td>
                    <div className="flex flex-col items-center gap-1">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-600 uppercase italic">
                        {parcel.parcelType}
                      </span>
                      <span className="text-xs font-black text-[#002B36]">
                        {parcel.parcelWeight}{" "}
                        <span className="text-[10px] text-gray-400">KG</span>
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${
                        parcel.deliveryStatus === "parcel-created"
                          ? "bg-orange-100 text-orange-600 border border-orange-200"
                          : parcel.deliveryStatus === "assign-pickup-rider"
                            ? "bg-indigo-100 text-indigo-600 border border-indigo-200"
                            : "bg-emerald-100 text-emerald-600 border border-emerald-200"
                      }`}
                    >
                      {parcel.deliveryStatus === "parcel-created"
                        ? "Waiting Pickup"
                        : parcel.deliveryStatus === "assign-pickup-rider"
                          ? "Rider On Way"
                          : "In Transit"}
                    </span>
                  </td>
                  <td className="pr-6">
                    {managerData.hubName === parcel.senderInfo.area ? (
                      <button
                        disabled={parcel.deliveryStatus !== "parcel-created"}
                        className={`w-full max-w-[140px] py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-sm ${
                          parcel.deliveryStatus === "parcel-created"
                            ? "bg-[#CAEB66] text-[#002B36] hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        onClick={() => {
                          setSelectedParcel(parcel);
                          document.getElementById("rider_modal").showModal();
                        }}
                      >
                        {parcel.deliveryStatus === "parcel-created"
                          ? "Assign Rider"
                          : "Assigned"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReceiveAtHub(parcel._id)}
                        className="bg-[#CAEB66] text-[#002B36] px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 cursor-pointer"
                      >
                        Confirm Receive
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {incomingData.length === 0 && (
          <div className="py-20 text-center">
            <div className="bg-gray-50 inline-block p-6 rounded-full mb-4">
              📦
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
              No incoming parcels found
            </p>
          </div>
        )}
      </div>

      {/* --- RIDER ASSIGN MODAL (Refined Design) --- */}
      <dialog
        id="rider_modal"
        className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
      >
        <div className="modal-box p-0 rounded-3xl border-none shadow-2xl overflow-hidden max-w-sm">
          <div className="bg-[#002B36] p-6 text-center relative">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-white hover:bg-white/20">
                ✕
              </button>
            </form>
            <div className="w-16 h-16 bg-[#CAEB66] rounded-2xl mx-auto flex items-center justify-center text-2xl mb-3 shadow-lg transform rotate-3">
              🛵
            </div>
            <h3 className="font-black text-white text-xl uppercase tracking-tight">
              Assign Pickup
            </h3>
            <p className="text-[#CAEB66] text-xs font-bold opacity-80 uppercase tracking-widest mt-1">
              {selectedParcel?.trackingID}
            </p>
          </div>

          <div className="p-6 space-y-3 bg-white">
            <p className="text-[10px] uppercase font-black text-gray-400 mb-2">
              Available Riders ({riders.length})
            </p>
            {riders?.length > 0 ? (
              riders.map((rider) => (
                <div
                  key={rider._id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl hover:bg-[#CAEB66]/10 transition-all border border-transparent hover:border-[#CAEB66]"
                >
                  <div>
                    <p className="font-black text-[#002B36] text-sm uppercase tracking-tighter">
                      {rider.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">
                        Load:{" "}
                        <span
                          className={
                            rider.currentTasks >= 8
                              ? "text-red-500"
                              : "text-[#002B36]"
                          }
                        >
                          {rider.currentTasks}/10
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAssignRider(rider)}
                    className="bg-[#002B36] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95"
                  >
                    Select
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-xs font-bold text-red-400 uppercase italic">
                  All riders are busy!
                </p>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Incoming;
