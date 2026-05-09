import React, { useEffect } from "react";
import useRole from "../../Hooks/useRole";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import MerchantState from "../../Components/MerchantState/MerchantState";
import AdminState from "../../Components/AdminState/AdminState";
import RiderState from "../../Components/RiderState/RiderState";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { role, roleLoading } = useRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {isLoading: statusLoading, data: stats = {} } = useQuery({
    queryKey: ["statistics", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/stats/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (roleLoading) return <LoadingModal loading={roleLoading || statusLoading}></LoadingModal>;
  if (role === "admin") return <AdminState></AdminState>;
  if (role === "merchant") return <MerchantState stats={stats}></MerchantState>;
  if (role === "rider") return <RiderState></RiderState>;
};

export default Dashboard;
