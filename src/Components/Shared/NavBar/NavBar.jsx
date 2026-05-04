import React from "react";
import { FaTruckFast } from "react-icons/fa6";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const NavBar = () => {
  const { user, handleLogOut } = useAuth();
  console.log(user);
  const list = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-[#CAEB66] text-black" : "bg-transparent"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage-area"
          className={({ isActive }) =>
            isActive ? "bg-[#CAEB66] text-black" : "bg-transparent"
          }
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive ? "bg-[#CAEB66] text-black" : "bg-transparent"
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            isActive ? "bg-[#CAEB66] text-black" : "bg-transparent"
          }
        >
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "bg-[#CAEB66] text-black" : "bg-transparent"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 py-3.75 px-6.25 rounded-[15px]">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {list}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#CAEB66] px-2 py-1 rounded-lg">
            <FaTruckFast className="text-[#0D2E2E]" size={25} />
          </div>
          <span className="text-2xl font-bold text-[#0D2E2E]">TradeCen</span>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-sm font-medium text-[#606060]">
          {list}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar border-2 border-[#CAEB66]"
            >
              <div className="w-10 rounded-full">
                <img
                  src={user?.photoURL || "https://i.ibb.co/mR79Y6B/user.png"}
                  alt="User Profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-3 shadow-xl bg-base-100 rounded-xl w-52 space-y-2"
            >
              <div className="px-2 py-1 border-b border-gray-100 mb-1">
                <p className="text-xs text-gray-500 font-medium italic">
                  Welcome,
                </p>
                <p className="text-sm font-bold text-[#0D2E2E] truncate">
                  {user?.displayName || "User"}
                </p>
              </div>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:bg-[#CAEB66] font-medium transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-[#CAEB66] font-medium transition-colors"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="bg-red-50 text-red-600 hover:bg-red-100 font-bold mt-2"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          
          <div className="flex items-center gap-2">
            <Link
              to="/auth/login"
              className="btn btn-ghost capitalize text-[#0D2E2E] border border-gray-200"
            >
              Sign In
            </Link>
            <Link
              to="/auth/sign-up"
              className="btn bg-[#CAEB66] hover:bg-[#c4e685] border-none text-black capitalize flex items-center gap-2"
            >
              Sign Up
              <div className="bg-[#1A2E2E] rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="white"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
