import React, { useContext } from "react";

import ProductContext from "../context/ProductContext.jsx";
const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};

export default useProducts;
