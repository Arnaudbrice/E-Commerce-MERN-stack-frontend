import React from "react";
import CategoryContext from "../context/CategoryContext.jsx";
import { useContext } from "react";

const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategories must be used within a CategoryContextProvider"
    );
  }
  return context;
};

export default useCategories;
