import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import ProductContext from "../context/ProductContext.jsx";

import useProducts from "../hooks/useProducts.jsx";
import Card from "../components/Card";
import NotFound from "./NotFound.jsx";
import useAuth from "../hooks/useAuth.jsx";
const Category = () => {
  /* const { products, setProducts } = useContext(ProductContext);
   */

  const navigate = useNavigate();
  const { products, setProducts, searchTerm, setSearchTerm, isLoading } =
    useProducts();

  const { favoriteProducts } = useAuth();
  const { category } = useParams();
  const filteredProductsByCategory = products.filter(
    (product) => product.category === category,
  );

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

  // FIX 1: Simplified condition
  if (!filteredProductsByCategory || !filteredProductsByCategory.length) {
    return (
      <div className="text-center text-xl my-8 flex flex-col items-center justify-center h-full  space-y-8 ">
        <div>
          No products found for the category
          <span className="text-secondary">{category} </span>
        </div>
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => navigate("/")}>
          Back To Home
        </button>
      </div>
    );
  }
  console.log(category);
  return (
    <div className="space-y-8">
      <div className="divider divider-secondary my-8 ">
        {" "}
        <h1 className="text-3xl font-bold text-center ">Category {category}</h1>
      </div>

      {/* search bar */}
      <div className="flex justify-center items-center  mx-auto my-8 ">
        <label className="input input-lg rounded-lg input-bordered ring-1 ring-gray-100 ring-inset glass hover:ring-2 hover:ring-gray-100  ">
          <svg
            className="h-[1em] opacity-50 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      <div className="grid min-h-full  gap-6 mx-0 my-8 text-gray-400  grid-cols-1 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-content-center sm:mx-6 auto-rows-min ">
        {filteredProductsByCategory.map((product) => {
          return (
            <Card
              key={product.id}
              {...product}
              isFavorite={favoriteProducts.some((p) => p._id === product._id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
