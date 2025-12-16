import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useProducts from "../hooks/useProducts.jsx";
import ButtonGroup from "./ButtonGroup.jsx";
import useAuth from "../hooks/useAuth.jsx";
import useCart from "../hooks/useCart.jsx";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import Rating from "./Rating.jsx";

const Card = ({
  _id,
  title,
  price,
  description,
  category,
  image,
  stock,
  isFavorite,
  averageRating,
  reviews,
  children,
}) => {
  /*  const {
    cartProductsQuantity,
    setCartProductsQuantity,
    cartList,
    setCartList,
  } = useProducts(); */

  const {
    cartList,
    setCartList,
    addProductToCart,
    removeProductFromCart,
    isLoadingCart,
    cartProductsQuantity,
    setCartProductsQuantity,

    decreaseProductQuantity,
  } = useCart();

  const { isLoading } = useProducts();

  // console.log("cartList products 1", cartList.products);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const { user, setNumberOfFavoriteProducts } = useAuth();

  const [quantity, setQuantity] = useState(0);
  // const [productQuantity, setProductQuantity] = useState(0);

  const [isFavoriteClicked, setIsFavoriteClicked] = useState(isFavorite);
  useEffect(() => {
    // console.log("cartList products 2", cartList.products);

    const productQuantity = cartList.products?.find(
      (item) => item.productId._id === _id
    )?.quantity;

    // console.log("productQuantity", productQuantity);
    setQuantity(productQuantity || 0);
  }, [cartList, _id]);

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

      return;
    }

    await decreaseProductQuantity(id, quantity - 1);
  };

  const handleClick = (id) => {
    navigate(`/product/${id}`, {
      state: {
        quantityInCart: quantity,
        stock: stock,
        title: title,
        price: price,
        description: description,
        category: category,
        image: image,
      },
    });
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();

    try {
      const response = await fetch(
        `${baseUrl}/users/products/${_id}/favorite`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            isFavorite: !isFavoriteClicked,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const { message: errorMessage } = await response.json();
        customErrorMessage(errorMessage, 5000);
        return;
      }

      const updatedProduct = await response.json();
      setIsFavoriteClicked(updatedProduct.isFavorite);

      /*  setNumberOfFavoriteProducts((prev) =>
        updatedProduct.isFavorite ?
          (prev || 0) + 1
        : Math.max(0, (prev || 0) - 1)
      ); */

      setNumberOfFavoriteProducts((prev) => {
        return updatedProduct.isFavorite ? prev + 1 : prev - 1;
      });

      if (updatedProduct.isFavorite) {
        toast.info("Product Successfully Added To Your Favorite List");
      } else {
        toast.info("Product Successfully Deleted From Your Favorite List");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full dark:bg-gray-700 "></div>
        <div className="skeleton h-4 w-28 dark:bg-gray-700 "></div>
        <div className="skeleton h-4 w-full dark:bg-gray-700 "></div>
        <div className="skeleton h-4 w-full dark:bg-gray-700 "></div>
      </div>
    );
  }

  return (
    <div
      onClick={() => handleClick(_id)}
      className="
    card card-xs
    w-full max-w-xs mx-auto
    sm:card-sm sm:max-w-sm
    lg:card-lg
    bg-base-100
    shadow-sm border rounded-lg
    transition-transform duration-200
    hover:scale-105 hover:drop-shadow-[0_0_10px_gray]
  ">
      <div>
        <figure className="flex-col relative ">
          <img
            className="block object-contain h-48 w-full bg-white aspect-square rounded-t-lg "
            src={image}
            alt={title}
          />

          {/* Favourite icon */}

          {isFavoriteClicked && user ?
            <MdFavorite
              onClick={(e) => handleFavoriteClick(e)}
              className="  size-10 object-cover absolute top-0 right-0 text-secondary "
            />
          : <MdFavoriteBorder
              onClick={(e) => handleFavoriteClick(e)}
              className=" size-10 object-cover absolute top-0 right-0  text-secondary "
            />
          }

          {/* <img
            src={isFavoriteClicked ? <MdFavorite /> : <MdFavoriteBorder />}

          /> */}
        </figure>
      </div>

      <div className=" card-body p-2 sm:p-4 text-center ">
        <h2 className=" line-clamp-2 min-h-[4rem] text-balance text-white text-center  card-title justify-center px-2  w-full flex-none">
          {title}
        </h2>

        <div className="flex justify-start items-center w-full ">
          <Rating productRating={averageRating} readOnly={true} />
          {/*  <span className=" text-secondary px-2 "> ({numberOfRatings})</span> */}

          <span
            onClick={() => navigate(`/product/${_id}`)}
            className=" text-secondary text-lg px-2 hover:cursor-pointer hover:underline font-bold ">
            ( {reviews.length})
          </span>
        </div>

        {/* glass should be the last class to make it work */}
        <p className=" badge badge-lg badge-outline badge-primary text-white w-[100px] flex-none px-12 text-xl glass">
          {Number(price).toFixed(2)}
          {" €"}
        </p>

        <div className="items-center justify-between w-full card-actions  flex-col  h-full ">
          <Link
            className="  text-xs hover:link ml-auto text-gray-300 "
            to={`/category/${category}`}
            onClick={(e) => e.stopPropagation()}>
            More from {category}
          </Link>
          {!quantity ?
            <button
              onClick={(e) => handleAddToCartButtonClick(e, _id)}
              className="btn btn-secondary mb-8">
              Add To Cart
            </button>
          : <ButtonGroup
              quantity={quantity || 0}
              stock={stock}
              handleAdd={(e) => handleAddToCartList(e, _id)}
              handleRemove={(e) => handleRemoveFromCartList(e, _id)}
            />
          }
        </div>
        <button
          className="btn btn-outline btn-secondary  w-5/6 mx-auto"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/cart");
          }}>
          Go to Cart
        </button>
      </div>

      {children}
    </div>
  );
};

export default Card;
