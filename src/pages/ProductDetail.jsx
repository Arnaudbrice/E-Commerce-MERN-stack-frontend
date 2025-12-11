import React, { useEffect, useState } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import useCart from "../hooks/useCart.jsx";
import ButtonGroup from "../components/ButtonGroup.jsx";
import Dialog from "../components/Dialog.jsx";
import useProducts from "../hooks/useProducts.jsx";
import Rating from "../components/Rating.jsx";
import useAuth from "../hooks/useAuth.jsx";

const ProductDetail = () => {
  const location = useLocation(); // Initialize useLocation hook
  // access the passed state data
  const { quantityInCart, stock, title, price, description, category, image } =
    location.state || {};

  console.log("location.state", location.state);

  // retrieve the id of the product from the url params
  const { id } = useParams();

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [isClicked, setIsClicked] = useState(false);
  // const [productQuantity, setProductQuantity] = useState(0);

  const [isUserRatingExists, setIsUserRatingExists] = useState(false);
  const [userComment, setUserComment] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    cartList,
    setCartList,
    addProductToCart,
    decreaseProductQuantity,
    removeProductFromCart,
    cartProductsQuantity,
    setCartProductsQuantity,
    clearCart,
  } = useCart();

  const { user } = useAuth();

  console.log("user************", user);
  const [quantity, setQuantity] = useState(() => {
    return quantityInCart || 0;
  });

  console.log("quantity", quantity);

  // update quantity in cart
  useEffect(() => {
    // console.log("cartList products 2", cartList.products);

    const productQuantity = cartList.products?.find(
      (item) => item.productId._id === id
    )?.quantity;

    // console.log("productQuantity", productQuantity);
    setQuantity(productQuantity || 0);
  }, [cartList, id]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${baseUrl}/users/products/${id}`, {
        method: "GET",
        credentials: "include",
      });

      try {
        if (!response.ok) {
          const { message: errorMessage } = await response.json();
          customErrorMessage(errorMessage, 5000);
          return;
        }

        const product = await response.json();
        console.log("product###########", product);

        const review = product.reviews.find(
          (review) => review.user.toString() === user?._id.toString()
        );

        console.log("review now************", review);
        if (review) {
          setIsUserRatingExists(true);
          setUserComment(review.comment);
        }
        setProduct(product);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [baseUrl, id, user]);

  const handleAddToCartButtonClick = async (e, id) => {
    e.stopPropagation(); // <--- Stop event propagation here

    await addProductToCart(id, quantity + 1);
  };

  //********** add to cart list **********
  const handleAddToCartList = async (e, id) => {
    e.stopPropagation(); // <--- Stop event propagation here

    if (quantity === stock) {
      toast.error("Product is out of stock");
      return;
    }

    await addProductToCart(id, quantity + 1);
    // await getProductFromCart(id);
  };

  //********** remove from cart **********
  const handleRemoveFromCartList = async (e, id) => {
    e.stopPropagation(); // <--- Stop event propagation here

    console.log("quantity", quantity);
    if (quantity === 0) {
      return;
    }

    if (quantity === 1) {
      // setQuantity(0);

      console.log("quantity 1", quantity);
      console.log("id", id);

      await removeProductFromCart(id);

      setQuantity(0);

      // await decreaseProductQuantity(id, quantity - 1);

      return;
    }

    await decreaseProductQuantity(id, quantity - 1);
  };

  const handleShowDialog = () => {
    setIsDialogOpen(true);
    // document.getElementById("my_modal_5").showModal();
    document.getElementById("my_modal_5")?.showModal();
  };

  if (isLoading) {
    return (
      <div className="flex w-5/6 flex-col gap-4 justify-center items-center mx-auto">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 bg-emerald-100 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20 bg-emerald-100"></div>
            <div className="skeleton h-4 w-28 bg-emerald-100"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full bg-emerald-100"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="card card-md sm:card-lg  bg-base-100  shadow-sm  transition-transform duration-200 hover:scale-101 hover:drop-shadow-[0_0_10px_gray]  border rounded-lg mx-auto w-5/6 my-6 ">
        <figure>
          <img
            className="block object-contain w-full bg-white h-52 aspect-square"
            src={image}
            alt={title}
          />
        </figure>
        <div className="p-4  card-body  flex-none">
          <h2 className="  text-balance text-center  card-title justify-center p-2  w-full ">
            {title}
          </h2>
          {/* rating */}

          {/* 1-add defaultChecked to the rating to be displayed

           2-get the nearest half number of the rating (Math.round(2.33*2)/2)*/}

          <div className="flex justify-start items-center">
            <Rating productRating={product.averageRating} readOnly={true} />
            {/*  <span className=" text-secondary px-2 "> ({numberOfRatings})</span> */}
            <span className=" text-secondary px-2 ">
              {" "}
              ({product.reviews.length})
            </span>
          </div>
          {/* product bewerten */}
          <div>
            {isUserRatingExists ?
              <button
                className="btn btn-primary btn-sm"
                onClick={handleShowDialog}>
                ☆ Update Your Review
              </button>
            : <button
                className="btn btn-primary btn-sm"
                onClick={handleShowDialog}>
                ☆ Rate Article
              </button>
            }
            {/* <button
              className="btn btn-primary btn-sm"
              onClick={handleShowDialog}>
              ☆ Rate Article
            </button> */}
          </div>

          {/* description */}
          <p>{description}</p>
          {/* glass should be the last class to make it work */}
          <p className=" badge badge-lg badge-outline badge-primary w-[100px] text-white flex-none glass">
            {Number(price).toFixed(2)}
            {" €"}
          </p>
          <div className="items-center justify-between w-full card-actions ">
            <Link
              className="my-4 p-2 text-xs hover:link sm:my-none"
              to={`/category/${category}`}>
              More from {category}
            </Link>
            {!quantity ?
              <button
                onClick={(e) => handleAddToCartButtonClick(e, id)}
                className="btn btn-primary ">
                Add To Cart
              </button>
            : <ButtonGroup
                quantity={quantity}
                stock={stock}
                handleAdd={(e) => handleAddToCartList(e, id)}
                handleRemove={(e) => handleRemoveFromCartList(e, id)}
              />
            }
          </div>
          <button
            className="btn btn-secondary  w-5/6 mx-auto"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/cart");
            }}>
            Go to Cart
          </button>
        </div>
      </div>

      {/* Dialog */}

      {isDialogOpen && (
        <Dialog
          id={id}
          setProduct={setProduct}
          // setIsRatingExists={setIsRatingExists}
          isUserRatingExists={isUserRatingExists}
          userComment={userComment}
        />
      )}

      <div className="divider divider-secondary text-xl my-12">Reviews</div>

      <div className="flex flex-col space-y-8 justify-center items-start p-2 border border-base-content/10 rounded-lg">
        {product?.reviews?.length > 0 &&
          product.reviews.map((review) => {
            return (
              <div className="space-y-2" key={review._id}>
                <Rating productRating={review.rating} readOnly={true} />
                <p>{review.comment}</p>
                <p className="opacity-50">
                  Review From A Verified Buyer{" "}
                  {!setIsUserRatingExists ? "created" : "updated"} on{" "}
                  {!setIsUserRatingExists ?
                    review.createdAt.split("T")[0]
                  : review.updatedAt.split("T")[0]}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductDetail;
