import React from "react";
import { NavLink, Outlet } from "react-router";

const UserManagement = () => {
  const tabs = [
    { name: "Hub Managers", path: "hub-managers" },
    { name: "Merchants", path: "merchants" },
    { name: "Riders", path: "riders" },
    { name: "Rider Requests", path: "" },
  ];

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800">User Management</h1>
        <p className="text-sm text-gray-400 mt-1 font-medium">
          Manage all ZapShift platform users and onboarding requests.
        </p>
      </div>

      <div className="flex gap-2 border-b border-gray-100 mb-8 bg-white/50 p-1.5 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
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

      
      <div className="transition-all duration-500">
        <Outlet />
      </div>
    </div>
  );
};

export default UserManagement;
