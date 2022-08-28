import React from 'react';
import { useEffect, useState } from "react";
import  Input from '../Input/Input';
interface ILogin {
  handleSubmit: (e: React.FormEvent<HTMLInputElement>) => void;
}

const RegistrationForm:  React.FunctionComponent<ILogin> = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //     setEmail('');
    //     setPassword('');
    // }, [isResetField])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      console.log(e);
        e.preventDefault();
        setEmail('');
        setPassword('');
    }
    const handleEmail = (event: React.FormEvent<HTMLInputElement>) => {
        setEmail((event.target as HTMLInputElement).value)
    }

    const handlePassword = (event:  React.FormEvent<HTMLInputElement>) => {
        setPassword((event.target as HTMLInputElement).value)
    }

    return (
      <>
      <h1>Авторизация</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <Input
                    type="email" 
                    name="Email"
                    value={email}
                    handleChange={handleEmail}
                />
            </div>
            <div>
                <Input 
                    value={password}
                    type="password" 
                    name="Password" 
                    handleChange={handlePassword}/>
            </div>
            <div>
                <button>
                    {"Регистрация"}
                </button>
                </div>
            </form>
      </>
    )
}
export default RegistrationForm

