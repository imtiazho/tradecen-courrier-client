import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import Swal from "sweetalert2";
import {
  MdPedalBike,
  MdDirectionsBike,
  MdCall,
  MdLocationOn,
  MdTask,
} from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";

const RiderAreaWise = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. First fetch Hub Manager Info to get the Hub Name / Area
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

  // 2. Fetch active riders based on Manager's Hub Area
  const {
    isLoading: ridersLoading,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["ridersAreaWise", managerData?.hubName],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders?area=${managerData?.hubName}`);
      return res.data;
    },
    enabled: !!managerData?.hubName,
  });

  const toggleWorkStatus = async (riderId, currentStatus) => {
    console.log(riderId, currentStatus);
    // const nextStatus = currentStatus === "available" ? "busy" : "available";
    // try {
    //   const res = await axiosSecure.patch(`/riders/status/${riderId}`, {
    //     workStatus: nextStatus,
    //   });
    //   if (res.data.success) {
    //     Swal.fire(
    //       "Updated!",
    //       `Rider is now marked as ${nextStatus}.`,
    //       "success",
    //     );
    //     refetch();
    //   }
    // } catch (error) {
    //   Swal.fire("Error", "Could not update rider availability", "error");
    // }
  };

  if (managerLoading || ridersLoading) {
    return <LoadingModal isLoading={true} />;
  }

  return (
    <div className="p-4 md:p-8 bg-[#ffffff] rounded-tradecen min-h-screen font-sans">
      {/* Header Grid Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#002B36] tracking-wide">
            Zone Riders
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Manage active distribution team and delivery logistics across{" "}
            {managerData?.hubName || "assigned"} zone.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#CAEB66]/20 px-4 py-2 rounded-full border border-[#CAEB66]">
          <span className="text-[#002B36] font-bold text-sm uppercase tracking-wider">
            Team: {riders?.length || 0} Active
          </span>
        </div>
      </div>

      {/* Grid Architecture Container */}
      {riders?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {riders.map((rider) => (
            <div
              key={rider._id}
              className="bg-[#FFFFFF] border border-gray-100 rounded-tradecen p-5 shadow-flat hover:border-primary transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Card Header Profile Row */}
              <div>
                <div className="flex items-center gap-4 border-b border-gray-50 pb-4 mb-4">
                  <div className="avatar">
                    <div className="w-14 h-14 rounded-2xl border-2 border-gray-50 overflow-hidden shadow-sm bg-gray-100">
                      <img
                        src={
                          rider.photoURL || "https://i.ibb.co/placeholder.jpg"
                        }
                        alt={rider.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-black text-[#002B36] truncate uppercase tracking-tight">
                      {rider.name}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium truncate">
                      {rider.email}
                    </p>
                  </div>
                  {/* Status Floating Pin */}
                  <span
                    onClick={() =>
                      toggleWorkStatus(rider._id, rider.workStatus)
                    }
                    className={`absolute top-5 right-5 text-[9px] font-black uppercase px-2.5 py-1 rounded-full border cursor-pointer tracking-wider transition-all select-none ${
                      rider.workStatus === "available"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}
                  >
                    {rider.workStatus}
                  </span>
                </div>

                {/* Logistics Key Specs Block */}
                <div className="space-y-3 mb-6">
                  {/* Info Row: Tasks Load */}
                  <div className="flex items-center justify-between text-xs bg-gray-50/70 p-2.5 rounded-xl border border-gray-100/50">
                    <span className="text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <MdTask size={14} className="text-gray-400" /> Current
                      Load
                    </span>
                    <span
                      className={`font-black uppercase text-[11px] ${rider.currentTasks >= 8 ? "text-red-500" : "text-[#002B36]"}`}
                    >
                      {rider.currentTasks || 0} / 10 Active
                    </span>
                  </div>

                  {/* Info Row: Location & Area */}
                  <div className="flex items-start justify-between text-xs px-1">
                    <span className="text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                      <MdLocationOn size={14} className="text-gray-400" /> Fleet
                      Area
                    </span>
                    <span className="font-black text-[#002B36] text-right uppercase tracking-tight">
                      {rider.area}, {rider.district}
                    </span>
                  </div>

                  {/* Info Row: Vehicle Details */}
                  <div className="flex items-center justify-between text-xs px-1">
                    <span className="text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      {rider.vehicle?.toLowerCase() === "bike" ? (
                        <MdDirectionsBike size={14} />
                      ) : (
                        <MdPedalBike size={14} />
                      )}
                      Transport Type
                    </span>
                    <span className="font-black text-[#002B36] uppercase bg-[#CAEB66]/10 px-2 py-0.5 rounded border border-[#CAEB66]/30 text-[10px]">
                      {rider.vehicle || "Cycle"}
                    </span>
                  </div>

                  {/* Info Row: Identity Audit */}
                  <div className="flex items-center justify-between text-xs px-1">
                    <span className="text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <HiOutlineIdentification
                        size={14}
                        className="text-gray-400"
                      />{" "}
                      NID Registry
                    </span>
                    <span className="font-mono font-bold text-gray-500 text-[10px]">
                      {rider.nid || "Verified"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Functional Card Footer Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-50">
                <a
                  href={`tel:${rider.phone}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-[#002B36] hover:bg-gray-50 transition-all text-xs font-black uppercase tracking-wider cursor-pointer text-center"
                >
                  <MdCall size={14} />
                  Call Rider
                </a>

                {/* TRACK LIVE */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${rider.currentLocation?.latitude || rider.latitude},${rider.currentLocation?.longitude || rider.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#002B36] text-white hover:bg-black transition-all text-xs font-black uppercase tracking-wider text-center cursor-pointer shadow-sm"
                >
                  <MdLocationOn size={14} className="text-[#CAEB66]" />
                  Track Live
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty Team Placeholder State */
        <div className="py-24 text-center bg-white rounded-[24px] border border-dashed border-gray-200 mt-2">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 text-xl">
            🚴‍♂️
          </div>
          <h4 className="text-[#002B36] font-black uppercase tracking-tight text-base mb-1">
            No Riders Registered in this Area
          </h4>
          <p className="text-gray-400 text-xs font-medium max-w-xs mx-auto">
            There are currently no delivery partners listed under the{" "}
            {managerData?.hubName || "current"} hub profile parameters.
          </p>
        </div>
      )}
    </div>
  );
};

export default RiderAreaWise;
