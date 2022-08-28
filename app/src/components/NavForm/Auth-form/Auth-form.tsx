import React from "react";

interface IAuthForm {
  emailHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
  email: string, 
  passwordHandler: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  password: string,  
  blurHandler: (e: React.FocusEvent<HTMLInputElement>) => void,
  emailDirty: boolean,
  emailError: string,
  passwordError: string, 
  passwordDirty: boolean
}

const AuthForm: React.FunctionComponent<IAuthForm> = ({emailHandler, email, passwordHandler, password,  blurHandler, emailDirty, emailError, passwordError, passwordDirty}) => {
    return (
        <div className="validation">
            <form className="input-form">
                <h1>Авторизация</h1>
                
                <input className="input-one" onChange={e=>emailHandler(e)} value ={email} onBlur = {e => blurHandler(e)} name="email" type="email" placeholder="Введите емейл..."/>
                
                <input className="input-one" onChange={e=>passwordHandler(e)} value={password} onBlur = {e => blurHandler(e)} name='password' type='password' placeholder="Введите пароль..."/>
                <button className="btn-auth" type="submit">Вход</button>
                {(emailDirty && emailError) && <div style = {{color: 'red', fontSize: 'small'}}>{emailError}</div>}
                {(passwordError && passwordDirty) && <div style = {{color: 'red', fontSize: 'small'}}>{passwordError}</div>}
            </form>
        </div>
    )




}

export default AuthForm;
