import React, { createContext, useEffect, useState } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router";
const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { user, setUser } = useAuth();
  const [cartList, setCartList] = useState({ products: [] });

  const [cartQuantity, setCartQuantity] = useState(0);

  const [cartProductsQuantity, setCartProductsQuantity] = useState(0);

  const [isLoadingCart, setIsLoadingCart] = useState(true);
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setIsLoadingCart(true);
        return;
      }

      setIsLoadingCart(true);
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
        console.log("cartData", cartData);
        /*      console.log(
          "cartData after redirection",
          new URLSearchParams(window.location.search).get("success")
        ); */
        setCartList(cartData);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoadingCart(false);
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

  // New function to clear the entire cart
  const clearCart = async () => {
    /*  if (!user) {
      toast.error("You need to be logged in to clear the cart", {
        autoClose: 10000,
      });
      return;
    } */
    try {
      const response = await fetch(`${baseUrl}/users/cart/clear`, {
        // Assuming this new endpoint
        method: "DELETE", // Or POST, depending on your backend implementation
        credentials: "include",
      });

      if (!response.ok) {
        const { message: errorMessage } = await response.json();
        customErrorMessage(errorMessage, 5000);
        return;
      }

      const { cart } = await response.json();
      console.log("cart", cart);
      // On successful clear, update local state
      setCartList(cart);
      setCartProductsQuantity(0);
      toast.success("Cart cleared successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to clear cart.");
      console.error("Error clearing cart:", error);
    }
  };

  const updateProductStockAfterPayment = async (id, quantity) => {
    if (!user) {
      console.warn("Attempted to update stock without authentication.");
      return;
    }
    try {
      const response = await fetch(
        `${baseUrl}/users/products/${id}/reduce-stock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ quantity }),
        }
      );

      if (!response.ok) {
        const { message: validationError } = await response.json();
        customErrorMessage(validationError, 5000);
        return;
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <CartContext
      value={{
        isLoadingCart,
        setIsLoadingCart,
        cartList,
        setCartList,
        addProductToCart,
        removeProductFromCart,
        cartQuantity,
        setCartQuantity,

        decreaseProductQuantity,
        cartProductsQuantity,
        setCartProductsQuantity,
        clearCart,
        updateProductStockAfterPayment,
      }}>
      {children}
    </CartContext>
  );
};

export default CartContext;
