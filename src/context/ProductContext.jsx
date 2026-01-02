import React, { useState, useEffect, createContext } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import useAuth from "../hooks/useAuth.jsx";
import { toast } from "react-toastify";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const { user, setUser } = useAuth();

  const [products, setProducts] = useState([]);

  const [productsPerPage, setProductsPerPage] = useState([]);

  //! loading state set it to true initially
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [paginationArray, setPaginationArray] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      /*    if (!user) {
        return;
      } */
      // setIsLoading(true);
      try {
        // window.location.search is an empty string when there’s no query, so ${baseUrl}/users/products${qs} resolves to just /users/products
        const qs = window.location.search; // e.g. ?page=2
        const response = await fetch(`${baseUrl}/users/products${qs}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          const { message: errorMessage } = await response.json();
          customErrorMessage(errorMessage, 5000);
          return;
        }
        const data = await response.json();
        console.log("data fetch products", data.products);

        setProducts(data.products);

        setProductsPerPage(data.productsPerPage);

        setPaginationArray(data.paginationArray);
        setCurrentPage(data.currentPageNumber);
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
        productsPerPage,
        setProductsPerPage,
        paginationArray,
        currentPage,
        setCurrentPage,
        baseUrl,
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
