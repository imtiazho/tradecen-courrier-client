import React from "react";
import { NavLink } from "react-router";
// React Icons Imports
import { RiDashboardFill, RiTruckLine, RiFileTextLine, RiStore2Line, RiBankCardLine, RiMapPin2Line, RiSettings4Line, RiLockPasswordLine, RiQuestionLine, RiLogoutBoxRLine } from "react-icons/ri";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <RiDashboardFill size={22} />,
      path: "/admin/dashboard",
    },
    {
      name: "Deliveries",
      icon: <RiTruckLine size={22} />,
      path: "/admin/deliveries",
    },
    { 
      name: "Invoices", 
      icon: <RiFileTextLine size={22} />, 
      path: "/admin/invoices" 
    },
    { 
      name: "Stores", 
      icon: <RiStore2Line size={22} />, 
      path: "/admin/stores" 
    },
    {
      name: "Pricing Plan",
      icon: <RiBankCardLine size={22} />,
      path: "/admin/pricing",
    },
    {
      name: "Coverage Area",
      icon: <RiMapPin2Line size={22} />,
      path: "/admin/coverage",
    },
  ];

  const generalItems = [
    { 
      name: "Settings", 
      icon: <RiSettings4Line size={22} />, 
      path: "/admin/settings" 
    },
    {
      name: "Change Password",
      icon: <RiLockPasswordLine size={22} />,
      path: "/admin/password",
    },
    { 
      name: "Help", 
      icon: <RiQuestionLine size={22} />, 
      path: "/admin/help" 
    },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-[#CAEB66] text-[#002B36] font-bold shadow-sm"
        : "text-[#5F7180] hover:bg-gray-100"
    }`;

  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-8">
        <h1 className="text-2xl font-black text-[#002B36] flex items-center gap-2">
          TradeCen<span className="w-2 h-2 bg-[#CAEB66] rounded-full"></span>
        </h1>
      </div>

      <div className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
        {/* Menu Section */}
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 px-4">
            Menu
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={linkClass}>
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* General Section */}
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 px-4">
            General
          </p>
          <nav className="space-y-1">
            {generalItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={linkClass}>
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-50">
        <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl transition-all font-semibold">
          <RiLogoutBoxRLine size={22} /> 
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;