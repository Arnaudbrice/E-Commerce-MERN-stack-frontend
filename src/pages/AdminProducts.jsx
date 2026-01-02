import React, { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts.jsx";
import useAuth from "../hooks/useAuth";
import Card from "../components/Card";
import EditDialog from "../components/EditDialog.jsx";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const { products, setProducts, isLoading } = useProducts();

  const { user } = useAuth();
  const [userProducts, setUserProducts] = useState([]);

  const [isClicked, setIsClicked] = useState(false);

  const [clickedProduct, setClickedProduct] = useState({});

  const [hasFinishedGettingUserProducts, setHasFinishedGettingUserProducts] =
    useState(false);

  const handleEditClick = (e, product) => {
    e.stopPropagation();

    document.getElementById("editModal")?.showModal();
    setIsClicked(true);

    setClickedProduct(product);
  };

  const handleDeleteClick = async (e, product) => {
    e.stopPropagation();

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/users/products/${product._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const { message } = await response.json();
        customErrorMessage(message, 5000);
        return;
      }

      const { deletedProduct } = await response.json();
      console.log("deletedProduct", deletedProduct);

      // update the products array
      const updatedProducts = products.filter(
        (p) => p._id !== deletedProduct._id
      );
      setProducts(updatedProducts);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getUserProducts = () => {
      const userProducts = products.filter(
        (product) => product.userId === user._id
      );

      console.log("userProducts", userProducts);
      setUserProducts(userProducts);

      setHasFinishedGettingUserProducts(true);
    };
    getUserProducts();
  }, [products, user, setUserProducts]);

  if (!hasFinishedGettingUserProducts) {
    return (
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  // this should happening after updating the state
  if (!userProducts?.length && hasFinishedGettingUserProducts) {
    return (
      <div className="text-center text-2xl flex flex-col items-center justify-center h-full   ">
        You Didn't Add Any Products Yet
      </div>
    );
  }

  return (
    <div className="grid min-h-full grid-cols-1 sm:grid-cols-2 gap-6 mx-auto my-6 text-gray-400 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] sm:mx-6 auto-rows-min  ">
      {userProducts.map((product) => {
        return (
          <div key={product._id}>
            <Card {...product}>
              {" "}
              <div className="flex justify-evenly items-center  m-4">
                <button
                  onClick={(e) => handleEditClick(e, product)}
                  className="btn  btn-secondary rounded-lg">
                  Edit
                </button>
                <button
                  onClick={(e) => handleDeleteClick(e, product)}
                  className="btn btn-outline btn-secondary rounded-lg">
                  Delete
                </button>
              </div>
            </Card>

            {isClicked && <EditDialog product={clickedProduct} />}
          </div>
        );
      })}
    </div>
  );
};

export default AdminProducts;
