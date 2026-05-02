import React from "react";
import { Outlet } from "react-router";
import NavBar from "../../Components/Shared/NavBar/NavBar";

const RootLayout = () => {
  return (
    <div className="bg-[#EAECED]">
      <div className="w-[97%] mx-auto pt-8">
        <NavBar></NavBar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default RootLayout;
