import React, { useState, useEffect, createContext } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import useAuth from "../hooks/useAuth.jsx";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const { user, setUser } = useAuth();

  const [products, setProducts] = useState([]);

  const [productsPerPage, setProductsPerPage] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  //! loading state set it to true initially
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [paginationArray, setPaginationArray] = useState([]);

  //********** searching products **********

  useEffect(() => {
    const fetchProducts = async () => {
      /*    if (!user) {
        return;
      } */
      // setIsLoading(true);
      try {
        /* window.location.search is an empty string when there’s no query, so ${baseUrl}/users/products${qs} resolves to just /users/products */
        /*  const qs = window.location.search; // e.g. ?page=2

        const pageQuery = new URLSearchParams(qs).get("page");
        console.log("pageQuery", pageQuery);

        const query = new URLSearchParams();

        if (pageQuery) {
          query.set("page", pageQuery);
        }
        if (searchTerm) {
          query.set("search", searchTerm);
        } */

        // !location.search is used to get the query string from the URL (e.g. ?page=2&search=phone) and is like window.location.search
        const response = await fetch(
          `${baseUrl}/users/products${location.search}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
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
  }, [baseUrl, user, location.search]);

  /* this effect keep searchTerm in sync with the URL (for back/forward navigation) */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  /* this effect is used to update the URL with the search term 10ms after the user stops typing then re-fetch the products and set page to 1 (by deleting the page parameter)*/
  useEffect(() => {
    // debounce the search input by 100ms (to avoid updating the URL (and refetching) on every keystroke.)
    const handler = setTimeout(() => {
      const params = new URLSearchParams(location.search);
      const currentSearchInUrl = params.get("search") || "";

      // Only update if there's a change
      if (searchTerm !== currentSearchInUrl) {
        // if the user has entered something in the search bar, set or update the 'search' parameter
        if (searchTerm) {
          params.set("search", searchTerm);
        } else {
          // if the search bar is empty, remove the 'search' parameter
          params.delete("search");
        }
        // Always delete 'page' parameter
        // params.delete("page");

        // reset pagination on new search
        params.set("page", "1");

        // Navigate with the updated query string
        navigate(`?${params.toString()}`);
      }
    }, 10);

    return () => {
      clearTimeout(handler); //clear timeout when component unmounts or before running the effect next time(dependency change) => to avoid memory leaks
    };
  }, [searchTerm, navigate, location.search]);

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
        searchTerm,
        setSearchTerm,
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
