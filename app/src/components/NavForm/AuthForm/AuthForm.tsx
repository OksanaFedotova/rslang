import React, { useState } from "react";
import { signIn } from "../../../services/user";

interface IAuthForm {
  updateState: () => void;
  updateEnter: () => void; 
}

const AuthForm: React.FunctionComponent<IAuthForm> = ({updateState, updateEnter}) => {
    const [authError, setAuthError] = useState(false)
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState (false)
    const [passwordDirty, setPasswordDirty] = useState (false)
    const [emailError, setEmailError] = useState ('Емейл не может быть пустым')
    const [passwordError, setPasswordError] = useState ('Пароль не может быть пустым')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const user = {
        email: email,
        password: password
      }
      signIn(user, (res) => {
        console.log(res);
        updateState();
        updateEnter();
      }, 
        (err) => {
          setAuthError(true);
          setEmail('');
          setPassword('');
      });
    }

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
        if (e.target.value.length < 8) {
            setPasswordError ('Пароль должен быть не меньше 8 символов')
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
      <div className="form">
        <form className="input-form"
            onSubmit={handleSubmit}>
            <h3>Авторизация</h3>
            <input className="input-one" onChange={e=>emailHandler(e)} value ={email} onBlur = {e => blurHandler(e)} name="email" type="email" placeholder="Введите емейл..."/>
            <input className="input-one" onChange={e=>passwordHandler(e)} value={password} onBlur = {e => blurHandler(e)} name='password' type='password' placeholder="Введите пароль..."/>
            <button className="btn-auth" type="submit">Вход</button>
            {authError && <span style = {{color: 'red', fontSize: 'small'}}>Ошибка, попробуйте еще раз!</span>}
            {(emailDirty && emailError) && <div style = {{color: 'red', fontSize: 'small'}}>{emailError}</div>}
            {(passwordError && passwordDirty) && <div style = {{color: 'red', fontSize: 'small'}}>{passwordError}</div>}
        </form>
      </div>
    </>
  )
}

export default AuthForm;
