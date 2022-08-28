import React from "react";
import { Dispatch, SetStateAction } from "react";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import Validation from "./Auth-form/Auth-form";
import { useState } from "react";
import './NavForm.css';

interface INavForm {
    setActive: Dispatch<SetStateAction<boolean | undefined>>;
    updateEnter: () => void; 
    active: boolean
}

const NavForm: React.FunctionComponent<INavForm> = ({setActive, updateEnter}) => {
  const [formState, setFormState] = useState('auth');
  return (
    <>
    <div className="nav-form " onClick={() => setActive(false)}>
      <div className="nav-form__content" onClick={e => e.stopPropagation()}>
      { formState === 'auth' && <Validation/> }
      {
        formState === 'register' &&
        <RegistrationForm 
          updateState={() => setActive(false)}
          updateEnter={updateEnter}
          />
      }
      <button 
        className="nav-form__button"
        onClick={() => formState === 'auth' ? setFormState('register') : setFormState('auth')}>
        { formState === 'auth' ? `Регистрация` : `Вход` }
      </button>
      </div>
    </div>
    </>
  )
}
export default NavForm;