import React, { useState, useEffect, createContext } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage.js";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          const { message: errorMessage } = await response.json();
          customErrorMessage(errorMessage, 5000);
          return;
        }
        const data = await response.json();
        console.log("data", data);
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
  }, [baseUrl]);

  const [cartList, setCartList] = useState(() => {
    return localStorage.getItem("cart") ?
        JSON.parse(localStorage.getItem("cart"))
      : [];
  });

  /* useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));

    const newCartProductsQuantity = cartList.reduce((acc, item) => {
      return acc + item.productQuantity;
    }, 0);
    setCartProductsQuantity(newCartProductsQuantity);
  }, [cartList]);

  const [cartProductsQuantity, setCartProductsQuantity] = useState(0); */

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        cartList,
        setCartList,
        /*   cartProductsQuantity,
        setCartProductsQuantity, */
        isLoading,
        error,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
