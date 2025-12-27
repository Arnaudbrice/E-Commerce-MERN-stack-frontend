import React, { useState, useEffect, useCallback } from "react";

import { nanoid } from "nanoid";
import Cards from "../components/Cards.jsx";
import Button from "../components/Button.jsx";
import useProducts from "../hooks/useProducts.jsx";
import useCategories from "../hooks/useCategories.jsx";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useCart from "../hooks/useCart.jsx";

const Home = () => {
  const { isLoading, error, updateProductStockAfterPayment } = useProducts();

  const { categories, setCategories } = useCategories();

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
      <div>
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>

        <div className="grid min-h-full grid-cols-1 sm:grid-cols-2 gap-6 mx-auto my-6 text-gray-400 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-content-center sm:mx-6 auto-rows-min ">
          {Array(12)
            .keys()
            .toArray()
            .map(() => (
              <div
                className="flex w-5/6 flex-col gap-4 justify-center items-center mx-auto"
                key={nanoid()}>
                <div className="flex items-center gap-4">
                  <div className="skeleton h-16 w-16 bg-gray-200  dark:bg-gray-700 shrink-0 rounded-full"></div>
                  <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20 bg-gray-200  dark:bg-gray-700"></div>
                    <div className="skeleton h-4 w-28 bg-gray-200  dark:bg-gray-700"></div>
                  </div>
                </div>
                <div className="skeleton h-32 w-full bg-gray-200  dark:bg-gray-700"></div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <main>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] w-full sm:max-w-xl  my-2 gap-2  mr-auto p-2">
        {categories?.map((category) => {
          return <Button key={category} category={category} />;
        })}
      </div>
      <Cards />
    </main>
  );
};

export default Home;
