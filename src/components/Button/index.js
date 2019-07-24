import React from "react";

function Button({ children, className, clickHandler, ...rest }) {
  return (
    <button onClick={clickHandler} className={className} {...rest}>
      {children}
    </button>
  );
}

export default Button;
