import React from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth.jsx";
import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login, user, isLoadingAuth } = useAuth();
  const [isClicked, setIsClicked] = useState(false);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsClicked(true);

    try {
      await login(formState);
    } finally {
      setIsClicked(false);
    }
  };

  if (user) {
    navigate("/");
  }

  if (isLoadingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="  h-full flex items-center justify-center bg-base-200 px-4">
      <fieldset className="fieldset w-full max-w-xl text-lg p-8 bg-base-100 border border-white rounded-2xl shadow-lg">
        <legend className="fieldset-legend text-2xl font-semibold text-center mb-4 border-4 border-double  border-fuchsia-400  text-base-content rounded-lg p-4">
          Login
        </legend>

        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          value={formState.email}
          name="email"
          className="input input-border input-lg w-full mb-6 inset-ring rounded-lg "
          placeholder="you@example.com"
          onChange={handleChange}
        />

        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formState.password}
            className="input input-border input-lg w-full  inset-ring rounded-lg"
            placeholder="enter your password"
            onChange={handleChange}
          />

          {showPassword ?
            <Eye
              size={22}
              className="absolute right-4 top-1/2 -translate-y-1/2  cursor-pointer z-30"
              onClick={() => setShowPassword(!showPassword)}
            />
          : <EyeOff
              size={22}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer z-30"
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        </div>

        <button
          disabled={isClicked}
          className={`btn btn-primary btn-lg w-full rounded-lg ${isClicked ? "btn-secondary" : "btn-primary"}`}>
          {isClicked ? "Logging in..." : "Login"}
        </button>

        <p className="text-lg text-center text-base-content/70 mt-4">
          Don’t have an account?{" "}
          <Link className="link link-primary" to={"/register"}>
            Sign Up
          </Link>
        </p>

        <p className="text-lg text-center text-base-content/70 mt-4">
          Forget your password?{" "}
          <Link className="link link-primary" to={"/mail-reset-password"}>
            Reset Password
          </Link>
        </p>
      </fieldset>
    </form>
  );
};

export default Login;
