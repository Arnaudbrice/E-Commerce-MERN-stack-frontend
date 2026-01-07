const Pagination = (props) => (
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
);

export default Pagination;
