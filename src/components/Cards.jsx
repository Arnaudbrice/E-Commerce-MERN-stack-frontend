import React from "react";
import Card from "./Card";
import ProductContext from "../context/ProductContext.jsx";
import useProducts from "../hooks/useProducts.jsx";
const Cards = () => {
  /*   const { products, setProducts } = useContext(ProductContext); */

  const { products, setProducts } = useProducts();
  /*   const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Error fetching data from the api");
        }
        const data = await response.json();
        console.log("data", data);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []); */
  return (
    <div className="grid min-h-full grid-cols-2 gap-6 mx-0 my-6 text-gray-400 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-content-center sm:mx-6 auto-rows-min ">
      {products.map((product) => {
        return <Card key={product._id} {...product} />;
      })}
    </div>
  );
};

export default Cards;
