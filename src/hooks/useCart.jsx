import React, { use } from "react";
import CartContext from "../context/CartContext.jsx";

const useCart = () => {
  const context = use(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a cartContextProvider");
  }

  return context;
};

export default useCart;
