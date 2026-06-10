import React from "react";
import { Outlet } from "react-router";
import NavBar from "../../Components/Shared/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const RootLayout = () => {
  return (
    <div className="bg-[#F2F4F7]">
      <div className="w-[97%] mx-auto pt-8">
        <ScrollToTop></ScrollToTop>
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
