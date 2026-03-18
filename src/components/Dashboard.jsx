import React, { useCallback } from "react";
import Order from "../pages/Order.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth.jsx";

const Dashboard = () => {
  return <Order />;
};

export default Dashboard;
