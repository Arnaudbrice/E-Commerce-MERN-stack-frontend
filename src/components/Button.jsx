import React from "react";
import { useNavigate } from "react-router";

const Button = ({ category }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/category/${category}`)}
      className="btn btn-outline btn-primary"
    >
      {category}
    </button>
  );
};

export default Button;
