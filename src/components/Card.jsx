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

    decreaseProductQuantity,
  } = useCart();

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

  const handleAddToCartList = async (e, id) => {
    e.stopPropagation(); // <--- Stop event propagation here

    if (quantity === stock) {
      toast.error("Product is out of stock");
      return;
    }

    await addProductToCart(id, quantity + 1);
    // await getProductFromCart(id);
  };

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
    navigate(`/product/${id}`);
  };

  return (
    <div
      onClick={() => handleClick(_id)}
      className="card card-md sm:card-lg  bg-base-100 h-full shadow-sm  transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_gray]  border rounded-lg ">
      <figure>
        <img
          className="block object-contain h-48 w-full bg-white aspect-square  "
          src={image}
          alt={title}
        />
      </figure>

      <div className="card-body p-1 text-center">
        <h2 className=" h-full text-balance text-center  card-title justify-center p-2  w-full ">
          {title}
        </h2>

        <p className=" badge badge-lg badge-outline badge-primary w-[100px]">
          {price.toFixed(2)}
          {" €"}
        </p>

        <div className="items-center justify-between w-full card-actions p-1 ">
          <Link
            className="my-4 p-2 text-xs hover:link sm:my-none"
            to={`/category/${category}`}
            onClick={(e) => e.stopPropagation()}>
            More from {category}
          </Link>
          {!quantity ?
            <button
              onClick={(e) => handleAddToCartButtonClick(e, _id)}
              className="btn btn-primary ">
              Add To Cart
            </button>
          : <ButtonGroup
              quantity={quantity || 0}
              handleAdd={(e) => handleAddToCartList(e, _id)}
              handleRemove={(e) => handleRemoveFromCartList(e, _id)}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Card;
