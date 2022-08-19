import React from "react";

interface IButton {
  title: string;
  handleClick: () => void

}
const Button: React.FunctionComponent<IButton> = ({title, handleClick}) => {
  return (
    <button onClick={handleClick}>{title}</button>
  )
}
export default Button;