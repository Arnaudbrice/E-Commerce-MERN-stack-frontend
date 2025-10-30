import React, { useState } from "react";
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

  console.log("_id", _id);

  const { cartList, setCartList, addProductToCart, removeProductFromCart } =
    useCart();

  console.log("cartList", cartList);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const { user } = useAuth();
  const [isClicked, setIsClicked] = useState(false);

  const [quantity, setQuantity] = useState(0);
  // const [productQuantity, setProductQuantity] = useState(0);

  const handleAddToCartListClick = async (e, id) => {
    e.stopPropagation(); // <--- Stop event propagation here

    if (!user) {
      toast.error("You need to be logged in to add products to the cart", {
        autoClose: 10000,
      });
      return;
    }
    if (quantity === stock) {
      toast.error("Product is out of stock");
      return;
    }
    setQuantity(quantity + 1);
    await addProductToCart(id, quantity + 1);

    setIsClicked(!isClicked);
  };

  const handleAddToCartList = async (e, id) => {
    e.stopPropagation(); // <--- Stop event propagation here
    if (quantity === stock) {
      toast.error("Product is out of stock");
      return;
    }

    setQuantity(quantity + 1);
    await addProductToCart(id, quantity + 1);
  };

  const handleRemoveFromCartList = async (e, id) => {
    e.stopPropagation(); // <--- Stop event propagation here
    if (quantity === 0) {
      return;
    }

    if (quantity === 1) {
      setQuantity(quantity - 1);

      setIsClicked(!isClicked);

      await removeProductFromCart(id);
      return;
    }

    setQuantity((prevQuantity) => prevQuantity - 1);

    await addProductToCart(id, quantity - 1);

    /*     // const newProductQuantity = productQuantity - 1;
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
        } */
  };

  // todo: add product to cart

  /*  const addCart = async (id) => {
    try {
      const requestBody = {
        productId: id,
        quantity: quantity,
      };

      const response = await fetch(`${baseUrl}/users/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      if (!response.ok) {
        const { message: validationError } = await response.json();
        customErrorMessage(validationError, 5000);
        return;
      }

      const cartData = await response.json();

      console.log("cartData", cartData);

      setCartList([...cartList, cartData]);

      toast.success("Product Added to Cart Successfully!");
    } catch (error) {
      toast.error(error);
    }
  }; */

  // const newProductQuantity = productQuantity + 1;
  /*   const existingItem = cartList.find( ( item ) => item.id === id );
  if ( existingItem ) {
    const updatedCartList = cartList.map( ( item ) => {
      if ( item.id === id ) {
        return {
          ...item,
          productQuantity: item.productQuantity + 1,
        };
      } else {
        return item;
      }
    } );
    setCartList( updatedCartList );
    // update the  quantity of the products added in the cart
    setCartProductsQuantity( ( prevQuantity ) => prevQuantity + 1 );
    toast.success( "Product Added to Cart Successfully!" );
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
    setCartList( [ ...cartList, newCartItem ] );

    // update the  quantity of the products added in the cart
    setCartProductsQuantity( ( prevQuantity ) => prevQuantity + 1 );
    // setProductQuantity(newProductQuantity);

    toast.success( "Product Added to Cart Successfully!" );
  }
}; */

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      onClick={() => handleClick(_id)}
      className="card card-lg sm:card-xl  bg-base-100 h-full shadow-sm  transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_gray]  border rounded-lg  ">
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
          <Link
            className="my-4 p-2 text-xs hover:link sm:my-none"
            to={`/category/${category}`}
            onClick={(e) => e.stopPropagation()}>
            More from {category}
          </Link>
          {!isClicked ?
            <button
              onClick={(e) => handleAddToCartListClick(e, _id)}
              className="btn btn-primary ">
              Add To Cart
            </button>
          : <ButtonGroup
              quantity={quantity}
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
