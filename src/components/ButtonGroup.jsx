import React from "react";

const ButtonGroup = (props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <div className="flex flex-row items-center justify-center px-4 gap-x-2 ">
        <button className="btn btn-secondary" onClick={props.handleRemove}>
          -
        </button>
        {props.quantity}
        <button className="btn btn-secondary" onClick={props.handleAdd}>
          +
        </button>
      </div>

      <p>{props.stock - props.quantity + " available"}</p>
    </div>
  );
};

export default ButtonGroup;
