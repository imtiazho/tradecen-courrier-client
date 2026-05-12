import React, { useState } from "react";
import NavBar from "../../Components/Shared/NavBar/NavBar";
import { Link, NavLink, Outlet } from "react-router";
import Sidebar from "../../Components/Sidebar/Sidebar";
import {
  RiBankCardLine,
  RiDashboardFill,
  RiFileTextLine,
  RiLockPasswordLine,
  RiLogoutBoxRLine,
  RiMapPin2Line,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiNotification3Line,
  RiQuestionLine,
  RiSearch2Line,
  RiSettings4Line,
  RiStore2Line,
  RiTruckLine,
} from "react-icons/ri";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DashboardLayout = () => {
  const { dbUser, loading: authLoading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: merchant = {}, isLoading: merchantLoading } = useQuery({
    queryKey: ["merchant", dbUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/merchant/${dbUser?.email}`);
      return res.data;
    },
    enabled: !!dbUser?.email && !authLoading,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <RiDashboardFill size={22} />,
      path: "/dashboard",
    },
    {
      name: "Deliveries",
      icon: <RiTruckLine size={22} />,
      path: "/admin/deliveries",
    },
    {
      name: "Invoices",
      icon: <RiFileTextLine size={22} />,
      path: "/admin/invoices",
    },
    { name: "Stores", icon: <RiStore2Line size={22} />, path: "/admin/stores" },
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
      path: "/admin/settings",
    },
    {
      name: "Change Password",
      icon: <RiLockPasswordLine size={22} />,
      path: "/admin/password",
    },
    { name: "Help", icon: <RiQuestionLine size={22} />, path: "/admin/help" },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-[#CAEB66] text-[#002B36] font-bold shadow-sm"
        : "text-[#5F7180] hover:bg-gray-100"
    }`;

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <aside
        className={`bg-white border-gray-100 flex flex-col h-screen sticky top-0 transition-all duration-500 overflow-hidden z-20 ${
          isSidebarOpen ? "w-72" : "w-0 lg:w-0 border-none"
        }`}
      >
        <div className="p-8 min-w-[288px]">
          <Link
            to="/"
            className="text-2xl font-black text-[#002B36] flex items-center gap-2"
          >
            TradeCen<span className="w-2 h-2 bg-[#CAEB66] rounded-full"></span>
          </Link>
        </div>

        <div className="flex-1 px-4 space-y-8 overflow-y-auto min-w-[288px]">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 px-4">
              Menu
            </p>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <NavLink key={item.path} to={item.path} className={linkClass}>
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 w-1.5 h-6 bg-[#002B36] rounded-r-full" />
                      )}

                      <span
                        className={`flex-shrink-0 ${isActive ? "scale-110" : "group-hover:scale-110"} transition-transform`}
                      >
                        {item.icon}
                      </span>

                      <span className="text-sm">{item.name}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

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

        <div className="p-4 border-t border-gray-50 min-w-[288px]">
          <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl transition-all font-semibold">
            <RiLogoutBoxRLine size={22} />{" "}
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          {/* Left Side: Sidebar Toggle Button */}
          <div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 bg-[#F8F9FA] rounded-xl text-[#002B36] hover:bg-[#CAEB66] transition-all duration-300 cursor-pointer"
              title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
              {isSidebarOpen ? (
                <RiMenuFoldLine size={24} />
              ) : (
                <RiMenuUnfoldLine size={24} />
              )}
            </button>
          </div>

          {/* Right Side: Profile & Notifications */}
          <div className="flex items-center gap-5">
            <button className="relative p-2.5 bg-[#F8F9FA] rounded-xl text-gray-500 hover:bg-gray-100 transition-all">
              <RiNotification3Line size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-10 w-[1px] bg-gray-100 mx-1"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-[#002B36]">
                  {merchant.displayName}
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {merchant.role} Account
                </p>
              </div>
              <div className="w-11 h-11 overflow-hidden bg-[#CAEB66] rounded-2xl flex items-center justify-center font-black text-[#002B36] shadow-sm border-2 border-white cursor-pointer hover:scale-105 transition-transform">
                <img src={merchant?.photoURL} alt="" />
              </div>
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="p-6 lg:p-8 flex-1 overflow-y-auto bg-[#F8F9FA]">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
