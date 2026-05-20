import React from "react";
import { useLocation, Link, Outlet } from "react-router";
import { FaMoneyCheckAlt, FaUsers, FaBiking, FaWallet } from "react-icons/fa";

const AccountAndFinance = () => {
  const location = useLocation();

  const tabs = [
    {
      id: "payout-requests",
      label: "Payout Requests",
      path: "/dashboard/account-finance/payout-requests",
      icon: <FaMoneyCheckAlt size={16} />,
    },
    {
      id: "users",
      label: "User Management",
      path: "/dashboard/account-finance/users",
      icon: <FaUsers size={16} />,
    },
    {
      id: "riders",
      label: "Rider Management",
      path: "/dashboard/account-finance/riders",
      icon: <FaBiking size={16} />,
    },
  ];

  return (
    <div className="p-6 md:p-10 bg-[#FBFBFA] min-h-screen rounded-[40px] relative">
      {/* 1. Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#02312A] mb-2 flex items-center gap-3">
            <div className="p-2 bg-[#02312A] text-[#CAEB66] rounded-xl shadow-md">
              <FaWallet size={24} />
            </div>
            Account & Finance Hub
          </h2>
          <p className="text-gray-500 text-sm">
            Manage merchant payout approvals, user accounting, and rider
            financial settlements.
          </p>
        </div>

        <div className="bg-[#02312A] text-white px-5 py-3 rounded-2xl flex items-center gap-3 border border-white/10 w-fit">
          <span className="w-2 h-2 bg-[#CAEB66] rounded-full animate-pulse"></span>
          <p className="text-[11px] font-black uppercase tracking-wider text-gray-300">
            Hub Terminal: <span className="text-[#CAEB66]">Active</span>
          </p>
        </div>
      </div>

      {/* 2. Professional Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-[20px] shadow-sm border border-gray-100 max-w-fit mb-8">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;

          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? "bg-[#02312A] text-[#CAEB66] shadow-md shadow-[#02312A]/10 scale-105"
                  : "text-gray-500 hover:text-[#02312A] hover:bg-gray-50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* 3. Dynamic Content Area via Outlet */}
      <div className="bg-white rounded-[35px] shadow-sm border border-gray-50 p-6 md:p-8 transform transition-all animate-in fade-in duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountAndFinance;
