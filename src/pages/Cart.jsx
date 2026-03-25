import React, { useState, useEffect, use, useCallback, useRef } from "react";

import { toast } from "react-toastify";
import Card from "../components/Card";
import ButtonGroup from "../components/ButtonGroup";
import useProducts from "../hooks/useProducts.jsx";
import useCart from "../hooks/useCart.jsx";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth.jsx";
import { FaLocationDot } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import EditShippingAddressDialog from "../components/EditShippingAddressDialog.jsx";
import EditProfileDialog from "../components/EditProfileDialog.jsx";
import { IoMdAddCircleOutline } from "react-icons/io";

import { FaRegAddressBook } from "react-icons/fa";
import ShippingAddressDialog from "../components/ShippingAddressDialog.jsx";

const Cart = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const {
    products,
    setProducts,
    // cartList,
    // setCartList,

    isLoading,
    updateProductStockAfterPayment,
  } = useProducts();

  const {
    isLoadingCart,
    setIsLoadingCart,
    cartList,
    setCartList,
    addProductToCart,
    decreaseProductQuantity,
    removeProductFromCart,
    cartProductsQuantity,
    setCartProductsQuantity,
    clearCart,
  } = useCart();

  const { user, isLoadingAuth } = useAuth();

  console.log("user from cart", user);

  // const [cartQuantity, setCartQuantity] = useState(0);
  const [order, setOrder] = useState({});

  const [userAddress, setUserAddress] = useState(null);

  const [shippingCosts, setShippingCosts] = useState(0);
  const [cartAmount, setCartAmount] = useState(0);

  const [redirecting, setRedirecting] = useState(false);

  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [isShippingAddressDialogOpen, setIsShippingAddressDialogOpen] =
    useState(false);
  // used to prevent duplicate handling of redirect (e.g., StrictMode double effect)
  const redirectHandledRef = useRef(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const createOrder = useCallback(async () => {
    //! check if the user has a home address or shipping address before creating an order
    const userAddress = user?.addresses?.find(
      (address) =>
        address.label === "Home" || address.label === "shippingAddress",
    );
    // if there is no address
    if (
      !userAddress?.streetAddress ||
      !userAddress?.city ||
      !userAddress?.state ||
      !userAddress?.zipCode ||
      !userAddress?.country
    ) {
      toast.error("Please add an address before making an order.", {
        autoClose: 5000,
      });
      // return;
      return null; //return null on failure
    }
    try {
      const response = await fetch(`${baseUrl}/users/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress: userAddress, shippingCosts }),
        credentials: "include",
      });
      if (!response.ok) {
        const { message: errorMessage } = await response.json();
        customErrorMessage(errorMessage, 5000);
        // return;
        return null; //return null on failure
      }
      const orderMade = await response.json();

      console.log("orderMade fetched", orderMade);

      setOrder({ ...orderMade });
      // handleReset();
      console.log("orderMade", orderMade);
      return orderMade;
    } catch (error) {
      // normalize to a readable string and avoid "[object Object]"
      const msg =
        error?.message ??
        (typeof error === "string" ? error : String(error)) ??
        "Something went wrong";
      toast.error(msg);
      return null; //return null on failure
    }
  }, [baseUrl, user, shippingCosts]);

  //********** reset cart **********
  const handleReset = useCallback(async () => {
    clearCart();
  }, [clearCart]);

  //********** decrease product stock after payment **********
  const updateProductStock = useCallback(
    async (id, quantity) => {
      await updateProductStockAfterPayment(id, quantity);
    },
    [updateProductStockAfterPayment],
  );
  //********** send order confirmation email **********
  const sendOrderConfirmationEmail = useCallback(
    async (order) => {
      try {
        const response = await fetch(
          `${baseUrl}/users/orders/send-order-confirmation-mail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ order_id: order._id }),
            credentials: "include",
          },
        );

        if (!response.ok) {
          const { message: errorMessage } = await response.json();
          customErrorMessage(errorMessage, 5000);
          return;
        }

        const { message } = await response.json();
        toast.success(message);
      } catch (error) {
        // normalize to a readable string and avoid "[object Object]"
        const msg =
          error?.message ??
          (typeof error === "string" ? error : String(error)) ??
          "Something went wrong";
        toast.error(msg);
      }
    },
    [baseUrl],
  );

  useEffect(() => {
    /*  Find the user's home address added in the profile page
     or take the last shipping address added from the user if no home address is found (note: reverse mutates the original array, so we should use it on a shallow copy of the array) */
    const userAddress =
      user?.addresses?.find((address) => address.label === "Home") ||
      [...(user?.addresses || [])]
        .reverse()
        .find((address) => address.label === "shippingAddress");

    setUserAddress(userAddress || null);
    console.log("userAddress from cart", userAddress);
  }, [user]);

  // console.log("cartList", cartList);
  useEffect(() => {
    const calculateCartTotalAmount = async () => {
      const cartTotalAmount = cartList.products?.reduce((acc, item) => {
        //parse to float for calculation
        const itemPrice =
          parseFloat(item.productId?.price || 0) * item.quantity;

        return acc + itemPrice;
      }, 0);

      const totalWeight = cartList.products?.reduce(
        (acc, product) => acc + (product.productId?.weight || 0),
        0,
      );

      let detectedCountry = null;
      if (userAddress?.country) {
        detectedCountry = userAddress.country;
      } else {
        try {
          const response = await fetch(`${baseUrl}/users/location`, {
            credentials: "include",
          });
          if (response.ok) {
            const location = await response.json();
            detectedCountry = location.country_name;
            console.log("Detected country from IP:", detectedCountry);
          }
        } catch (error) {
          // console.error("Could not fetch user location from frontend.");
          toast.error("something went wrong");
        }
      }

      // Determine shipping costs
      if (detectedCountry && detectedCountry !== "Germany") {
        setShippingCosts(15.0);
      } else if (totalWeight <= 2) {
        setShippingCosts(3.5);
      } else if (totalWeight <= 5) {
        setShippingCosts(5.9);
      } else {
        setShippingCosts(9.9);
      }

      setCartAmount(cartTotalAmount);
    };

    calculateCartTotalAmount();
  }, [cartList, userAddress, baseUrl]);
  // console.log("cartList", cartList);

  //********** handle redirection after payment **********
  // This effect handles the logic after the user is redirected back from Stripe.(we can check the URL parameters (?success=true) when the user is redirected back from Stripe after payment)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const success = queryParams.get("success");
    const canceled = queryParams.get("canceled");

    // Guard clauses to exit early if not needed
    if (!success && !canceled) return;
    if (redirectHandledRef.current) return;
    if (isLoadingAuth || isLoadingCart) return; // Wait until user and cart are loaded

    const handlePostPayment = async () => {
      redirectHandledRef.current = true; // Prevent this logic from running again

      if (success === "true") {
        setRedirecting(true); // Show a loading/processing state
        toast.success("Payment successful! Finalizing your order...");

        try {
          // 1. Create the order. The createOrder function  needs to RETURN the order.
          // We need to modify the createOrder function slightly.
          const createdOrder = await createOrder();
          if (!createdOrder) {
            // createOrder function should return null/undefined on failure

            toast.error("Order creation failed. Please contact support.");
          }

          // 2. Send the confirmation email with the newly created order data.
          await sendOrderConfirmationEmail(createdOrder);

          // 3. Clear the cart from the frontend state.
          handleReset();

          // 4. Navigate the user to their orders page.
          toast.info("Redirecting to your orders...");
          setTimeout(() => {
            const destination =
              user?.role === "admin" ? "/admin/dashboard/orders" : "/orders";
            navigate(destination, { replace: true }); //! This replaces the current history entry /cart/?success=true in the back stack with the new one /orders( /cart/?success=true becomes -> /orders in the history back stack)
          }, 3000); // A small delay so the user can read the toasts.
        } catch (error) {
          toast.error(
            error.message || "A critical error occurred after payment.",
          );
          setRedirecting(false); // Hide loading state on error
        }
      } else if (canceled) {
        toast.error("Payment was canceled.");
        //! Clean the URL by replacing the "/cart?canceled=true" with "/cart" in the history back stack
        navigate("/cart", { replace: true });
      }
    };

    handlePostPayment();
  }, [
    user,
    isLoadingAuth,
    isLoadingCart,
    createOrder,
    sendOrderConfirmationEmail,
    handleReset,
    navigate,
    updateProductStock,
  ]);

  //**decrease product quantity or remove it from  **
  const handleRemoveFromCartList = async (id, quantity) => {
    if (quantity === 1) {
      console.log("quantity cart", quantity);
      await removeProductFromCart(id);

      return;
    }
    await decreaseProductQuantity(id, quantity - 1);
  };

  const addCart = async (id, stock, quantity) => {
    if (quantity === stock) {
      toast.error("Product is out of stock");
      return;
    }

    await addProductToCart(id, quantity + 1);
    // await getProductFromCart(id);
  };

  // After the payment process, if we want to inform the user that payment was successful, we can check the URL parameters (?success=true) when the user is redirected back from Stripe after payment.

  //********** payment **********
  const handleCheckout = async () => {
    if (!userAddress) {
      toast.error("Please add an address before making an order.", {
        autoClose: 5000,
      });
      return;
    }
    try {
      const response = await fetch(
        `${baseUrl}/users/cart/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartList,
            shippingCosts: shippingCosts.toFixed(2),
          }),
          credentials: "include",
        },
      );
      if (!response.ok) {
        const { message: errorMessage } = await response.json();
        customErrorMessage(errorMessage, 5000);
        return;
      }

      const { url } = await response.json();

      console.log("url", url);
      toast.info("Redirecting to payment...");
      //! Redirect to Stripe checkout
      window.location.href = url;
    } catch (error) {
      // normalize to a readable string and avoid "[object Object]"
      const msg =
        error?.message ??
        (typeof error === "string" ? error : String(error)) ??
        "Something went wrong";
      toast.error(msg);
    }
  };

  //********** handleEditShippingAddress **********
  const handleEditShippingAddress = () => {
    setIsEditButtonClicked(true);
  };

  //********** handle choose shipping address **********
  const handleChooseShippingAddress = (address) => {
    setUserAddress(address);
    // setIsShippingAddressDialogOpen(true);
    // setIsEditButtonClicked(false);
  };

  if (!cartProductsQuantity && !isLoadingCart) {
    return (
      <div
        role="alert"
        className="w-2/3 mx-auto mt-8 text-xl alert  alert-info">
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
        <span>Your Cart is empty 😕</span>
      </div>
    );
  }

  return (
    <div>
      {redirecting || isLoadingCart ?
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      : <>
          <div className="w-2/3 mx-auto my-8 text-3xl font-bold text-center divider divider-secondary">
            Cart
          </div>

          <div className="overflow-x-auto ">
            <div className="border-l-4 border-r-4 border-secondary rounded-2xl">
              <table className="table text-center  w-full table-md table-zebra  ">
                <thead className="invisible text-white  sm:visible">
                  <tr className=" grid py-4 grid-cols-[2fr_3fr_1fr_1fr]  place-content-center text-sm sm:text-lg bg-gray-700/50 rounded-tl-2xl rounded-tr-2xl">
                    <th>Product</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Line Total</th>
                  </tr>
                </thead>
                <tbody className="min-h-full ">
                  {/* Ensure cartList.products exists before mapping */}
                  {cartList.products &&
                    cartList.products.map(
                      (product) =>
                        product.quantity > 0 && (
                          <tr
                            key={product.productId?._id}
                            className="grid grid-cols-[1fr] md:grid-cols-[2fr_3fr_1fr_1fr] border-b-2 gap-2 md:gap-8 border-gray-700 place-items-center h-full space-y-4 ">
                            <td className="flex flex-col items-center justify-center gap-4 ">
                              <div className=" avatar  size-40  ">
                                <img
                                  className="object-fill  bg-white mask mask-circle "
                                  src={product.productId?.image}
                                  alt={product.productId?.title}
                                />
                              </div>
                              <div className="px-0 text-center">
                                <h2 className="text-white">
                                  {product.productId?.title}
                                </h2>
                                <p className="text-gray-400">
                                  <span>Unit Price: </span>
                                  {parseFloat(product.productId?.price).toFixed(
                                    2,
                                  )}{" "}
                                  {" €"}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 text-gray-400">
                              {product.productId?.description}
                            </td>
                            <td>
                              <ButtonGroup
                                quantity={product.quantity}
                                stock={product.productId?.stock}
                                handleAdd={() =>
                                  addCart(
                                    product.productId._id,
                                    product.productId.stock,
                                    product.quantity,
                                  )
                                } // Pass correct ID and updated quantity
                                handleRemove={() =>
                                  handleRemoveFromCartList(
                                    product.productId._id,
                                    product.quantity,
                                  )
                                }
                              />
                            </td>
                            <td className="px-4 ">
                              {(
                                parseFloat(product.productId?.price) *
                                product.quantity
                              ).toFixed(2)}{" "}
                              {" €"}
                            </td>
                          </tr>
                        ),
                    )}
                </tbody>
              </table>
            </div>

            {/* Reset Cart and Checkout Buttons */}

            <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border-l-4 border-r-4 border-secondary my-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex  ">
                  {/* <span className="material-symbols-outlined text-secondary">
                    location_on
                  </span> */}
                  <span className="flex flex-row items-center gap-2">
                    <FaLocationDot className="text-secondary" />
                    {userAddress?.label === "Home" ?
                      "Home"
                    : "Shipping Address"}
                  </span>
                </h3>

                {/* handleEditShippingAddress is a function that opens the EditShippingAddressDialog component */}

                {isEditButtonClicked && (
                  <EditShippingAddressDialog
                    isEditButtonClicked={isEditButtonClicked}
                    setIsEditButtonClicked={setIsEditButtonClicked}
                    userAddress={userAddress}
                    setUserAddress={setUserAddress}
                  />
                )}
                <div
                  className="flex flex-row items-center gap-2"
                  onClick={handleEditShippingAddress}>
                  <a
                    className="flex items-center gap-2 text-secondary text-md font-bold hover:underline"
                    href="#">
                    {/* <FaEdit /> */}
                    <IoMdAddCircleOutline />
                    {/* <FaRegAddressBook /> */}
                    Add New Address
                  </a>
                </div>
              </div>

              {/***********Address Details ***********/}
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-md text-gray-300 ">
                    {userAddress?.companyName || ""}
                  </span>
                  <span className="text-md text-gray-300 ">
                    {userAddress?.firstName || ""} {userAddress?.lastName || ""}
                  </span>
                </div>
                <p className="text-md text-gray-300 ">
                  {userAddress?.streetAddress &&
                    userAddress.streetAddress.replace(",", "") + ", "}
                  {userAddress?.zipCode && userAddress.zipCode + " "}
                  {userAddress?.city && userAddress.city + ", "}
                  {userAddress?.state && userAddress.state + ", "}

                  {userAddress?.country && userAddress.country}
                </p>
                <p className="text-md text-gray-300 ">
                  {user?.country && user.country}
                </p>

                {/* dialog with scrollable area for already added shipping addresses */}
                {isShippingAddressDialogOpen && (
                  <ShippingAddressDialog
                    user={user}
                    handleChooseShippingAddress={handleChooseShippingAddress}
                    isShippingAddressDialogOpen={isShippingAddressDialogOpen}
                    setIsShippingAddressDialogOpen={
                      setIsShippingAddressDialogOpen
                    }
                  />
                )}

                <div className="flex justify-start mt-4">
                  <button
                    onClick={() => setIsShippingAddressDialogOpen(true)}
                    className="
                     btn btn-outline btn-outline-primary rounded-lg">
                    Choose An Address
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-gray-500">
                <span className="text-md">Subtotal</span>
                <span className="font-semibold">
                  {cartAmount.toFixed(2)} {" €"}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span className="text-md">Shipping Costs</span>
                <span className="font-semibold">
                  {shippingCosts.toFixed(2)} €
                </span>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center py-4">
                <span className="font-bold text-md">Total</span>
                <span className="text-2xl font-bold text-secondary">
                  Checkout: {(cartAmount + shippingCosts).toFixed(2)} {" €"}
                </span>
              </div>
              {/* <button className="w-full bg-secondary text-white font-bold py-4 rounded-xl shadow-lg shadow-secondary/30 hover:opacity-90 transition-opacity uppercase tracking-widest text-sm">
                Checkout: 39.99 €
              </button> */}

              <div className="flex items-center justify-center gap-4 my-4">
                <button
                  className="btn btn-lg btn-outline btn-secondary"
                  onClick={handleReset}>
                  Reset Cart
                </button>
                <button
                  className="btn btn-lg btn-secondary"
                  onClick={handleCheckout}>
                  Checkout: {(cartAmount + shippingCosts).toFixed(2)} {" €"}
                </button>
              </div>
            </div>

            {/* this already works */}
            {/* <div className="flex items-center justify-center gap-4 my-4">
              <button
                className="btn btn-lg btn-outline btn-secondary"
                onClick={handleReset}>
                Reset Cart
              </button>
              <button
                className="btn btn-lg btn-secondary"
                onClick={handleCheckout}>
                Checkout: {cartAmount.toFixed(2)} {" €"}
              </button>
            </div> */}
          </div>
        </>
      }
    </div>
  );
};

export default Cart;
