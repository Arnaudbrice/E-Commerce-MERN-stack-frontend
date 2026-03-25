import React from "react";
import useAuth from "../hooks/useAuth.jsx";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedLayout = () => {
  const { user, isLoadingAuth } = useAuth();
  const location = useLocation();

  // Prevent navigation until authentication is resolved
  if (isLoadingAuth) {
    return <div>Loading...</div>; // Show a loading spinner
  }

  /*  (This prevents a page to be display for a small amount of time before the page to be displayed is ready */
  if (!user) {
    /*  navigate("/login", { replace: true }); // Use `replace` to avoid adding to history
    return null; */

    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // return Outlet to render child routes
  return <Outlet />;
};

export default ProtectedLayout;
