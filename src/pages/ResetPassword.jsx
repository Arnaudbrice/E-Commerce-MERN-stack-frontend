import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { customErrorMessage } from "../../utils/customErrorMessage";
import { toast } from "react-toastify";

const ResetPassword = () => {
  // grab the token from the url params
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsClicked(true);

    // console.log("passwordResetToken", token);
    try {
      const response = await fetch(`${baseUrl}/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        credentials: "include",
      });

      if (!response.ok) {
        const { message: errorMessage } = await response.json();
        customErrorMessage(errorMessage, 5000);
        return;
      }
      const { message } = await response.json();
      toast.success(message);

      navigate("/login");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="  h-full flex items-center justify-center bg-base-200 px-4">
      <fieldset className="fieldset w-full max-w-xl text-lg p-8 bg-base-100 border border-white rounded-2xl shadow-lg">
        <legend className="fieldset-legend text-2xl font-semibold text-center mb-4 border-4 border-double  border-fuchsia-400  text-base-content rounded-lg p-4">
          Reset Password
        </legend>

        <label htmlFor="password" className="label">
          <span className="label-text">Password</span>
        </label>
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            className="input input-border input-lg w-full  inset-ring rounded-lg"
            placeholder="enter new password"
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
          {isClicked ? "Resetting..." : "Reset Password"}
        </button>
      </fieldset>
    </form>
  );
};

export default ResetPassword;
