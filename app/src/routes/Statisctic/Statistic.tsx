import React from "react";
import { useNavigate } from 'react-router';

const Statisctic = () => {

  const navigator = useNavigate();

  return (
    <>
    <div>
      <button
        onClick={() => {

          navigator('..')
        }}
      >
        Выйти</button>
    </div>
    <div>
    <button
        onClick={() => {
          navigator('..')
        }}
      >
        Удалить аккаунт</button>
    </div>
    </>
  ) 
}
export default Statisctic;