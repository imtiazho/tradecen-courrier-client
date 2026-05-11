import React, { useEffect, useState } from "react";
import useRole from "../../Hooks/useRole";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import MerchantState from "../../Components/MerchantState/MerchantState";
import AdminState from "../../Components/AdminState/AdminState";
import RiderState from "../../Components/RiderState/RiderState";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [timeFrame, setTimeFrame] = useState("this-week");
  const [weekFrame, setWeekFrame] = useState("this-week");
  const { role, roleLoading } = useRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [totalParcels, setTotalParcels] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  const { isLoading: statusLoading, data: stats = {} } = useQuery({
    queryKey: ["statistics", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/stats/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { isLoading: chartLoading, data: chartData = {} } = useQuery({
    queryKey: ["revenueStats", user?.email, timeFrame],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/revenue/stats/${user?.email}?filter=${timeFrame}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { isLoading: shippingLoading, data: shippingData = {} } = useQuery({
    queryKey: ["shippingData", user?.email, weekFrame, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${user.email}&limit=${limit}&skip=${limit * currentPage}`,
      );
      setTotalParcels(res.data.count);
      setTotalPages(Math.ceil(res.data.count / limit));
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  console.log(limit * currentPage, "P = ", currentPage, totalPages);

  if (roleLoading)
    return (
      <LoadingModal
        loading={roleLoading || statusLoading || chartLoading}
      ></LoadingModal>
    );
  if (role === "admin") return <AdminState></AdminState>;
  if (role === "merchant")
    return (
      <MerchantState
        stats={stats}
        chartData={chartData}
        setTimeFrame={setTimeFrame}
        setWeekFrame={setWeekFrame}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
        shippingData={shippingData}
      ></MerchantState>
    );
  if (role === "rider") return <RiderState></RiderState>;
};

export default Dashboard;
