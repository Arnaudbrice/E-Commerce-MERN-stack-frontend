import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.jsx";
import { toast } from "react-toastify";
import { customErrorMessage } from "../../utils/customErrorMessage";
import { useNavigate } from "react-router";

const ContactUs = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const subjects = [
    "Order",
    "Delivery",
    "Invoice & Payment",
    "Return & Refund",
    "Personal Data",
    "Other",
  ];

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fullName = [
      user?.defaultAddress?.firstName,
      user?.defaultAddress?.lastName,
    ]
      //remove falsy values (false, 0, "", null, undefined, NaN) within the array before joining to avoid extra spaces or undefined
      .filter(Boolean)
      .join(" ");
    setFormState((prev) => ({
      ...prev,
      name: prev.name || fullName || "",
      email: prev.email || user?.email || "",
    }));
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  //********** Handle Form Submission **********
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formState.name ||
      !formState.email ||
      !formState.subject ||
      !formState.message
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      setIsSubmitted(true);

      const payload = {
        name: formState.name,
        email: formState.email,
        subject: formState.subject,
        message: formState.message,
      };

      const response = await fetch(`${baseUrl}/users/contact-messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        const { message } = await response.json();
        customErrorMessage(message, 5000);
        return;
      }

      const { message } = await response.json();
      toast.success(message);
      // clear the fields after successful submission
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      navigate("/");
    } catch (error) {
      // normalize to a readable string and avoid "[object Object]"
      const msg =
        error?.message ??
        (typeof error === "string" ? error : String(error)) ??
        "Something went wrong";
      toast.error(msg);
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" h-full flex items-center justify-center bg-base-200 px-4 mb-16">
      <fieldset className="fieldset w-full max-w-2xl text-lg p-8 bg-base-100 border border-white rounded-2xl shadow-lg space-y-4">
        <legend className="fieldset-legend text-2xl font-semibold text-center  border-4 border-double  border-secondary text-base-content rounded-lg p-2 glass">
          Contact Us
        </legend>
        {/* Name */}
        <div className="space-y-2">
          <label className="label text-lg" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formState.name}
            id="name"
            placeholder="Your Name"
            className="input input-border input-lg w-full inset-ring rounded-lg "
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="label text-lg" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formState.email}
            id="email"
            className="input input-border input-lg w-full  inset-ring rounded-lg "
            placeholder="Your Email"
            onChange={handleChange}
          />
        </div>

        {/* Subject (dropdown) */}
        <div className="space-y-2">
          <label className="label text-lg" htmlFor="subject">
            Subject
          </label>

          <select
            id="subject"
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            className="select select-bordered w-full">
            <option value="">--- Select a subject ---</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="label text-lg" htmlFor="message">
            Message
          </label>
          <textarea
            rows={8}
            name="message"
            value={formState.message}
            id="message"
            className="textarea textarea-lg textarea-border  w-full  inset-ring rounded-lg  overflow-y-scroll"
            placeholder="Your Message"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className={`btn  btn-lg rounded-lg ${isSubmitted ? "btn-secondary btn-orange-500" : "btn-secondary"}`}
          disabled={isSubmitted}>
          {isSubmitted ? "Submitting..." : "Submit"}
        </button>
      </fieldset>
    </form>
  );
};

export default ContactUs;
