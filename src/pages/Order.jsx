import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { customErrorMessage } from "../../utils/customErrorMessage";
import { toast } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // totals array to store totals for each order
  const [totals, setTotals] = useState([]);
  /*   const location = useLocation(); // Access the location object

  const { order } = location.state || {}; // Access the order object from the location state */

  // console.log("order", order);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  //! Fetch user orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/orders`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const { message: errorMessage } = await response.json();
          customErrorMessage(errorMessage, 5000);
          return;
        }
        const orderProducts = await response.json();
        console.log("orderData", orderProducts);
        // API returns an array of arrays; flatten so each entry is an order object
        setOrders(orderProducts.flat());

        // Calculate totals for each order
        for (const order of orderProducts.flat()) {
          const total = order.products
            .reduce((accumulator, currentValue) => {
              return (
                accumulator +
                parseFloat(currentValue.productId.price) * currentValue.quantity
              );
            }, 0)
            .toFixed(2);
          setTotals((prevTotals) => [...prevTotals, total]);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [baseUrl]);

  const handleInvoicePDF = async (id) => {
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

      // to download the pdf directly instead of opening it in a new tab
      const blobUrl = URL.createObjectURL(await response.blob());
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `invoice-${id}.pdf`;
      a.rel = "noopener";
      document.body.append(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-xl">Loading orders </span>
        <span className="loading loading-ring loading-xl size-20 "></span>
      </div>
    );
  }
  return (
    <div>
      {!orders.length ?
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
            Orders
          </div>
          <div className="flex flex-col  p-2 space-y-8 ">
            {orders.map((order, index) => (
              <div
                key={index}
                className=" flex flex-col border border-gray rounded-lg p-2 space-y-4  ">
                <p className=" text-secondary text-center">
                  Order({index + 1}) - ({order.id})
                </p>
                {order.products.map((product) => (
                  <div
                    key={product.productId._id}
                    className="grid grid-cols-2  h-full place-items-center p-2 rounded-lg border border-gray-100/20">
                    <div className="avatar size-30 mr-auto">
                      <img
                        className="object-fill  bg-white mask mask-circle "
                        src={product.productId.image}
                        alt={product.productId.title}
                      />
                    </div>
                    <div className="w-full ">
                      <h2>{product.productId.title}</h2>
                      <p>
                        Price:{" "}
                        {parseFloat(product.productId.price).toFixed(2) + " €"}
                      </p>
                      <p>Quantity: {product.quantity}</p>
                    </div>
                  </div>
                ))}
                <>
                  {/* Display totals for each order */}
                  <p className="text-lg text-center text-secondary font-bold underline">
                    Totals: {totals[index] + " €"}
                  </p>
                  <div className="justify-end flex ">
                    <button
                      onClick={() => handleInvoicePDF(order.id)}
                      className="btn btn-lg btn-primary">
                      Invoice PDF
                    </button>
                  </div>
                </>
              </div>
            ))}
          </div>
        </>
      }
    </div>
  );
};

export default Order;
