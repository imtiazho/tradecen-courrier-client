import React from "react";
import { FaTruckFast } from "react-icons/fa6";

const NavBar = () => {
  const list = (
    <>
      <li>
        <a>Services</a>
      </li>
      <li>
        <a>Coverage</a>
      </li>
      <li>
        <a>About Us</a>
      </li>
      <li>
        <a>Pricing</a>
      </li>
      <li>
        <a>Blog</a>
      </li>
      <li>
        <a>Contact</a>
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
        <button className="btn btn-ghost capitalize text-[#0D2E2E] border border-gray-200">
          Sign In
        </button>
        <button className="btn bg-[#CAEB66] hover:bg-[#c4e685] border-none text-black capitalize flex items-center gap-2">
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
        </button>
      </div>
    </div>
  );
};

export default NavBar;
