import React from "react";
import "./Button.css";

interface IButton {
  className: string;
  title: string;
  handleClick: () => void;
}
const Button: React.FunctionComponent<IButton> = ({
  className,
  title,
  handleClick
}) => {
  return (
    <button className={className} onClick={handleClick}>
      {title}
    </button>
  );
};
export default Button;
