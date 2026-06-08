import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data: role } = useQuery({
    queryKey: ["user-role", user?.email],
    
    queryFn: async () => {
      if (!user?.email) return null; 
      
      const res = await axiosSecure.get(`/user/${user.email}/role`);
      return res.data.role;
    },

    enabled: !!user?.email 
  });

  const isCombinedLoading = loading || roleLoading;

  return { roleLoading: isCombinedLoading, role };
};

export default useRole;