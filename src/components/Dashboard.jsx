import React, { useCallback } from "react";
import Order from "../pages/Order.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth.jsx";

const Dashboard = () => {
  // totals array to store totals for each order
  const [totals, setTotals] = useState([]);
  // state for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationArray, setPaginationArray] = useState([]);
  const [ordersForCurrentPage, setOrdersForCurrentPage] = useState([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [dashboardLoading, setDashboardLoading] = useState(true);

  // get all orders of all users
  const fetchAllOrders = useCallback(async () => {
    try {
      // window.location.search is an empty string when there’s no query, so ${baseUrl}/users/orders${qs} resolves to just /users/orders
      const qs = window.location.search; // e.g. ?page=2
      const response = await fetch(`${baseUrl}/users/admin/orders${qs}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const { message: errorMessage } = await response.json();
        customErrorMessage(errorMessage, 5000);
        return;
      }

      const data = await response.json();
      console.log("data from dashboard", data);

      // Calculate totals for each order
      const totalsArr = data.orders
        .flat()
        .map((order) =>
          order.products
            .reduce(
              (acc, curr) =>
                acc +
                parseFloat(curr.productId?.price || curr.price) * curr.quantity,
              0
            )
            .toFixed(2)
        );
      setTotals(totalsArr || []);

      setOrdersForCurrentPage(data.orders.flat() || []);
      setPaginationArray(data.paginationArray || []);
      setCurrentPage(data.currentPageNumber);
    } catch (error) {
      toast.error(error);
    } finally {
      setDashboardLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <Order
      adminOrdersForCurrentPage={ordersForCurrentPage}
      setAdminOrdersForCurrentPage={setOrdersForCurrentPage}
      paginationArray={paginationArray}
      setPaginationArray={setPaginationArray}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      adminTotals={totals}
      setAdminTotals={setTotals}
      dashboardLoading={dashboardLoading}
      fetchAllOrders={fetchAllOrders}
    />
  );
};

export default Dashboard;
