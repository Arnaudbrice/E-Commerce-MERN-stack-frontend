import React, { createContext, useEffect, useState } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth.jsx";
const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { user, setUser } = useAuth();
  const [cartList, setCartList] = useState({ products: [] });

  const [cartQuantity, setCartQuantity] = useState(0);

  const [cartProductsQuantity, setCartProductsQuantity] = useState(0);

  const [isLoadingCart, setIsLoadingCart] = useState(false);
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        return;
      }
      try {
        const response = await fetch(`${baseUrl}/users/cart`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const { message: errorMessage } = await response.json();
          customErrorMessage(errorMessage, 5000);
          return;
        }
        const cartData = await response.json();

        setCartList(cartData);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchCart();
  }, [baseUrl, user]);

  //********** cart product quantity **********

  /* calculate cart product quantity if cartList changes */
  useEffect(() => {
    const quantity = cartList.products?.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    setCartProductsQuantity(quantity || 0);
  }, [cartList]);

  //********** Add product to cart **********

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

      // await getProductQuantityFromCart(id);

      toast.success("Product Added to Cart Successfully!");
    } catch (error) {
      toast.error(error);
    }
  };

  const decreaseProductQuantity = async (id, quantity) => {
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

      toast.success("Product quantity decreased successfully!");
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

      setCartList(cartData || { products: [] });
      console.log("cartData_now after remove", cartData);

      toast.info("Product Removed from Cart Successfully!");
      // await getProductQuantityFromCart(id);
    } catch (error) {
      toast.error(error);
    }
  };

  /*   const getProductQuantityFromCart = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/users/cart/products/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const { message: validationError } = await response.json();
        customErrorMessage(validationError, 5000);
        return;
      }
      const product = await response.json();
      console.log("product quantity found", product.quantity);
      setCartProductQuantity(product.quantity || 0);
    } catch (error) {
      toast.error(error);
    }
  }; */

  return (
    <CartContext
      value={{
        cartList,
        setCartList,
        addProductToCart,
        removeProductFromCart,
        cartQuantity,
        setCartQuantity,

        decreaseProductQuantity,
        cartProductsQuantity,
        setCartProductsQuantity,
      }}>
      {children}
    </CartContext>
  );
};

export default CartContext;
