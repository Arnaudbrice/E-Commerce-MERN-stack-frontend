import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useProducts from "../hooks/useProducts.jsx";
import ButtonGroup from "./ButtonGroup.jsx";
import useAuth from "../hooks/useAuth.jsx";
import useCart from "../hooks/useCart.jsx";

const Card = ({ _id, title, price, description, category, image, stock }) => {
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

    decreaseProductQuantity,
  } = useCart();

  const { isLoading } = useProducts();

  // console.log("cartList products 1", cartList.products);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const { user } = useAuth();

  const [quantity, setQuantity] = useState(0);
  // const [productQuantity, setProductQuantity] = useState(0);
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

      // await decreaseProductQuantity(id, quantity - 1);

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
      className="card card-sm sm:card-lg bg-base-100 h-full shadow-sm  transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_gray]  border rounded-lg ">
      <figure>
        <img
          className="block object-contain h-48 w-full bg-white aspect-square  "
          src={image}
          alt={title}
        />
      </figure>

      <div className=" card-body p-2 sm:p-4 text-center ">
        <h2 className=" line-clamp-2 min-h-[4rem] text-balance text-center  card-title justify-center px-2  w-full flex-none">
          {title}
        </h2>

        <p className=" badge badge-lg badge-outline badge-primary w-[100px] flex-none">
          {Number(price).toFixed(2)}
          {" €"}
        </p>

        <div className="items-center justify-between w-full card-actions  flex-col  h-full ">
          <Link
            className="  text-xs hover:link ml-auto"
            to={`/category/${category}`}
            onClick={(e) => e.stopPropagation()}>
            More from {category}
          </Link>
          {!quantity ?
            <button
              onClick={(e) => handleAddToCartButtonClick(e, _id)}
              className="btn btn-primary mb-8">
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
          className="btn btn-secondary  w-5/6 mx-auto"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/cart");
          }}>
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
