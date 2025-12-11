import React, { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts.jsx";
import useAuth from "../hooks/useAuth";
import Card from "../components/Card";

const AdminProducts = () => {
  const { products } = useProducts();

  const { user } = useAuth();
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const getUserProducts = () => {
      const userProducts = products.filter(
        (product) => product.userId === user._id
      );
      setUserProducts(userProducts);
    };
    getUserProducts();
  }, [products, user]);

  if (!userProducts.length) {
    return (
      <div className="text-center text-2xl flex flex-col items-center justify-center h-full   ">
        You Didn't Add Any Products Yet
      </div>
    );
  }

  return (
    <div className="grid min-h-full grid-cols-2 gap-6 mx-auto my-6 text-gray-400 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] sm:mx-6 auto-rows-min  ">
      {userProducts.map((product) => {
        return (
          <Card key={product._id} {...product}>
            {" "}
            <div className="flex justify-evenly items-center  m-4">
              <button className="btn btn-outline btn-secondary rounded-lg">
                Edit
              </button>
              <button className="btn btn-outline btn-primary rounded-lg">
                Delete
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminProducts;
