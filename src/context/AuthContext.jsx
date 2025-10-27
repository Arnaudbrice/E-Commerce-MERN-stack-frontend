import { useState } from "react";
import { createContext } from "react";

import { useNavigate } from "react-router";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  //********** register **********

  const register = async (formState) => {
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
      setIsLoading(false);
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
        return;
      }

      const userData = await response.json();

      setUser(userData);

      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      // server validation error
      toast.error(error);
    } finally {
      setIsLoading(false);
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

      toast.success("Logged out successfully");
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
          await customErrorMessage(validationError, 5000);
          return;
        }
        const userData = await response.json();

        console.log("Fetched user data:", userData);
        setUser(userData);
      } catch (error) {
        // Network or unknown error
        toast.error(error);

        setUser(null);
        // navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [navigate, baseUrl]);

  return (
    <AuthContext value={{ user, setUser, isLoading, register, login, logout }}>
      {children}
    </AuthContext>
  );
};

export default AuthContext;
