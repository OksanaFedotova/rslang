import React from "react";
import './Button.css';

interface IButton {
  title: string;
  handleClick: () => void

}
const Button: React.FunctionComponent<IButton> = ({title, handleClick}) => {
  return (
    <button className="header-button" onClick={handleClick}>{title}</button>
  )
}
export default Button;
