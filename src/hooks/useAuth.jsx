import React from "react";
import AuthContext from "../context/AuthContext.jsx";
import { use } from "react";

const useAuth = () => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};

export default useAuth;
