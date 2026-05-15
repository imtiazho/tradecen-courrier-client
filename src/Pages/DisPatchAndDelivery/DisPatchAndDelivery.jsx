import React from "react";
import { NavLink, Outlet } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DispatchAndDelivery = () => {
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

  
  
  const tabs = [
    {
      name: "Dispatch",
      path: ".",
      desc: "Parcels to be sent to other district hubs",
    },
    {
      name: "Delivery",
      path: "delivery-local",
      desc: "Parcels to be delivered to destination",
    },
  ];

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          Dispatch & Delivery
        </h1>
        <p className="text-sm text-gray-400 mt-1 font-medium italic">
          Sorting house for{" "}
          <span className="text-[#002B36] font-bold underline decoration-[#CAEB66]">
            {managerData?.hubName} Hub
          </span>{" "}
          operations.
        </p>
      </div>

      {/* Modern Tabs Navigation */}
      <div className="flex gap-2 border-b border-gray-100 mb-8 bg-white/50 p-1.5 rounded-2xl w-fit shadow-sm">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end
            className={({ isActive }) => `
              px-6 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-xl
              ${
                isActive
                  ? "bg-[#CAEB66]/20 text-[#002B36] border border-[#CAEB66]/50 shadow-sm"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }
            `}
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      {/* Contextual Info Note */}
      <div className="mb-6 px-4 py-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-xl">
        <p className="text-xs text-blue-700 font-bold uppercase">
          Operations Guide:
        </p>
        <p className="text-[11px] text-blue-600 mt-0.5">
          Local Delivery targets parcels with receiver city as{" "}
          <span className="font-bold underline">{managerData?.hubName}</span>.
          Dispatch targets all other cities.
        </p>
      </div>

      {/* Content Area */}
      <div className="transition-all duration-500 bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
        <Outlet context={ managerData?.hubName } />
      </div>
    </div>
  );
};

export default DispatchAndDelivery;
