import React, { useContext } from "react";
import { useParams } from "react-router";
import ProductContext from "../context/ProductContext.jsx";

import useProducts from "../hooks/useProducts.jsx";
import Card from "../components/Card";
import NotFound from "./NotFound.jsx";
const Category = () => {
  /* const { products, setProducts } = useContext(ProductContext);
   */
  const { products, setProducts, isLoading } = useProducts();
  const { category } = useParams();
  const filteredProductsByCategory = products.filter(
    (product) => product.category === category
  );

  if (isLoading) {
    return (
      <div role="status" class="max-w-sm animate-pulse">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span class="sr-only">Loading...</span>
      </div>
    );
  }
  if (!filteredProductsByCategory || filteredProductsByCategory.length === 0) {
    return <NotFound />;
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
