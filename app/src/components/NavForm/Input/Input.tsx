import React from 'react';
import cn from 'classnames'
interface IInput {
  value: string; 
  type: string;
  name: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  required?: boolean
}

const Input: React.FunctionComponent<IInput> = ({value, type="text", name, handleChange, required}) => {
    return (
        <div>
            <input 
                value={value}
                type={type}
                required={required}
                name={name}
                onChange={handleChange}
            />
            <span></span>
            <span ></span>
            <label>{name}</label>
        </div>  
    )
};

export default Input;