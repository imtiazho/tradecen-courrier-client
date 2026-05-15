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
    return <LoadingModal isLoading={true}></LoadingModal>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Incoming Parcels ({incomingData.length})
        </h2>
        <span className="badge badge-primary p-4">
          {managerData?.hubName} Hub
        </span>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full text-center">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-4">Tracking ID</th>
              <th>Parcel Details</th>
              <th>Sender Info</th>
              <th>Type/Weight</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {incomingData.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-gray-100 border-b">
                <td className="font-mono font-bold text-blue-600">
                  {parcel.trackingID}
                </td>
                <td>
                  <div className="flex flex-col">
                    <span className="font-semibold">{parcel.parcelName}</span>
                    <span className="text-xs text-gray-500 font-bold">
                      To: {parcel.receiverInfo.area}
                    </span>
                  </div>
                </td>
                <td>
                  <p className="font-bold text-xs">{parcel.senderInfo.name}</p>
                  <p className="text-xs">{parcel.senderInfo.phone}</p>
                </td>
                <td>
                  <div className="badge badge-ghost text-xs">
                    {parcel.parcelType} | {parcel.parcelWeight}kg
                  </div>
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${parcel.deliveryStatus === "parcel-created" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}
                  >
                    {parcel.deliveryStatus === "parcel-created"
                      ? "Pickup Pending"
                      : parcel.deliveryStatus === "assign-pickup-rider"
                        ? "Pickup Rider Assigned"
                        : "In Transit"}
                  </span>
                </td>
                <td>
                  {managerData.hubName === parcel.senderInfo.area ? (
                    <button
                      disabled={parcel.deliveryStatus !== "parcel-created"}
                      className={`btn btn-sm btn-primary`}
                      onClick={() => {
                        setSelectedParcel(parcel);
                        document.getElementById("rider_modal").showModal();
                      }}
                    >
                      {parcel.deliveryStatus === "parcel-created"
                        ? "Assign Rider"
                        : "Rider Assigned"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReceiveAtHub(parcel._id)}
                      className="bg-[#CAEB66] text-[#002B36] px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-[#002B36] hover:text-[#CAEB66] transition-all"
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

      {/* --- RIDER ASSIGN MODAL --- */}
      <dialog id="rider_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center border-b pb-2">
            Assign Rider for Pickup
          </h3>
          <p className="py-4 text-sm text-center text-gray-600">
            Select an available rider for{" "}
            <span className="font-bold">{selectedParcel?.trackingID}</span>
          </p>

          <div className="space-y-3">
            {riders.length > 0 ? (
              riders.map((rider) => (
                <div
                  key={rider._id}
                  className="flex justify-between items-center p-3 bg-gray-100 rounded-lg hover:bg-blue-50 transition-all border border-transparent hover:border-blue-300"
                >
                  <div>
                    <p className="font-bold text-gray-800">{rider.name}</p>
                    <p className="text-xs text-gray-500">
                      Tasks:{" "}
                      <span
                        className={
                          rider.currentTasks >= 8
                            ? "text-red-500 font-bold"
                            : "text-green-600 font-bold"
                        }
                      >
                        {rider.currentTasks}/10
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleAssignRider(rider)}
                    className="btn btn-xs btn-outline btn-primary"
                  >
                    Assign
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-red-500">
                No riders available right now!
              </p>
            )}
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button className="btn btn-error btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Incoming;
