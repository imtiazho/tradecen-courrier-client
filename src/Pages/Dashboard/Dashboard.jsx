import React from "react";
import useRole from "../../Hooks/useRole";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import MerchantState from "../../Components/MerchantState/MerchantState";
import AdminState from "../../Components/AdminState/AdminState";
import RiderState from "../../Components/RiderState/RiderState";

const Dashboard = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) return <LoadingModal loading={roleLoading}></LoadingModal>;
  if (role === "admin") return <AdminState></AdminState>;
  if (role === "merchant") return <MerchantState></MerchantState>;
  if (role === "rider") return <RiderState></RiderState>;
};

export default Dashboard;
