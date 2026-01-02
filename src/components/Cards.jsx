import React from "react";
import Card from "./Card";
import ProductContext from "../context/ProductContext.jsx";
import useProducts from "../hooks/useProducts.jsx";
const Cards = () => {
  /*   const { products, setProducts } = useContext(ProductContext); */

  const {
    products,
    setProducts,
    productsPerPage,
    paginationArray,
    currentPage,
    setCurrentPage,
  } = useProducts();
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

  /*  const handleClick = (pageNumber) => {
    console.log("pageNumber", pageNumber);
    setCurrentPage(pageNumber);
  }; */

  return (
    <div>
      <div className="grid min-h-full grid-cols-1 sm:grid-cols-2 gap-6 mx-auto my-6 text-gray-400 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-content-center sm:mx-6 auto-rows-min ">
        {productsPerPage.map((product) => {
          return <Card key={product._id} {...product} />;
        })}
      </div>

      {/* pagination */}

      <div className="flex justify-center items-center gap-2 my-6">
        {paginationArray.map((pageNumber, index) =>
          pageNumber === currentPage ?
            <a
              className="btn btn-secondary"
              key={index}
              href={`?page=${pageNumber}`}>
              {pageNumber}
            </a>
          : <a
              className="btn btn-outline btn-secondary"
              href={`?page=${pageNumber}`}
              key={index}>
              {pageNumber}
            </a>
        )}
      </div>
    </div>
  );
};

export default Cards;
