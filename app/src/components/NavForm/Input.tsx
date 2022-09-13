import React from "react";

interface IInput {
  className: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  blurHandler?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  name: string;
  type: string;
  placeholder: string;
}
const Input: React.FunctionComponent<IInput> = ({
  className,
  changeHandler,
  value,
  blurHandler,
  name,
  type,
  placeholder
}) => {
  return (
    <input
      className={className}
      onChange={changeHandler}
      value={value}
      onBlur={blurHandler}
      name={name}
      type={type}
      placeholder={placeholder}
    />
  );
};
export default Input;
