import React from "react";
import useAuth from "../hooks/useAuth.jsx";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

const ProtectedLayout = () => {
  const { user, isLoadingAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingAuth) {
      return;
    }

    if (!user) {
      navigate("/login");
    }
  }, [user, isLoadingAuth, navigate]);

  /*  (This prevents a page to be display for a small amount of time before the page to be displayed is ready */
  if (!user) {
    return null;
  }

  // return Outlet to render child routes
  return <Outlet />;
};

export default ProtectedLayout;
