import React, { createContext, useEffect, useState } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage";
import { toast } from "react-toastify";
const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [cartList, setCartList] = useState([]);

  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/cart`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const { message: errorMessage } = await response.json();
          customErrorMessage(errorMessage, 5000);
        }
        const cartData = await response.json();

        setCartList(cartData);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchCart();
  }, [baseUrl]);

  const addProductToCart = async (id, quantity) => {
    try {
      const requestBody = {
        productId: id,
        quantity: quantity,
      };

      const response = await fetch(`${baseUrl}/users/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      if (!response.ok) {
        const { message: validationError } = await response.json();
        customErrorMessage(validationError, 5000);
        return;
      }

      const cartData = await response.json();

      console.log("cartData", cartData);

      setCartList(cartData);

      toast.success("Product Added to Cart Successfully!");
    } catch (error) {
      toast.error(error);
    }
  };

  const removeProductFromCart = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/users/cart/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const { message: validationError } = await response.json();
        customErrorMessage(validationError, 5000);
        return;
      }

      const cartData = await response.json();
      setCartList(cartData);
      toast.success("Product Removed from Cart Successfully!");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <CartContext
      value={{
        cartList,
        setCartList,
        addProductToCart,
        removeProductFromCart,
      }}>
      {children}
    </CartContext>
  );
};

export default CartContext;
