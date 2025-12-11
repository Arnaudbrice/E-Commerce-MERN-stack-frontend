import React, { useEffect, useState } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Dialog = ({
  id,

  setProduct,
  isUserRatingExists,
  userComment,
  // setIsRatingExists,
}) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [isRatingClicked, setIsRatingClicked] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(userComment || "");

  const [isSavingClicked, setIsSavingClicked] = useState(false);

  // display the dialog when the component is mounted for the first time
  useEffect(() => {
    document.getElementById("my_modal_5").showModal();
  }, []);

  const handleRatingSubmission = async (e) => {
    e.preventDefault();
    console.log("rating.....", rating);

    try {
      const response = await fetch(`${baseUrl}/users/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: Number(rating).toFixed(1),
          comment: comment,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const { message: errorMessage } = await response.json();
        customErrorMessage(errorMessage, 5000);
        document.getElementById("my_modal_5").close();
        return;
      }

      const updatedProduct = await response.json();
      // setProductRating(updatedProduct.averageRating);
      setIsSavingClicked(true);

      setProduct(updatedProduct);
      document.getElementById("my_modal_5").close();
      if (isUserRatingExists) {
        toast.success("Your review has been updated!");
        return;
      }

      toast.success("Your review has been Added Successfully!");

      // setIsRatingExists(updatedProduct.isRatingExists);
    } catch (error) {
      toast.error(error);
    }
  };
  const handleChange = (e) => {
    setRating(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  console.log("rating", parseFloat(rating).toFixed(2));

  return (
    <dialog
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle place-items-center"
      onClick={(e) => {
        // !the dialog cover the full screen and only the modal box is displayed
        // if the user clicks directly on the dialog backdrop(background of the modal box)=outside the modal box → close
        if (e.target === document.getElementById("my_modal_5")) {
          document.getElementById("my_modal_5").close();
        }
      }}>
      <div className="modal-box space-y-8">
        <h3 className="font-bold text-xl text-center border-b border-b-secondary ">
          Your Rating
        </h3>
        <div className="rating rating-lg rating-half">
          {/* name of input from type radio should be the same for all inputs */}
          <input type="radio" name="rating-11" className="rating-hidden" />
          <input
            type="radio"
            name="rating-11"
            className="mask mask-star-2 mask-half-1 bg-secondary"
            aria-label="0.5 star"
            onClick={() => setIsRatingClicked(true)}
            onChange={handleChange}
            value={0.5}
            defaultChecked={rating === 0.5}
          />
          <input
            type="radio"
            name="rating-11"
            className="mask mask-star-2 mask-half-2 bg-secondary"
            aria-label="1 star"
            onClick={() => setIsRatingClicked(true)}
            value={1}
            onChange={handleChange}
            defaultChecked={rating === 1}
          />
          <input
            type="radio"
            name="rating-11"
            className="mask mask-star-2 mask-half-1 bg-secondary"
            aria-label="1.5 star"
            onClick={() => setIsRatingClicked(true)}
            // defaultChecked
            value={1.5}
            onChange={handleChange}
            defaultChecked={rating === 1.5}
          />
          <input
            type="radio"
            name="rating-11"
            className="mask mask-star-2 mask-half-2 bg-secondary"
            aria-label="2 star"
            onClick={() => setIsRatingClicked(true)}
            value={2}
            onChange={handleChange}
            defaultChecked={rating === 2}
          />
          <input
            type="radio"
            name="rating-11"
            className="mask mask-star-2 mask-half-1 bg-secondary"
            aria-label="2.5 star"
            onClick={() => setIsRatingClicked(true)}
            value={2.5}
            defaultChecked={rating === 2.5}
          />
          <input
            type="radio"
            name="rating-11"
            className="mask mask-star-2 mask-half-2 bg-secondary"
            aria-label="3 star"
            onClick={() => setIsRatingClicked(true)}
            value={3}
            onChange={handleChange}
            defaultChecked={rating === 3}
          />
          <input
            type="radio"
            name="rating-11"
            className="mask mask-star-2 mask-half-1 bg-secondary"
            aria-label="3.5 star"
            onClick={() => setIsRatingClicked(true)}
            value={3.5}
            defaultChecked={rating === 3.5}
          />
          <input
            type="radio"
            name="rating-11"
            className="mask mask-star-2 mask-half-2 bg-secondary"
            aria-label="4 star"
            onClick={() => setIsRatingClicked(true)}
            value={4}
            onChange={handleChange}
            defaultChecked={rating === 4}
          />
          <input
            type="radio"
            name="rating-11"
            className="mask mask-star-2 mask-half-1 bg-secondary"
            aria-label="4.5 star"
            onClick={() => setIsRatingClicked(true)}
            value={4.5}
            onChange={handleChange}
            defaultChecked={rating === 4.5}
          />
          <input
            type="radio"
            name="rating-11"
            className="mask mask-star-2 mask-half-2 bg-secondary"
            aria-label="5 star"
            onClick={() => setIsRatingClicked(true)}
            value={5}
            onChange={handleChange}
            defaultChecked={rating === 5}
          />
        </div>

        {isRatingClicked && (
          <textarea
            rows={6}
            placeholder="Write A Review About This Product"
            className="textarea textarea-secondary textarea-lg w-full "
            onChange={handleCommentChange}
            value={comment}
          />
        )}
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            {/* <button className="btn btn-lg bg-secondary hover:scale-105 hover:drop-shadow-[0_0_10px_gray]  border rounded-lg "> */}
            <button
              onClick={handleRatingSubmission}
              className="btn btn-lg btn-secondary rounded-lg"
              disabled={isSavingClicked}>
              {isSavingClicked ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Dialog;
