import React from "react";
import useAuth from "../Hooks/useAuth";
import LoadingModal from "../Components/LoadingModal/LoadingModal";
import { Navigate } from "react-router";

const VerifiedUserRoute = ({ children }) => {
  const { loading, user, dbUser } = useAuth();

  if (loading) {
    return <LoadingModal isLoading={true} />;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user?.emailVerified || dbUser?.isOnboarded) {
    return children;
  }

  return <Navigate to="/verify-email" replace />;
};

export default VerifiedUserRoute;
