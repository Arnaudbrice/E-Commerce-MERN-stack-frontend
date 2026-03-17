import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { customErrorMessage } from "../../utils/customErrorMessage";
import useAuth from "../hooks/useAuth.jsx";
const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const { user, setUser } = useAuth();
  const [categories, setCategories] = useState([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    let isMounted = true; //the guard to avoid that the effect is called twice in development mode
    const fetchCategories = async () => {
      /*  if (!user) {
        return;
      } */
      try {
        const response = await fetch(`${baseUrl}/users/products/categories`, {
          method: "GET",
          credentials: "include",
          /*  headers: {
            "Content-Type": "application/json",
          }, */
        });

        if (!isMounted) return; //  Guard: don't proceed if unmounted

        if (!response.ok) {
          const { message: errorMessage } = await response.json();
          customErrorMessage(errorMessage, 5000);
        }
        const categoriesData = await response.json();

        console.log("categoriesData", categoriesData);

        setCategories(categoriesData);
      } catch (error) {
        // normalize to a readable string and avoid "[object Object]"
        const msg =
          error?.message ??
          (typeof error === "string" ? error : String(error)) ??
          "Something went wrong";
        toast.error(msg);
      }
    };
    fetchCategories();
    return () => {
      isMounted = false; //clean the guard
    };
  }, [baseUrl, user]);

  return (
    <CategoryContext value={{ categories, setCategories }}>
      {children}
    </CategoryContext>
  );
};

export default CategoryContext;
