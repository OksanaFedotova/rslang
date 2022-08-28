import React from "react";
import { Dispatch, SetStateAction } from "react";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import AuthForm from "./Auth-form/Auth-form";
import { useState } from "react";
import './NavForm.css';


interface INavForm {
    active: boolean;
    setActive:Dispatch<SetStateAction<boolean | undefined>>;
}

const NavForm: React.FunctionComponent<INavForm> = ({setActive}) => {
  const [formState, setFormState] = useState('auth');

   const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState (false)
    const [passwordDirty, setPasswordDirty] = useState (false)
    const [emailError, setEmailError] = useState ('Емейл не может быть пустым')
    const [passwordError, setPasswordError] = useState ('Пароль не может быть пустым')

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(e.target.value))) {
            setEmailError('Некорректный емейл')
        } else {
            setEmailError("");
        }
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if ( e.target.value.length < 3 || e.target.value.length > 8) {
            setPasswordError ('Пароль должен быть длиннее 3 или меньше 8')
        } else {
            setPasswordError("");
        }
    }

    const blurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }
  
  return (
    <>
    <div className={ "auth-modal active"} onClick={() => setActive(false)}>
      <div className="auth-modal__content active" onClick={e => e.stopPropagation()}>
      { formState === 'auth' && <AuthForm 
        email={email}
        emailHandler={emailHandler}
        emailDirty={emailDirty}
        emailError={emailError}
        password={password}
        passwordHandler={passwordHandler}
        passwordDirty={passwordDirty}
        passwordError={passwordError}
        blurHandler={blurHandler}
      /> }
      {
        formState === 'register' &&
        <RegistrationForm handleSubmit={(e) => console.log(e)}></RegistrationForm>
      }
           <button onClick={() => formState === 'auth' ? setFormState('register') : setFormState('auth')}>
        {
          formState === 'auth' ? `Регистрация` : `Вход`
        }
      </button>
            </div>
        </div>
    </>
  )
}
export default NavForm;