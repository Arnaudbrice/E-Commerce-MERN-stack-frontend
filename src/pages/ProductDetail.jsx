import React, { useEffect, useState } from "react";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [isClicked, setIsClicked] = useState(false);
  // const [productQuantity, setProductQuantity] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/users/products/${id}`);

      try {
        if (!response.ok) {
          const { message: errorMessage } = await response.json();
          customErrorMessage(errorMessage, 5000);
          return;
        }
        const product = await response.json();

        setProduct(product);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [baseUrl, id]);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card card-lg sm:card-xl  bg-base-100 h-full shadow-sm  transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_gray]  border rounded-lg  ">
      <figure>
        <img
          className="block object-contain w-full bg-white h-52 aspect-square"
          src={product.image}
          alt={product.title}
        />
      </figure>

      <div className="p-2 card-body  ">
        <h2 className=" h-full text-balance text-center  card-title justify-center p-2  w-full ">
          {product.title}
        </h2>

        <p className=" badge badge-lg badge-outline badge-primary w-[100px]">
          {product.price.toFixed(2)}
          {" €"}
        </p>

        <div className="items-center justify-between w-full card-actions ">
          <Link
            className="my-4 p-2 text-xs hover:link sm:my-none"
            to={`/category/${product.category}`}>
            More from {product.category}
          </Link>
          {!isClicked ?
            <button
              onClick={() => handleAddToCartListClick(product._id)}
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

export default ProductDetail;
