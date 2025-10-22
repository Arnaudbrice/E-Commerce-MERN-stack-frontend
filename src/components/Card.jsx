import React, { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import useProducts from "../hooks/useProducts.jsx";
import ButtonGroup from "./ButtonGroup.jsx";
import useAuth from "../hooks/useAuth.jsx";

const Card = ({
  id,
  image,
  title,
  price,
  category,
  description,
  productQuantity,
}) => {
  const {
    cartProductsQuantity,
    setCartProductsQuantity,
    cartList,
    setCartList,
  } = useProducts();

  const { user } = useAuth();
  const [isClicked, setIsClicked] = useState(false);
  // const [productQuantity, setProductQuantity] = useState(0);

  console.log("productQuantity", productQuantity);
  const handleAddToCartListClick = (id) => {
    if (!user) {
      toast.error("You need to be logged in to add products to the cart", {
        autoClose: 10000,
      });
      return;
    }
    addCart(id);

    setIsClicked(!isClicked);
  };

  const handleAddToCartList = (id) => {
    addCart(id);
  };

  const handleRemoveFromCartList = (id) => {
    // const newProductQuantity = productQuantity - 1;
    const existingItem = cartList.find((item) => item.id === id);
    if (existingItem && existingItem.productQuantity > 0) {
      const updatedCartList = cartList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            productQuantity: item.productQuantity - 1,
          };
        } else {
          return item;
        }
      });
      setCartList(updatedCartList);
      // update the  quantity of the products added in the cart
      setCartProductsQuantity((prevQuantity) => prevQuantity - 1);
      // setProductQuantity(newProductQuantity);
    } else {
      return;
    }
  };

  const addCart = (id) => {
    // const newProductQuantity = productQuantity + 1;
    const existingItem = cartList.find((item) => item.id === id);
    if (existingItem) {
      const updatedCartList = cartList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            productQuantity: item.productQuantity + 1,
          };
        } else {
          return item;
        }
      });
      setCartList(updatedCartList);
      // update the  quantity of the products added in the cart
      setCartProductsQuantity((prevQuantity) => prevQuantity + 1);
      toast.success("Product Added to Cart Successfully!");
    } else {
      const newCartItem = {
        id,
        title,
        price,
        category,
        image,
        productQuantity: 1,
        description,
      };

      //  we use useEffect with cart as a dependency to update the localstorage whenever cart changes (no need to update localstorage here)
      setCartList([...cartList, newCartItem]);

      // update the  quantity of the products added in the cart
      setCartProductsQuantity((prevQuantity) => prevQuantity + 1);
      // setProductQuantity(newProductQuantity);

      toast.success("Product Added to Cart Successfully!");
    }
  };
  return (
    <div className="card card-lg sm:card-xl  bg-base-100 h-full shadow-sm  transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_gray]  border rounded-lg  ">
      <figure>
        <img
          className="block object-contain w-full bg-white h-52 aspect-square"
          src={image}
          alt={title}
        />
      </figure>

      <div className="p-2 card-body  ">
        <h2 className=" h-full text-balance text-center  card-title justify-center p-2  w-full ">
          {title}
        </h2>

        <p className=" badge badge-lg badge-outline badge-primary w-[100px]">
          {price.toFixed(2)}
          {" €"}
        </p>

        <div className="items-center justify-between w-full card-actions ">
          {/* TODO:
          -on click on more from category show a page with all articles from this category
          -add href to the page to be called */}

          <Link
            className="my-4 p-2 text-xs hover:link sm:my-none"
            to={`/category/${category}`}>
            More from {category}
          </Link>
          {!isClicked ?
            <button
              onClick={() => handleAddToCartListClick(id)}
              className="btn btn-primary ">
              Add To Cart
            </button>
          : <ButtonGroup
              quantity={
                cartList.find((item) => item.id === id)?.productQuantity || 0
              }
              handleAdd={() => handleAddToCartList(id)}
              handleRemove={() => handleRemoveFromCartList(id)}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Card;
