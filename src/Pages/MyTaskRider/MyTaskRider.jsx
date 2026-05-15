import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";

const MyTaskRider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: riderData = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["riderTasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders?email=${user?.email}`);
      return res.data[0];
    },
  });

  const handlePickedUp = async (parcelId, trackingID) => {
    try {
      const res = await axiosSecure.patch("/riders/complete-pickup/update", {
        riderId: riderData._id,
        parcelId,
        trackingID,
      });

      if (res.data.success) {
        Swal.fire("Success", "Parcel picked up and status updated!", "success");
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const handleDelivered = async (parcelId, trackingID) => {
    try {
      const res = await axiosSecure.patch("/riders/complete-delivered/update", {
        riderId: riderData._id,
        parcelId,
        trackingID,
      });

      if (res.data.success) {
        Swal.fire("Success", "Parcel Delivered and status updated!", "success");
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };
  console.log(riderData.activeTasks);
  if (isLoading) return <LoadingModal isLoading={true}></LoadingModal>;
  console.log(riderData.activeTasks);
  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Active Tasks ({riderData?.activeTasks?.length || 0})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {riderData?.activeTasks?.length > 0 ? (
          riderData.activeTasks.map((task) => (
            <div
              key={task.parcelId}
              className="card bg-white shadow-[0_2px_5px_rgba(0,0,0,0.05)] border-t-4 border-[#CAEB66] transition-transform hover:scale-[1.02]"
            >
              <div className="card-body p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="badge badge-primary badge-outline font-bold text-[#002B36]">
                    #{task.trackingID}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Assigned: {new Date(task.assignedAt).toLocaleTimeString()}
                  </span>
                </div>

                <div className="bg-[#caeb6673] p-3 rounded-lg border border-blue-100 mb-4">
                  <h3 className="text-xs font-bold text-[#002B36] uppercase tracking-wider mb-2">
                    {task.taskType === "pickup" ? "Pickup From:" : "Deliver to"}
                  </h3>
                  <p className="font-bold text-gray-800">
                    {task.merchantName || task.consumerName}
                  </p>

                  <div className="flex items-start gap-1 mt-2">
                    <span className="text-[#002B36]">📍</span>
                    <p className="text-sm text-gray-600 leading-tight">
                      {task.pickupLocation || task.deliveryLocation}
                    </p>
                  </div>

                  <div className="mt-3">
                    <a
                      href={`tel:${task.merchantPhone ? task.merchantPhone : task.consumerPhone}`}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-[#CAEB66] rounded-full text-[#002B36] text-xs font-bold transition-colors"
                    >
                      📞{" "}
                      {task.merchantPhone
                        ? task.merchantPhone
                        : task.consumerPhone}
                    </a>
                  </div>
                </div>

                <div className="card-actions mt-2">
                  {task.taskType === "pickup" ? (
                    <button
                      onClick={() =>
                        handlePickedUp(task.parcelId, task.trackingID)
                      }
                      className="btn btn-sm bg-[#CAEB66] w-full flex items-center gap-2"
                    >
                      Confirm Pickup
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleDelivered(task.parcelId, task.trackingID)
                      }
                      className="btn btn-sm btn-primary bg-[#CAEB66] text-[#002B36] border-0 w-full flex items-center gap-2 shadow-none"
                    >
                      Confirm Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-xl shadow">
            <div className="text-5xl mb-4">☕</div>
            <p className="text-gray-500 font-medium text-lg">
              No active tasks assigned yet.
            </p>
            <p className="text-gray-400 text-sm italic">
              Take a break, you're doing great!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTaskRider;
