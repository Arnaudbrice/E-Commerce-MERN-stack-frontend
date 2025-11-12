import React, { useState, useEffect, useCallback } from "react";

import { nanoid } from "nanoid";
import Cards from "../components/Cards.jsx";
import Button from "../components/Button.jsx";
import useProducts from "../hooks/useProducts.jsx";
import useCategories from "../hooks/useCategories.jsx";
import useAuth from "../hooks/useAuth.jsx";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useCart from "../hooks/useCart.jsx";

const Home = () => {
  const { isLoading, error } = useProducts();

  const { categories, setCategories } = useCategories();

  const { clearCart } = useCart();

  const navigate = useNavigate();

  const handleReset = useCallback(async () => {
    clearCart();
  }, [clearCart]);

  // After the payment process, if we want to inform the user that payment was successful, we can check the URL parameters (?success=true) when the user is redirected back from Stripe after payment.
  useEffect(() => {
    const handleRedirect = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const success = queryParams.get("success");
      const canceled = queryParams.get("canceled");

      if (success) {
        toast.success("Payment has been successfully made!");
        await handleReset(); // This will now call the efficient clearCart

        //! if the URL is http://localhost:5173/cart?success=true, window.location.pathname would be /cart for instance
        /* replaces the ?success=true entry in the browser history with the window location pathname(so the URL would not remain http://localhost:5173/cart?success=true:
        -If the user then refreshed the page
        -If the user clicked the browser's back button */

        navigate(window.location.pathname, { replace: true });
      } else if (canceled) {
        toast.error("Payment was canceled.");

        //! if the URL is http://localhost:5173/?canceled=true, window.location.pathname would be /for instance
        //! replaces the ?success=true entry in the browser history with /
        navigate(window.location.pathname, { replace: true });
      }
    };

    const currentQueryParams = new URLSearchParams(window.location.search);
    if (
      currentQueryParams.get("success") ||
      currentQueryParams.get("canceled")
    ) {
      handleRedirect();
    }
  }, [handleReset, navigate]);

  if (error) {
    return (
      <div
        role="alert"
        className="w-2/3 mx-auto mt-8 text-xl alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 stroke-current shrink-0"
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! Something went wrong 😕</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <main>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] w-full max-w-xl   my-2 gap-2  mr-auto p-2">
        {categories?.map((category) => {
          return <Button key={category} category={category} />;
        })}
      </div>
      <Cards />
    </main>
  );
};

export default Home;
