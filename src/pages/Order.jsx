import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { customErrorMessage } from "../../utils/customErrorMessage";
import { toast } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  /*   const location = useLocation(); // Access the location object

  const { order } = location.state || {}; // Access the order object from the location state */

  // console.log("order", order);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
        setOrders((prev) => [...prev, ...orderProducts]);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [baseUrl]);
  /*  */

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-xl">Loading orders </span>
        <span className="loading loading-ring loading-xl size-20 "></span>
      </div>
    );
  }
  return (
    <div className="flex flex-col  p-4 space-y-8 ">
      {orders.map((order, index) => (
        <div key={index} className=" flex flex-col border rounded-lg px-2">
          {order.map((product) => (
            <div>
              <p className="p-2 text-secondary text-center">
                Order({index + 1}) - ({product._id})
              </p>
              <div
                key={product.productId._id}
                className="grid grid-cols-2  h-full place-items-center  ">
                <div className="avatar size-30 mr-auto">
                  <img
                    className="object-fill  bg-white mask mask-circle "
                    src={product.productId.image}
                    alt={product.productId.title}
                  />
                </div>
                <div>
                  <h2>{product.productId.title}</h2>
                  <p>
                    Price:{" "}
                    {parseFloat(product.productId.price).toFixed(2) + " €"}
                  </p>
                  <p>Quantity: {product.quantity}</p>
                  <p>
                    Total:{" "}
                    {Number(
                      parseFloat(product.productId.price) * product.quantity
                    ).toFixed(2) + " €"}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="justify-end flex p-2">
            <button className="btn btn-lg btn-primary">Invoice PDF</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
