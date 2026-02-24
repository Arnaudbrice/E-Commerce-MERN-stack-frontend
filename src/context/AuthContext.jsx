import { useState } from "react";
import { createContext } from "react";

import { useLocation, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [user, setUser] = useState(null);

  //! loading state set it to true initially
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const [isLoadingFavoriteProducts, setIsLoadingFavoriteProducts] =
    useState(true);

  const [error, setError] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [numberOfFavoriteProducts, setNumberOfFavoriteProducts] = useState(0);

  //********** register **********

  const register = async (formState) => {
    setIsLoadingAuth(true);
    try {
      /* Use JSON.stringify to converts the formState object to JSON string and send it as the request body */
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
        credentials: "include",
      });

      if (!response.ok) {
        const { message } = await response.json();
        console.log("error", error);

        await customErrorMessage(message, 8000);

        return;
      }

      //Axios automatically parses JSON — no need for response.json()
      const userData = await response.json();
      console.log("====================================");
      console.log(userData);
      console.log("====================================");

      setUser(userData);

      toast.success("User registered successfully");

      navigate("/login");
    } catch (error) {
      // Network or unknown error
      toast.error(error);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  //********** login **********
  const login = async (formState) => {
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
        credentials: "include",
      });
      console.log("response", response);

      if (!response.ok) {
        const { message: validationError } = await response.json();
        await customErrorMessage(validationError, 7000);
        // setUser(null);
        return;
      }

      const userData = await response.json();

      setUser(userData);

      toast.success(`Welcome back ${userData?.firstName || "User"}!`);
      navigate("/");
    } catch (error) {
      // server validation error
      toast.error(error);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  //********** logout **********
  const logout = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/logout`, {
        method: "Delete",
        credentials: "include",
      });

      setUser(null);

      if (!response.ok) {
        const { message: validationError } = await response.json();
        await customErrorMessage(validationError, 5000);
        return;
      }

      toast.info("Logged out successfully");
      navigate("/login");
    } catch (error) {
      // Network or unknown error
      toast.error(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const { error: validationError } = await response.json();
          console.log(location.pathname);

          // Only show the toast if not on the login/register/reset pages
          if (
            ![
              "/login",
              "/register",
              "/mail-reset-password",
              "/reset-password",
            ].includes(location.pathname)
          ) {
            await customErrorMessage(validationError, 5000);
          }
          return;
        }
        const userData = await response.json();

        // console.log("Fetched user data:", userData);
        setUser(userData);
      } catch (error) {
        // Network or unknown error
        toast.error(error);

        setUser(null);
        // navigate("/login");
      } finally {
        setIsLoadingAuth(false);
      }
    };
    getUser();
  }, [navigate, baseUrl, location.pathname]);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      // Only fetch if user is available, otherwise clear favorites and return
      if (!user) {
        setFavoriteProducts([]);
        setNumberOfFavoriteProducts(0);
        setIsLoadingFavoriteProducts(false); // Ensure loading state is false
        return;
      }
      try {
        const response = await fetch(`${baseUrl}/users/products/favorite`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          const { message: errorMessage } = await response.json();

          await customErrorMessage(errorMessage, 5000);

          return;
        }
        const allFavoriteProducts = await response.json();
        setFavoriteProducts(allFavoriteProducts.favoriteProducts || []);
        setNumberOfFavoriteProducts(
          allFavoriteProducts.numberOfFavoriteProducts || 0
        );
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoadingFavoriteProducts(false);
      }
    };

    fetchFavoriteProducts();
  }, [baseUrl, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoadingAuth,
        setIsLoadingAuth,
        register,
        login,
        logout,
        favoriteProducts,
        setFavoriteProducts,
        numberOfFavoriteProducts,
        setNumberOfFavoriteProducts,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
