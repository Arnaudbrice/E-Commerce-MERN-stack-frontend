import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage";
import { toast } from "react-toastify";

const ChooseStatusDialog = ({
  orderId,
  isDialogOpen,
  setIsDialogOpen,
  onStatusUpdate,
}) => {
  const dialogRef = useRef(null);

  const [status, setStatus] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && isDialogOpen) {
      dialog.showModal();

      const handleClose = () => setIsDialogOpen(false);
      dialog.addEventListener("close", handleClose);

      return () => {
        dialog.removeEventListener("close", handleClose);
      };
    }
  }, [isDialogOpen, setIsDialogOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    setIsSubmitting(true);
    console.log("status:", status);
    try {
      const response = await fetch(`${baseUrl}/users/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const { message } = await response.json();
        customErrorMessage(message, 5000);
        return;
      }

      const { message, status: newStatus } = await response.json();
      toast.success(message);

      // Update the status in the parent component
      if (onStatusUpdate) {
        onStatusUpdate(orderId, newStatus);
      }

      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="dialog_Status"
      className="modal modal-bottom sm:modal-middle no-modal-bg place-items-center"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          dialogRef.current.close();
        }
      }}>
      <div className="modal-box space-y-2 grid grid-cols-1 place-items-center border-2 border-secondary  rounded-lg">
        <h3 className="font-bold text-lg">Change Order Status</h3>

        <div className="modal-action">
          <form
            onSubmit={handleSubmit}
            className="dialog-form space-y-2  w-full max-w-md ">
            <label htmlFor="status" className="label">
              <span className="label-text">Status</span>
            </label>

            <select
              className=" input select w-full"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              id="status">
              <option value="">--Select Status--</option>
              <option value="cancelled">Cancelled</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>

            {/* if there is a button in form, it will close the modal */}
            <button type="submit" className="btn btn-primary w-fit mt-2">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ChooseStatusDialog;
