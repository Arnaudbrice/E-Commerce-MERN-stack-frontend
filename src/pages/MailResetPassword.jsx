import React, { useState } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router";
import { customErrorMessage } from "../../utils/customErrorMessage.js";

const MailResetPassword = () => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const [email, setEmail] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsClicked(true);

    try {
      const response = await fetch(`${base_url}/auth/mail-reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      // handle validation errors here
      if (!response.ok) {
        const { message: errorMessage } = await response.json();

        customErrorMessage(errorMessage, 5000);
        return;
      }

      const { message: successMessage } = await response.json();
      toast.success(successMessage);
      navigate("/");
    } catch (error) {
      // handle server errors here
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

        <label htmlFor="email" className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          value={email}
          name="email"
          className="input input-border input-lg w-full mb-6 inset-ring rounded-lg "
          placeholder="you@example.com"
          onChange={handleChange}
          id="email"
        />

        <button
          disabled={isClicked}
          className={`btn btn-primary btn-lg w-full rounded-lg ${isClicked ? "btn-secondary" : "btn-primary"}`}>
          {isClicked ? "Sending..." : "Send Email"}
        </button>
      </fieldset>
    </form>
  );
};

export default MailResetPassword;
