import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
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
      /* Axios automatically converts your object to JSON and parses the response for you. */
      const response = await axios.post(`${baseUrl}/auth/register`, formState, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      //Axios automatically parses JSON — no need for response.json()
      const userData = response.data;
      console.log("====================================");
      console.log(userData);
      console.log("====================================");

      setUser(userData);

      navigate("/login");
    } catch (error) {
      // If server returned a validation error (like from Zod)
      if (error.response) {
        const { error: validationError } = error.response.data;
        console.log("Validation error:", validationError);
        await customErrorMessage(validationError, 5000);
      } else {
        // Network or unknown error
        toast.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  //********** login **********
  const login = async (formState) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, formState, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      const userData = response.data;

      setUser(userData);

      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      // server validation error
      if (error.response) {
        const { error: validationError } = error.response.data;
        await customErrorMessage(validationError, 5000);
      } else {
        // Network or unknown error
        toast.error(error);
      }
    }
  };

  //********** logout **********
  const logout = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/auth/logout`, {
        withCredentials: true,
      });

      setUser(null);

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
        const response = await axios.get(`${baseUrl}/auth/me`, {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
        });

        const userData = response.data;

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
