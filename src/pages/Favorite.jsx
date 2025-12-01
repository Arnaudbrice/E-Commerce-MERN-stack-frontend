import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.jsx";
import useCart from "../hooks/useCart.jsx";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import ButtonGroup from "../components/ButtonGroup.jsx";

const Favorite = () => {
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

  const [quantity, setQuantity] = useState(0);

  const { favoriteProducts, setFavoriteProducts, isLoadingFavoriteProducts } =
    useAuth();

  console.table(favoriteProducts);

  const navigate = useNavigate();

  const handleAddToCartButtonClick = async (e, id, quantity) => {
    e.stopPropagation(); // <--- Stop event propagation here

    await addProductToCart(id, quantity + 1);
  };

  //********** add to cart list **********
  const handleAddToCartList = async (e, id, stock, quantity) => {
    e.stopPropagation(); // <--- Stop event propagation here (so that the event does not propagate to the parent component, which is responsible for the navigation to the detail page)

    if (quantity === stock) {
      toast.error("Product is out of stock");
      return;
    }

    await addProductToCart(id, quantity + 1);
    // await getProductFromCart(id);
  };

  //********** remove from cart **********
  const handleRemoveFromCartList = async (e, id, quantity) => {
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

  const handleClick = (product) => {
    navigate(`/product/${product._id}`, {
      state: {
        quantityInCart: product.quantity,
        stock: product.stock,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      },
    });
  };
  if (isLoadingFavoriteProducts) {
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
    <div>
      <div className="w-2/3 mx-auto my-10 text-lg sm:text-xl font-bold text-center divider divider-secondary ">
        <div class="mask mask-heart size-40 flex items-center justify-center font-bold  bg-secondary text-white p-2">
          Wishlist
        </div>
      </div>

      <div className="grid min-h-full grid-cols-2 gap-6 mx-auto my-6 text-gray-400 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-content-center sm:mx-6 auto-rows-min ">
        {favoriteProducts.map((product) => {
          const productFromCart = cartList.products.filter(
            (productItem) => productItem.productId._id === product._id
          )[0];
          console.log("productFromCart", productFromCart);
          return (
            <div
              key={product._id}
              onClick={() => handleClick(product)}
              className="card card-sm sm:card-lg bg-base-100 h-full shadow-sm  transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_gray]  border rounded-lg ">
              <div>
                <figure className="flex-col  ">
                  <img
                    className="block object-contain h-48 w-full bg-white aspect-square rounded-t-lg "
                    src={product.image}
                    alt={product.title}
                  />
                </figure>
              </div>

              <div className=" card-body p-2 sm:p-4 text-center ">
                <h2 className=" line-clamp-2 min-h-[4rem] text-balance text-center  card-title justify-center px-2  w-full flex-none">
                  {product.title}
                </h2>

                <p className=" badge badge-lg badge-outline badge-primary w-[100px] flex-none">
                  {Number(product.price).toFixed(2)}
                  {" €"}
                </p>

                <div className="items-center justify-between w-full card-actions  flex-col  h-full ">
                  <Link
                    className="  text-xs hover:link ml-auto"
                    to={`/category/${product.category}`}
                    onClick={(e) => e.stopPropagation()}>
                    More from {product.category}
                  </Link>
                  {(
                    !cartList.products.some(
                      (productItem) => productItem.productId._id === product._id
                    )
                  ) ?
                    <button
                      onClick={(e) =>
                        handleAddToCartButtonClick(
                          e,
                          product._id,
                          productFromCart?.quantity || 0
                        )
                      }
                      className="btn btn-primary mb-8">
                      Add To Cart
                    </button>
                  : <ButtonGroup
                      quantity={productFromCart?.quantity || 0}
                      stock={product.stock}
                      handleAdd={(e) =>
                        handleAddToCartList(
                          e,
                          product._id,
                          product.stock,
                          productFromCart.quantity
                        )
                      }
                      handleRemove={(e) =>
                        handleRemoveFromCartList(
                          e,
                          product._id,
                          productFromCart.quantity
                        )
                      }
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
        })}
      </div>
    </div>
  );
};

export default Favorite;
