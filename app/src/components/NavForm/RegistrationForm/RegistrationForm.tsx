import React, { Fragment } from 'react';
import { useState } from "react";
import {postUser, signIn} from '../../../services/user';
import Input from '../Input';
import { blurHandler, passwordHandler, emailHandler, nameHandler } from '../Handlers';

import './RegistrationForm.css'

interface IRegistration {
  updateState: () => void;
  updateEnter: () => void;
  updateSwitchButton: () => void;
}

const RegistrationForm:  React.FunctionComponent<IRegistration> = ({updateState, updateEnter, updateSwitchButton}) => {
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
            if (res.error?.status === 'failed') {
            setRegistrationError(true);
            setName('')
            setEmail('');
            setPassword('')
            } else {
              signIn({email: email, password: password}, (res) => {
                localStorage.setItem('user', JSON.stringify(res));
                console.log(JSON.parse(localStorage.user));
                setRegistrationActive(false);
                updateSwitchButton();
              });
            }
        });
    }
    return (
      <Fragment>
        {registrationActive && 
        <form 
          className='input-form'
          onSubmit={handleSubmit}>
            <h3>Регистрация</h3>
             <Input
              className='input-one'
              changeHandler={e=>nameHandler(e, setName)}
              value ={name} 
              name="name" type="text"
              placeholder="Введите имя..."
              />
            <Input
              className='input-one'
              changeHandler={e=>emailHandler(e, setEmail, setEmailError)}
              value={email}
              blurHandler={e => blurHandler(e, setEmailDirty, setPasswordDirty)}
              name="email"
              type="email" 
              placeholder="Введите емейл..."
            />
            <Input 
              className='input-one'
              changeHandler={e => passwordHandler(e, setPassword, setPasswordError)}
              value={password}
              blurHandler={e => blurHandler(e, setEmailDirty, setPasswordDirty)}
              name='password'
              type='password' 
              placeholder="Введите пароль..."
              />
            <button className="btn-auth" type="submit">Регистрация</button>
            {registrationError && <span style = {{color: 'red', fontSize: 'small'}}>Ошибка, попробуйте еще раз!</span>}
            {(emailDirty && emailError) && <div style = {{color: 'red', fontSize: 'small'}}>{emailError}</div>}
            {(passwordError && passwordDirty) && <div style = {{color: 'red', fontSize: 'small'}}>{passwordError}</div>}
        </form>
        }
        {!registrationActive && 
          <div className='registration-success'>
            <p> Вы успешно зарегестрированы </p>
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
