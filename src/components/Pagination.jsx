import { Link, useLocation } from "react-router";

const Pagination = ({ paginationArray, currentPage }) => {
  // gives you the current URL’s query string (search) without reloading the page( for instance search here can be ?page=2)
  /*  const { search } = useLocation();

  console.log("search in Pagination", search);
  const params = new URLSearchParams(search); */

  // return page=2 for instance
  /*  console.log("params in Pagination", params.toString()); */

  return (
    <div className="flex justify-center items-center gap-2 my-6">
      {paginationArray?.length &&
        paginationArray.map((pageNumber) => {
          const next = new URLSearchParams();
          next.set("page", pageNumber);

          // for instance page=2
          console.log("next in Pagination", next.toString());
          const className =
            pageNumber === currentPage ? "btn btn-secondary" : (
              "btn btn-outline btn-secondary"
            );

          return (
            <Link
              key={pageNumber}
              className={className}
              to={`?${next.toString()}`}>
              {pageNumber}
            </Link>
          );
        })}
    </div>
  );
};

export default Pagination;
