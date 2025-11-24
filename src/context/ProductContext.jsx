import React, { useState, useEffect, createContext } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import useAuth from "../hooks/useAuth.jsx";
import { toast } from "react-toastify";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const { user, setUser } = useAuth();
  const [products, setProducts] = useState([]);
  //! loading state set it to true initially
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      /*    if (!user) {
        return;
      } */
      // setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}/users/products`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          const { message: errorMessage } = await response.json();
          customErrorMessage(errorMessage, 5000);
          return;
        }
        const data = await response.json();
        console.log("data fetch products", data);
        setProducts(data);
      } catch (error) {
        console.error(error);
        // setIsLoading(false);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [baseUrl, user]);

  /*   const [cartList, setCartList] = useState(() => {
    return localStorage.getItem("cart") ?
        JSON.parse(localStorage.getItem("cart"))
      : [];
  }); */

  /* useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));

    const newCartProductsQuantity = cartList.reduce((acc, item) => {
      return acc + item.productQuantity;
    }, 0);
    setCartProductsQuantity(newCartProductsQuantity);
  }, [cartList]);

  const [cartProductsQuantity, setCartProductsQuantity] = useState(0); */

  const updateProductStockAfterPayment = async (id, quantity) => {
    if (!user) {
      console.warn("Attempted to update stock without authentication.");
      return;
    }
    try {
      const response = await fetch(
        `${baseUrl}/users/products/${id}/reduce-stock`,
        {
          method: "PUT",
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

      const product = await response.json();
      console.log("product", product);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        // cartList,
        // setCartList,
        /*   cartProductsQuantity,
        setCartProductsQuantity, */
        isLoading,
        error,
        updateProductStockAfterPayment,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
