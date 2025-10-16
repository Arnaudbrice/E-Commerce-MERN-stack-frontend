import React from "react";

const ButtonGroup = props => {
  return (
    <div className="flex flex-row items-center justify-center px-4 gap-x-2 ">
      <button className="btn btn-primary" onClick={props.handleRemove}>
        -
      </button>
      {props.quantity}
      <button className="btn btn-primary" onClick={props.handleAdd}>
        +
      </button>
    </div>
  );
};

export default ButtonGroup;
