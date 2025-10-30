import React, { useState, useEffect } from "react";

import { nanoid } from "nanoid";
import Cards from "../components/Cards.jsx";
import Button from "../components/Button.jsx";
import useProducts from "../hooks/useProducts.jsx";
import useCategories from "../hooks/useCategories.jsx";

const Home = () => {
  const { isLoading, error } = useProducts();
  /*  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        if (!response.ok) {
          throw new Error("Error fetching data from the api");
        }
        const data = await response.json();
        console.log("data", data);
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []); */

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
        {categories.map((category) => {
          return <Button key={nanoid()} category={category} />;
        })}
      </div>
      <Cards />
    </main>
  );
};

export default Home;
