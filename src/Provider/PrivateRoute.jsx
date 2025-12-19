// src/routes/PrivateRoute.jsx
import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading";
import AccessDenied from "../Components/AccessDenied";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = useContext(AuthContext);
  const location = useLocation();

  // Still waiting for Firebase auth OR role/status
  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading />
      </div>
    );
  }

  // Not logged in → go to login (preserve intended path)
  if (!user) {
    return <Navigate to="/auth/login" state={location.pathname} replace />;
  }

  // Blocked user
  if (userStatus === "Blocked") {
    return <AccessDenied />;
  }

  // Inactive user (not Active)
  if (userStatus !== "Active") {
    return <Navigate to="/auth/login" state={location.pathname} replace />;
  }

  // All good → show protected content
  return children;
};

export default PrivateRoute;
