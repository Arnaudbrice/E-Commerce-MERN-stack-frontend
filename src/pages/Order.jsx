import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { customErrorMessage } from "../../utils/customErrorMessage";
import { toast } from "react-toastify";
import useCart from "../hooks/useCart.jsx";
import Pagination from "../components/Pagination.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { FaShippingFast } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import ChooseStatusDialog from "../components/ChooseStatusDialog.jsx";

const Order = ({
  adminOrdersForCurrentPage,
  adminPaginationArray,
  adminCurrentPage,
  setAdminOrdersForCurrentPage,
  setAdminPaginationArray,
  setAdminCurrentPage,

  dashboardLoading,
  fetchAllOrders,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { addProductToCart, decreaseProductQuantity, removeProductFromCart } =
    useCart();

  const [isLoading, setIsLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectOrderId, setSelectOrderId] = useState(null);

  const [ordersForCurrentPage, setOrdersForCurrentPage] = useState([]);

  const [paginationArray, setPaginationArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { cartProductsQuantity, cartList } = useCart();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  //! Fetch user orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // window.location.search is an empty string when there’s no query, so ${baseUrl}/users/orders${qs} resolves to just /users/orders
        const qs = window.location.search; // e.g. ?page=2
        const response = await fetch(`${baseUrl}/users/orders${qs}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const { message: errorMessage } = await response.json();
          customErrorMessage(errorMessage, 5000);
          return;
        }
        const data = await response.json();

        console.log("data in order page", data);

        // Get orders for current page - handle both nested and flat arrays
        const ordersData = data.ordersProductsForCurrentPage;
        console.log("ordersData", ordersData);

        setOrdersForCurrentPage(ordersData || []);
        setPaginationArray(data.paginationArray || []);
        setCurrentPage(data.currentPageNumber);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user.role !== "admin") {
      fetchOrders();
    }
    // fetchOrders();
  }, [
    baseUrl,
    setOrdersForCurrentPage,
    setPaginationArray,
    setCurrentPage,
    user.role,
  ]);

  const handleBuyAgain = async (e, id) => {
    e.stopPropagation();
    await addProductToCart(id, 1);
  };

  const handleImageClick = (id, e, product) => {
    console.log("product in handleImageClick", product);
    e.stopPropagation();
    navigate(`/product/${id}`, {
      state: {
        quantityInCart: product.quantity,
        stock: product?.productId?.stock || product.stock,
        title: product?.productId?.title || product.title,
        price: product?.productId?.price || product.price,
        description: product?.productId?.description || product.description,
        category: product?.productId?.category || product.category,
        image: product?.productId?.image || product.image,
      },
    });
  };

  /****************************************
   *           Download Invoice as pdf
   ****************************************/

  const handleInvoicePDF = async (id) => {
    console.log("id", id);
    try {
      const response = await fetch(`${baseUrl}/users/orders/${id}/invoice`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const { message: errorMessage } = await response.json();
        customErrorMessage(errorMessage, 5000);
        return;
      }

      // !when fetching a PDF from the server, the response is a blob, converting it to a blob URL ALLOWS  the browser to hanlde it as a downloadable file

      const blobUrl = URL.createObjectURL(await response.blob());

      console.log("blobUrl", blobUrl);
      const a = document.createElement("a");
      a.href = blobUrl;
      //  forces file download rather than browser preview
      a.download = `invoice-${id}.pdf`;
      // best practice to prevent clickjacking
      a.rel = "noopener";
      document.body.append(a);
      // download the file immediately after the click event is triggered on the anchor element
      a.click();
      // removes the anchor element from the DOM
      a.remove();
      // Immediately releases memory after download starts->Prevents memory leaks from accumulated blob URLs
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error(error);
    }
  };

  //********** handle edit order status **********
  const handleEditOrderStatus = async (id) => {
    setIsDialogOpen(true);
    setSelectOrderId(id);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    if (user.role === "admin" && typeof fetchAllOrders === "function") {
      // For admin, re-fetch all orders from backend to update UI
      await fetchAllOrders();
    } else {
      // For regular users, update local state
      setOrdersForCurrentPage((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    }
  };

  const loading = user.role === "admin" ? dashboardLoading : isLoading;
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-xl">Loading orders </span>
        <span className="loading loading-ring loading-xl size-20 "></span>
      </div>
    );
  }

  //! Determine which orders and totals to display based on user role
  const orders =
    user.role === "admin" ? adminOrdersForCurrentPage : ordersForCurrentPage;

  /*  const orderTotals = user.role === "admin" ? adminTotals : totals;
  console.log("orderTotals", orderTotals); */

  console.log("orders for current page", orders);
  const userBasedpaginationArray =
    user.role === "admin" ? adminPaginationArray : paginationArray;
  const userBasedCurrentPage =
    user.role === "admin" ? adminCurrentPage : currentPage;

  return (
    <div>
      <div>
        {!orders?.length ?
          <div
            role="alert"
            className="w-2/3 mx-auto mt-8 text-xl alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 stroke-current shrink-0">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>No orders found for this user</span>
          </div>
        : <>
            <div className="w-2/3 mx-auto my-6 text-3xl font-bold text-center divider divider-secondary">
              {user.role === "admin" ? "Order Management" : "Orders"}
            </div>
            <div className="flex flex-col  p-2 space-y-8 ">
              {(orders || [])
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order, index) => {
                  console.log("order in map", order);
                  console.log(
                    "######user in Order page######",
                    order.shippingCosts,
                  );
                  // console.log("######order total######", orderTotals[index]);

                  //  Calculate total for THIS specific order
                  const productsTotal = order.products.reduce((acc, curr) => {
                    const price = parseFloat(curr.price || 0);
                    return acc + price * curr.quantity;
                  }, 0);

                  const shippingCosts = parseFloat(order.shippingCosts || 0);
                  const orderTotal = (productsTotal + shippingCosts).toFixed(2);
                  return (
                    <div
                      key={order._id}
                      className=" flex flex-col border border-gray rounded-lg p-2 space-y-4  ">
                      {/* order date */}
                      <p className="text-lg  ">
                        <span className="underline underline-offset-8 pr-2 ">
                          Order On:
                        </span>{" "}
                        {order.createdAt?.split("T")[0]}
                      </p>
                      {/*********** user who placed the order ***********/}
                      {user.role === "admin" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full space-y-2 sm:space-y-0 gap-4 place-items-start ">
                          <div className="text-sm text-gray-300  ">
                            <h3 className="text-white text-lg mb-2">
                              <span className="underline underline-offset-8 ">
                                From:
                              </span>{" "}
                            </h3>

                            <p>
                              {order.userId?.defaultAddress?.companyName || ""}
                            </p>
                            <p>
                              {order.userId?.defaultAddress?.firstName || ""}{" "}
                              {order.userId?.defaultAddress?.lastName || ""}
                            </p>
                            <p>
                              {order.userId?.defaultAddress?.streetAddress?.replace(
                                ",",
                                "",
                              ) || ""}
                              {order.userId?.defaultAddress?.streetAddress &&
                                ",  "}
                              {order.userId?.defaultAddress?.zipCode || ""}{" "}
                              {order.userId?.defaultAddress?.city || ""}{" "}
                            </p>
                            <p>
                              {order.userId?.defaultAddress?.state}{" "}
                              {order.userId?.defaultAddress?.streetAddress &&
                                ",  "}
                              {order.userId?.defaultAddress?.country || ""}
                            </p>
                            <p>{order.userId?.email || ""}</p>
                          </div>
                          <div className="text-sm text-center text-gray-300 border border-primary w-fit rounded-lg p-2 space-y-1 sm:col-start-3 sm:col-span-1 ml-auto ">
                            <h3 className="text-white text-lg mb-2">
                              <span className="flex flex-row items-center gap-2  underline underline-offset-8">
                                <FaLocationDot className="text-primary" />
                                Shipping Address:
                              </span>
                            </h3>
                            <p>
                              {order?.shippingAddress?.firstName}{" "}
                              {order.shippingAddress?.lastName}
                            </p>

                            <p>
                              {order.shippingAddress?.streetAddress?.replace(
                                ",",
                                "",
                              )}{" "}
                              {order.shippingAddress && ","}
                              {order.shippingAddress?.zipCode}{" "}
                              {order.shippingAddress?.city}
                            </p>
                            <p>
                              {order.shippingAddress?.state}{" "}
                              {order.shippingAddress?.country}
                            </p>
                          </div>
                        </div>
                      )}

                      {/***********order status ***********/}

                      <ul className="steps sm:steps-horizontal steps-vertical">
                        <li
                          className={`step ${(order.status === "processing" || order.status === "shipped" || order.status === "delivered") && " step-primary"}`}>
                          Processing
                        </li>
                        <li
                          className={`step ${(order.status === "shipped" || order.status === "delivered") && "step-primary"}`}>
                          Shipped
                        </li>
                        <li
                          className={`step ${order.status === "delivered" && "step-primary"}`}>
                          Delivered
                        </li>
                        <li
                          className={`step ${order.status === "cancelled" && "before:!bg-red-500 after:!bg-red-500"}`}>
                          Cancelled
                        </li>
                      </ul>
                      <p className=" flex items-center gap-2 text-lg glow-text-secondary glass w-fit px-2 py-1 rounded-selector">
                        📦 →{" "}
                        <span
                          className={
                            order.status === "shipped" ? "text-cyan-400"
                            : order.status === "delivered" ?
                              "text-lime-500"
                            : order.status === "cancelled" ?
                              "text-red-500"
                            : "text-secondary"
                          }>
                          {order.status}
                          {order.status === "cancelled" && " ❌"}
                          {order.status === "delivered" && " ✅"}
                          {/* car shipping icon   */}
                          {order.status === "shipped" && " 🚚"}
                        </span>
                        {user.role === "admin" && (
                          <FaEdit
                            className=" cursor-pointer"
                            onClick={() => handleEditOrderStatus(order._id)}
                          />
                        )}
                      </p>

                      {/* order products */}
                      <p className=" text-secondary text-center">
                        Order - ({order._id})
                      </p>
                      {order.products.map((product) => {
                        const p = product.productId || product;

                        console.log("product in order", p);
                        //! Check if the product is already in the cart
                        const inCart = cartList.products?.some(
                          (item) => item.productId._id === p._id,
                        );
                        return (
                          <div
                            key={p._id}
                            className="grid sm:grid-cols-3 grid-cols-1 sm:space-y-1 space-y-4 place-items-center  h-full  p-2 rounded-lg border border-gray-100/20"
                            onClick={(e) => handleImageClick(p._id, e, p)}>
                            <div className="avatar size-30  sm:mr-auto">
                              <img
                                // onClick={(e) =>
                                //   handleImageClick(product.productId._id, e, product)
                                // }
                                className="object-fill   bg-white mask mask-circle "
                                src={p.image}
                                alt={p.title}
                              />
                            </div>
                            <div className="w-full text-center sm:text-left ">
                              <h2>{p.title}</h2>
                              <p>
                                Price: {parseFloat(p.price).toFixed(2) + " €"}
                              </p>

                              <p>Quantity: {p.quantity || product.quantity}</p>
                            </div>
                            {/* display the buy again button only if the product is not in the cart */}
                            {user.role !== "admin" && (
                              <div>
                                {!inCart && (
                                  <button
                                    className="btn  btn-secondary"
                                    onClick={(e) => handleBuyAgain(e, p._id)}>
                                    Buy Again
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      <p className="text-md text-center   ">
                        Shipping Costs:{" "}
                        {parseFloat(order?.shippingCosts || 0).toFixed(2) +
                          " €"}
                      </p>
                      <>
                        {/* Display totals for each order */}
                        <p className="text-lg text-center text-secondary font-bold ">
                          {/* Totals: {orderTotals[index] + " €"} */}
                          Totals: {orderTotal} €
                        </p>
                        <div className="justify-end flex ">
                          <button
                            onClick={() => handleInvoicePDF(order._id)}
                            className="btn btn-lg btn-outline btn-secondary">
                            Invoice PDF
                          </button>
                        </div>
                      </>
                    </div>
                  );
                })}
            </div>
          </>
        }
      </div>
      {/***********choose status dialog (outside the map) ***********/}
      {isDialogOpen && (
        <ChooseStatusDialog
          orderId={selectOrderId}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
      <Pagination
        paginationArray={userBasedpaginationArray}
        currentPage={userBasedCurrentPage}
      />
    </div>
  );
};

export default Order;
