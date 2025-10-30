import React, { use } from "react";
import CategoryContext from "../context/CategoryContext.jsx";

const useCategories = () => {
  const context = use(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategories must be used within a CategoryContextProvider"
    );
  }
  return context;
};

export default useCategories;
