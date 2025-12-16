import React from "react";
import { useNavigate } from "react-router";

const Button = ({ category }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/category/${category}`)}
      className="btn btn-outline  hover:btn-outline hover:btn-secondary p-6 outline-white">
      {category}
    </button>
  );
};

export default Button;
