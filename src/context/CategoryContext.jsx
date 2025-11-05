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

        if (!response.ok) {
          const { message: errorMessage } = await response.json();
          customErrorMessage(errorMessage, 5000);
        }
        const categoriesData = await response.json();

        setCategories(categoriesData);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchCategories();
  }, [baseUrl, user]);

  return (
    <CategoryContext value={{ categories, setCategories }}>
      {children}
    </CategoryContext>
  );
};

export default CategoryContext;
