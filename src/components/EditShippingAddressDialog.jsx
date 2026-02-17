import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { customErrorMessage } from "../../utils/customErrorMessage";

const EditShippingAddressDialog = ({
  isEditButtonClicked,
  setIsEditButtonClicked,
  userAddress,
  setUserAddress,
}) => {
  const [isSavingClicked, setIsSavingClicked] = useState(false);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && isEditButtonClicked) {
      dialog.showModal();

      const handleClose = () => setIsEditButtonClicked(false);

      dialog.addEventListener("close", handleClose);

      // cleanmup function to remove the event listener when the component unmounts or when isEditButtonClicked changes
      return () => dialog.removeEventListener("close", handleClose);
    }
  }, [isEditButtonClicked, setIsEditButtonClicked]);

  const handleEditAddressSubmission = async (e) => {
    e.preventDefault();

    try {
      if (
        !formState.firstName ||
        !formState.lastName ||
        !formState.streetAddress ||
        !formState.city ||
        !formState.zipCode ||
        !formState.country
      ) {
        toast.error("Please fill in all required fields.", { autoClose: 5000 });
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/shippingAddress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formState),
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        customErrorMessage(message, 5000);
        return;
      }

      const { user: data } = await response.json();
      console.log("data", data);
      setFormState({
        firstName: data.addresses[data.addresses.length - 1].firstName,
        lastName: data.addresses[data.addresses.length - 1].lastName,
        streetAddress: data.addresses[data.addresses.length - 1].streetAddress,
        city: data.addresses[data.addresses.length - 1].city,
        zipCode: data.addresses[data.addresses.length - 1].zipCode,
        country: data.addresses[data.addresses.length - 1].country,
      });

      setUserAddress(data.addresses[data.addresses.length - 1]);

      dialogRef.current.close();
    } catch (error) {
      toast.error(
        error.message || "An error occurred while saving the address.",
        { autoClose: 5000 }
      );
    } finally {
      setIsSavingClicked(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

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
          Add Shipping Address
        </h3>
        <div className="modal-action">
          <form
            // method="dialog"
            onSubmit={handleEditAddressSubmission}
            className="dialog-form space-y-2  w-full max-w-md">
            {/* if there is a button in form, it will close the modal */}

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
              className="input w-full"
              name="country"
              value={formState.country}
              onChange={handleChange}
              required
              id="country">
              <option value="">Select Country</option>
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

export default EditShippingAddressDialog;
