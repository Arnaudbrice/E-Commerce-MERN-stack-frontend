import React, { useState, useEffect, use } from "react";

import { toast } from "react-toastify";
import Card from "../components/Card";
import ButtonGroup from "../components/ButtonGroup";
import useProducts from "../hooks/useProducts.jsx";
import useCart from "../hooks/useCart.jsx";

const Cart = () => {
  const {
    products,
    setProducts,
    // cartList,
    // setCartList,
    cartProductsQuantity,
    setCartProductsQuantity,
    isLoading,
  } = useProducts();

  const { cartList, setCartList, addProductToCart, removeProductFromCart } =
    useCart();

  console.log("cartList", cartList);

  const [cartAmount, setCartAmount] = useState(0);

  console.log("cardQuantity", cartProductsQuantity);

  useEffect(() => {
    const calculateCartTotalAmount = () => {
      console.log("cartList", cartList);

      const cartTotalAmount = cartList.products.reduce((acc, item) => {
        // Convert Decimal128 to string, then parse to float for calculation
        const itemPrice = parseFloat(item.price.toString()) * item.quantity;
        return acc + itemPrice;
      }, 0);

      setCartAmount(cartTotalAmount);

      console.log("cartTotalAmount:", cartTotalAmount);
    };

    calculateCartTotalAmount();
  }, [cartList]);

  const handleRemoveFromCartList = (id) => {
    // const newQuantity = cardQuantity - 1;
    const existingItem = cartList.find((item) => item.id === id);
    if (existingItem && existingItem.productQuantity > 0) {
      const updatedCartList = cartList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            productQuantity: item.productQuantity - 1,
          };
        } else {
          return item;
        }
      });
      setCartList(updatedCartList);
      // update the  quantity of the products added in the cart
      setCartProductsQuantity((prevQuantity) => prevQuantity - 1);
      // setCardQuantity(newQuantity);
    } else {
      return;
    }
  };

  const addCart = (id) => {
    const updatedCartList = cartList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          productQuantity: item.productQuantity + 1,
        };
      } else {
        return item;
      }
    });
    setCartList(updatedCartList);
    // update the  quantity of the products added in the cart
    setCartProductsQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleReset = () => {
    setCartList([]);
    setCartProductsQuantity(0);
  };

  const handleCheckout = () => {
    toast.success(
      <div className="mx-auto text-center">
        Checkout Successfully <br />
        We Will implement the logic later
      </div>
    );
  };

  if (isLoading) {
    return (
      <div role="status" class="max-w-sm animate-pulse">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span class="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      {cartAmount === 0 ?
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
          <span>Your Cart is empty 😕</span>
        </div>
      : <>
          <div className="w-2/3 mx-auto my-6 text-3xl font-bold text-center divider divider-secondary">
            Cart
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full table-md table-zebra">
              <thead className="invisible text-white bg-gray-700 sm:visible">
                <tr className=" grid py-4 grid-cols-[2fr_3fr_1fr_1fr] mx-4 place-content-center text-sm sm:text-lg">
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
                          key={product.productId._id || product.productId}
                          className="grid grid-cols-[1fr] md:grid-cols-[2fr_3fr_1fr_1fr] border-b-2 gap-2 md:gap-8 border-gray-700 place-items-center h-full space-y-4 ">
                          <td className="flex flex-col items-center justify-center gap-4 ">
                            <div className=" avatar  size-40  ">
                              <img
                                className="object-fill  bg-white mask mask-circle "
                                src={
                                  product.productId ?
                                    product.productId.image
                                  : product.image
                                }
                                alt={
                                  product.productId ?
                                    product.productId.title
                                  : product.title
                                }
                              />
                            </div>
                            <div className="px-0 text-center">
                              <h2 className="text-white">
                                {product.productId ?
                                  product.productId.title
                                : product.title}
                              </h2>
                              <p className="text-gray-400">
                                <span>Unit Price: </span>
                                {parseFloat(
                                  product.productId ?
                                    product.productId.price.toString()
                                  : product.price.toString()
                                ).toFixed(2)}{" "}
                                {" €"}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 text-gray-400">
                            {product.description}
                          </td>
                          <td>
                            <ButtonGroup
                              quantity={product.quantity}
                              handleAdd={() =>
                                addCart(product.productId, product.quantity + 1)
                              } // Pass correct ID and updated quantity
                              handleRemove={() =>
                                handleRemoveFromCartList(product.id)
                              }
                            />
                          </td>
                          <td className="px-4 ">
                            {(
                              parseFloat(product.price.toString()) *
                              product.quantity
                            ).toFixed(2)}{" "}
                            {" €"}
                          </td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
            <div className="flex items-center justify-center gap-4 my-4">
              <button
                className="btn btn-lg bg-fuchsia-600 hover:bg-fuchsia-700 "
                onClick={handleReset}>
                Reset Cart
              </button>
              <button
                className="btn btn-lg btn-success"
                onClick={handleCheckout}>
                Checkout: {cartAmount.toFixed(2)} {" €"}
              </button>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default Cart;
