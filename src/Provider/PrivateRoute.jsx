import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleloading, userStatus } = useContext(AuthContext);

  const location = useLocation();

  if (loading || roleloading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading></Loading>
      </div>
    );
  }

  if (!user || !userStatus == "Active"){
    
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
  }
  if (user && user.email) {
    return children;
  }
};

export default PrivateRoute;
