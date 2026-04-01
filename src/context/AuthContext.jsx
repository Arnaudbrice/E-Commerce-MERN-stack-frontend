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
    // setIsLoadingAuth(true);
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

      // setUser(userData);

      toast.success("User registered successfully, You Can Login Now!");

      navigate("/login");
    } catch (error) {
      // Network or unknown error
      // normalize to a readable string and avoid "[object Object]"
      const msg =
        error?.message ??
        (typeof error === "string" ? error : String(error)) ??
        "Something went wrong";
      toast.error(msg);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  //********** login **********
  const login = async (formState) => {
    // setIsLoadingAuth(true);
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
      console.log("====================================");
      console.log(userData);
      console.log("====================================");

      if (userData?.role === "admin") {
        toast.success(
          <p>
            Welcome back <span className="font-bold">Admin</span> from Bon
            Marché GmbH!
          </p>,
        );
      } else {
        toast.success(`Welcome back ${userData?.firstName || "User"}!`);
      }
      // toast.success(`Welcome back ${userData?.firstName || "User"}!`);
      navigate("/");
    } catch (error) {
      // server validation error
      // normalize to a readable string and avoid "[object Object]"
      const msg =
        error?.message ??
        (typeof error === "string" ? error : String(error)) ??
        "Something went wrong";
      toast.error(msg);
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
      // redirect to the login page with a state to show a message on the login page
      navigate("/login", { state: { fromLogout: true } });
    } catch (error) {
      // Network or unknown error
      // normalize to a readable string and avoid "[object Object]"
      const msg =
        error?.message ??
        (typeof error === "string" ? error : String(error)) ??
        "Something went wrong";
      toast.error(msg);
    }
  };

  useEffect(() => {
    // a guard to avoid that React Strict Mode calls the effects twice in development mode
    let isMounted = true; // Guard flag
    const getUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (!isMounted) return; //Don't update if unmounted

        if (!response.ok) {
          setUser(null); // Clear user state on failed auth check
          const { message: validationError } = await response.json();

          console.log("Auth check failed:", validationError);
          console.log(window.location.pathname);

          // Only show the toast if not on the login/register/reset pages
          if (
            ![
              "/login",
              "/register",
              "/mail-reset-password",
              "/reset-password",
            ].includes(window.location.pathname)
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
        // normalize to a readable string and avoid "[object Object]"
        const msg =
          error?.message ??
          (typeof error === "string" ? error : String(error)) ??
          "Something went wrong";

        console.log("Auth check error:", msg);
        toast.error(msg);

        setUser(null);
        // navigate("/login");
      } finally {
        // setIsLoadingAuth(false);
        if (isMounted) {
          setIsLoadingAuth(false);
        }
      }
    };
    getUser();
    return () => {
      isMounted = false; //  Cleanup the guard
    };
  }, [baseUrl]);

  const [isAddToFavoritesClicked, setIsAddToFavoritesClicked] = useState(false);

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
          allFavoriteProducts.numberOfFavoriteProducts || 0,
        );
      } catch (error) {
        // normalize to a readable string and avoid "[object Object]"
        const msg =
          error?.message ??
          (typeof error === "string" ? error : String(error)) ??
          "Something went wrong";
        toast.error(msg);
      } finally {
        setIsLoadingFavoriteProducts(false);
      }
    };

    fetchFavoriteProducts();
  }, [baseUrl, user, isAddToFavoritesClicked]);

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
        isAddToFavoritesClicked,
        setIsAddToFavoritesClicked,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
