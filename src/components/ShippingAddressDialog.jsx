import { useEffect, useRef } from "react";

const ShippingAddressDialog = ({
  user,
  handleChooseShippingAddress,
  isShippingAddressDialogOpen,
  setIsShippingAddressDialogOpen,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && isShippingAddressDialogOpen) {
      dialog.showModal();
      const handleClose = () => setIsShippingAddressDialogOpen(false);
      dialog.addEventListener("close", handleClose);

      // cleanup function to remove the event listener when the component unmounts or when isShippingAddressDialogOpen changes
      return () => dialog.removeEventListener("close", handleClose);
    }
  }, [isShippingAddressDialogOpen, setIsShippingAddressDialogOpen]);

  const handleChooseButtonClick = (e, address) => {
    e.preventDefault();
    handleChooseShippingAddress(address);
    setIsShippingAddressDialogOpen(false);
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
      <div className="modal-box space-y-4 grid grid-cols-1 place-items-center border border-secondary  rounded-lg ">
        <h3 className=" w-full divider divider-secondary font-bold text-xl text-center ">
          Change Shipping Addresses
        </h3>
        <div className="modal-action grid grid-cols-1 w-full overflow-y-auto h-96 space-y-4 my-8 pb-4  ">
          {/* <div className="overflow-y-auto h-96 space-y-4 my-8 pb-4 rounded-2xl border-white/50 border-2 "> */}
          {/* <h2 className="text-lg text-center font-bold bg-gray-700/50 rounded-tl-2xl rounded-tr-2xl py-4 ">
              Change Shipping Addresses
            </h2> */}
          {user?.addresses && user.addresses.length > 0 ?
            user.addresses.map((address) => {
              console.log("address", address);
              return (
                <div
                  key={address._id}
                  className="border border-gray-700 p-6 rounded-lg space-y-4 ">
                  <div className="flex justify-between items-center text-gray-500 ">
                    <span className="text-md">
                      {address.label === "Home" ? "Home" : address.label}
                    </span>
                  </div>
                  <p className="font-semibold">
                    {address?.firstName && address.firstName + " "}
                    {address?.lastName && address.lastName}
                  </p>
                  <p className="text-md text-gray-600 dark:text-gray-300">
                    {address.streetAddress ?
                      address.streetAddress.replace(",", "") + ", "
                    : ""}
                    {address?.zipCode && address.zipCode + " "}
                    {address?.city && address.city + ", "}
                    {address?.state && address.state + " "}
                    {address?.country && address.country}
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => handleChooseButtonClick(e, address)}
                      className="
                       btn btn-outline btn-outline-primary rounded-lg"
                      type="button">
                      Choose This Address
                    </button>
                  </div>
                </div>
              );
            })
          : <p className="text-center text-gray-500">
              No shipping addresses found. Please add a shipping address
            </p>
          }
          {/* </div> */}
        </div>
      </div>
    </dialog>
  );
};

export default ShippingAddressDialog;
