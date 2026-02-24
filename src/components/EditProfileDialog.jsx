import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth.jsx";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import { useLocation } from "react-router";

const EditProfileDialog = ({ isEditButtonClicked, setIsEditButtonClicked }) => {
  const location = useLocation();
  const dialogRef = useRef(null);
  const [isSavingClicked, setIsSavingClicked] = useState(false);
  const { user, setUser } = useAuth();
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && isEditButtonClicked) {
      dialog.showModal();

      const handleClose = () => setIsEditButtonClicked(false);
      dialog.addEventListener("close", handleClose);

      return () => {
        dialog.removeEventListener("close", handleClose);
      };
    }
  }, [isEditButtonClicked, setIsEditButtonClicked]);

  // Populate form state with user data (autofilling the form fields with the current user data)
  useEffect(() => {
    const userAddress = user?.addresses?.find(
      (address) => address.label === "Home"
    );

    console.log("User data in EditProfileDialog useEffect", user);
    if (userAddress || user) {
      setFormState({
        email: user?.email || "",
        firstName: userAddress?.firstName || "",
        lastName: userAddress?.lastName || "",
        companyName: userAddress?.companyName || "",
        phone: userAddress?.phone || "",
        streetAddress: userAddress?.streetAddress || "",
        city: userAddress?.city || "",
        state: userAddress?.state || "",
        zipCode: userAddress?.zipCode || "",
        country: userAddress?.country || "",
      });
    }
  }, [user]);

  {
    /***********handle edit profile submission ***********/
  }
  const handleEditProfileSubmission = async (e) => {
    e.preventDefault();
    console.log("Edit Profile Submission clicked");
    setIsSavingClicked(true);

    try {
      // phone number, firstname and lastname are required for admin
      if (
        user.role === "admin" &&
        (!formState.email ||
          !formState.companyName ||
          !formState.streetAddress ||
          !formState.city ||
          !formState.state ||
          !formState.zipCode ||
          !formState.country)
      ) {
        toast.error("Please fill in all required fields for admin");
        return;
      }

      // phone number and company name are required for regular users
      if (
        user.role !== "admin" &&
        (!formState.email ||
          !formState.firstName ||
          !formState.lastName ||
          !formState.streetAddress ||
          !formState.city ||
          !formState.state ||
          !formState.zipCode ||
          !formState.country)
      ) {
        toast.error("Please fill in all required fields");
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...formState,
            label: "Home", //Address added within the profile page is always labeled as "Home"
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        customErrorMessage(message, 5000);
        return;
      }

      const { user: data } = await response.json();

      console.log("Profile update response data", data);

      const userAddress = data?.addresses?.find(
        (address) => address.label === "Home"
      );

      setFormState((prev) => {
        return {
          ...prev,
          email: data?.email || "",
          firstName: userAddress?.firstName || "",
          lastName: userAddress?.lastName || "",
          companyName: userAddress?.companyName || "",
          phone: userAddress?.phone || "",
          streetAddress: userAddress?.streetAddress || "",
          city: userAddress?.city || "",
          state: userAddress?.state || "",
          zipCode: userAddress?.zipCode || "",
          country: userAddress?.country || "",
        };
      });

      setUser(data);

      // document.getElementById("edit_profile_modal").close();
      dialogRef.current.close();

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsSavingClicked(false); // Always set back to false when done
    }
  };

  {
    /***********handle change within the form ***********/
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  if (!user) {
    return null; // oder ein Spinner/Loading
  }

  return (
    <dialog
      id="edit_profile_modal"
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle place-items-center"
      onClick={(e) => {
        // !the dialog cover the full screen and only the modal box is displayed
        // if the user clicks directly on the dialog backdrop(background of the modal box)=outside the modal box → close
        if (e.target === dialogRef.current) {
          dialogRef.current.close();
          // setIsSavingClicked(false);
        }
      }}>
      <div className="modal-box space-y-4 grid grid-cols-1 place-items-center border-2 border-secondary  rounded-lg ">
        {/* <h3 className="font-bold text-xl text-center border-b border-b-secondary ">
          Edit Your Profile
        </h3> */}

        <h3 className=" w-full divider divider-secondary font-bold text-xl text-center ">
          Edit Your Profile
        </h3>
        <div className="modal-action">
          <form
            // method="dialog"
            onSubmit={handleEditProfileSubmission}
            className="dialog-form space-y-2  w-full max-w-md">
            {/* if there is a button in form, it will close the modal */}

            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input w-full"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Email"
              id="email"
            />

            {user.role !== "admin" && (
              <>
                <label className="label" htmlFor="firstName">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  className="input w-full"
                  type="text"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  id="firstName"
                />
                <label className="label" htmlFor="lastName">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  className="input w-full"
                  type="text"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  id="lastName"
                />
              </>
            )}

            <label className="label" htmlFor="companyName">
              <span className="label-text">Company Name</span>
            </label>
            <input
              className="input w-full"
              type="text"
              name="companyName"
              value={formState.companyName}
              onChange={handleChange}
              placeholder="Company Name (optional)"
              id="companyName"
            />

            <label className="label" htmlFor="phone">
              <span className="label-text">Phone</span>
            </label>

            <input
              className="input w-full"
              type="tel"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              // pattern="^\\+?[0-9]{7,20}$"
              pattern="\+?[0-9]{7,20}"
              minLength={7}
              maxLength={20}
              title="Please enter a valid phone number (digits, +, -, parentheses allowed)"
              id="phone"
              placeholder="Enter your phone number (optional)"
            />
            <label className="label" htmlFor="streetAddress">
              <span className="label-text">Street Address</span>
            </label>
            <input
              className="input w-full"
              type="text"
              name="streetAddress"
              value={formState.streetAddress}
              onChange={handleChange}
              placeholder="Street Address"
              id="streetAddress"
            />
            <label className="label" htmlFor="city">
              <span className="label-text">City</span>
            </label>
            <input
              className="input w-full"
              type="text"
              name="city"
              value={formState.city}
              onChange={handleChange}
              placeholder="City"
              id="city"
            />
            <label className="label" htmlFor="state">
              <span className="label-text">State/Province/Region</span>
            </label>
            <input
              className="input w-full"
              type="text"
              name="state"
              value={formState.state}
              onChange={handleChange}
              placeholder="State/Province/Region"
              id="state"
            />
            <label className="label" htmlFor="zipCode">
              <span className="label-text">Zip Code</span>
            </label>
            <input
              className="input w-full"
              type="text"
              name="zipCode"
              value={formState.zipCode}
              onChange={handleChange}
              placeholder="Zip Code"
              id="zipCode"
            />
            {/* <input
    className="input w-full"
    type="text"
    name="country"
    value={formState.country}
    onChange={handleChange}
    placeholder="Country"
  /> */}
            <label htmlFor="country" className="label">
              <span className="label-text">Country</span>
            </label>
            <select
              className="select input w-full"
              name="country"
              value={formState.country}
              onChange={handleChange}
              required
              id="country">
              <option value="">--Select Country--</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="United States">United States</option>
              <option value="Spain">Spain</option>
              <option value="Italy">Italy</option>
              <option value="Australia">Australia</option>
              <option value="Japan">Japan</option>
              <option value="China">China</option>

              {/* Add more countries as needed */}
            </select>
            <button
              type="submit"
              className="btn btn-lg btn-secondary rounded-lg mt-4"
              disabled={isSavingClicked}>
              {isSavingClicked ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EditProfileDialog;
