import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import ProductContext from "../context/ProductContext.jsx";

import useProducts from "../hooks/useProducts.jsx";
import Card from "../components/Card";
import NotFound from "./NotFound.jsx";
const Category = () => {
  /* const { products, setProducts } = useContext(ProductContext);
   */

  const navigate = useNavigate();
  const { products, setProducts, isLoading } = useProducts();
  const { category } = useParams();
  const filteredProductsByCategory = products.filter(
    (product) => product.category === category
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
    <div>
      <div className="divider divider-secondary my-8 ">
        {" "}
        <h1 className="text-3xl font-bold text-center ">Category {category}</h1>
      </div>

      <div className="grid min-h-full grid-cols-2 gap-6 mx-0 my-8 text-gray-400 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-content-center sm:mx-6 auto-rows-min ">
        {filteredProductsByCategory.map((product) => {
          return <Card key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
};

export default Category;
