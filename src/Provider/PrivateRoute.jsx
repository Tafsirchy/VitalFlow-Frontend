// src/routes/PrivateRoute.jsx
import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading";
import AccessDenied from "../Components/AccessDenied";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = useContext(AuthContext);
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" state={location.pathname} replace />;
  }

  if (userStatus === "Blocked") {
    return <AccessDenied />;
  }

  if (userStatus !== "Active") {
    return <Navigate to="/auth/login" state={location.pathname} replace />;
  }

  return children;
};

export default PrivateRoute;
