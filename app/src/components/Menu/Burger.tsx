import React from "react";
import "./Burger.css";

interface IBurger {
  handleClick: () => void;
}

const Burger: React.FunctionComponent<IBurger> = ({ handleClick }) => {
  return (
    <div className="burger-block" onClick={handleClick}>
      <div className="burger-line"></div>
      <div className="burger-line"></div>
      <div className="burger-line"></div>
    </div>
  );
};

export default Burger;
