import React from "react";
import Card from "./Card";
import ProductContext from "../context/ProductContext.jsx";
import useProducts from "../hooks/useProducts.jsx";
import Pagination from "./Pagination.jsx";

/* const Pagination = (props) => (
  <div className="flex justify-center items-center gap-2 my-6">
    {props.paginationArray.map((pageNumber, index) =>
      pageNumber === props.currentPage ?
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
); */

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
    <div className={!productsPerPage.length && " mt-60"}>
      <div className="grid min-h-full grid-cols-1 sm:grid-cols-2 gap-6 mx-auto my-6 text-gray-400 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-content-center sm:mx-6 auto-rows-min ">
        {!productsPerPage.length ?
          <div
            className="flex  items-center justify-center col-span-full h-full
          text-center text-2xl ">
            No Products Found
          </div>
        : productsPerPage.map((product) => {
            return <Card key={product._id} {...product} />;
          })
        }
      </div>

      {/* pagination */}

      <Pagination paginationArray={paginationArray} currentPage={currentPage} />
    </div>
  );
};

export default Cards;
