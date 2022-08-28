import React, { Fragment } from 'react';
import { useEffect, useState } from "react";
import {postUser} from '../../../services/user'

interface IRegistration {
 // handleSubmit: (e: React.FormEvent<HTMLInputElement>) => void;
  updateState: () => void;
  updateEnter: () => void;
}

const RegistrationForm:  React.FunctionComponent<IRegistration> = ({updateState, updateEnter}) => {
    const [registrationActive, setRegistrationActive] = useState(true);
    const [registrationError, setRegistrationError] = useState(false)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailDirty, setEmailDirty] = useState (false)
    const [passwordDirty, setPasswordDirty] = useState (false)
    const [emailError, setEmailError] = useState ('Емейл не может быть пустым')
    const [passwordError, setPasswordError] = useState ('Пароль не может быть пустым')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
          name: name,
          email: email,
          password: password
        }
        postUser(user, (res) => {
          if (typeof res !== "number") {
            setRegistrationActive(false);
          } else {
            setRegistrationError(true)
          }
        });
        setName('')
        setEmail('');
        setPassword('');
    }
    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    }
    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(e.target.value))) {
          setEmailError('Некорректный емейл')
        } else {
          setEmailError("");
        }
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value.length < 8 || e.target.value.length > 20) {
            setPasswordError ('Пароль должен быть не меньше 8 и не больше 20 символов')
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
      <Fragment>
        {registrationActive && 
        <form 
          className='input-form'
          onSubmit={handleSubmit}>
            <h3>Регистрация</h3>
            <input className="input-one" onChange={e=>nameHandler(e)} value ={name} name="name" type="text" placeholder="Введите имя..."/>
            <input className="input-one" onChange={e=>emailHandler(e)} value ={email} onBlur = {e => blurHandler(e)} name="email" type="email" placeholder="Введите емейл..."/>
            <input className="input-one" onChange={e=>passwordHandler(e)} value={password} onBlur = {e => blurHandler(e)} name='password' type='password' placeholder="Введите пароль..."/>
            <button className="btn-auth" type="submit">Регистрация</button>
            {registrationError && <span style = {{color: 'red', fontSize: 'small'}}>Ошибка, попробуйте еще раз!</span>}
            {(emailDirty && emailError) && <div style = {{color: 'red', fontSize: 'small'}}>{emailError}</div>}
            {(passwordError && passwordDirty) && <div style = {{color: 'red', fontSize: 'small'}}>{passwordError}</div>}
        </form>
        }
        {!registrationActive && 
          <div>
            <p>{}</p>
            <button onClick={() => {
              updateState();
              updateEnter();
              }}>OK</button>
          </div>
        }
      </Fragment>
    )
}
export default RegistrationForm

