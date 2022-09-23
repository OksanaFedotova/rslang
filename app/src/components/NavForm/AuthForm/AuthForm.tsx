import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setUserAuth } from "../../../store/userSlice";

import Input from "../Input";
import { blurHandler, passwordHandler, emailHandler } from "../Handlers";
import { signIn } from "../../../services/userRequests";

interface IAuthForm {
  updateState: () => void;
  updateEnter: () => void;
}

const AuthForm: React.FunctionComponent<IAuthForm> = ({
  updateState,
  updateEnter
}) => {
  const dispatch = useDispatch();

  const [authError, setAuthError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Емейл не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password
    };
    signIn(
      user,
      res => {
        res = {
          ...res,
          expire: Date.now() + 16200000
        };
        localStorage.setItem("user", JSON.stringify(res));
        //добавление пользователя в редакс
        dispatch(setUser(res));
        dispatch(setUserAuth(true));
        updateState();
        updateEnter();
      },
      () => {
        setAuthError(true);
        setEmail("");
        setPassword("");
      }
    );
  };

  document
    .querySelector(".input-form")
    ?.addEventListener("click", () => setAuthError(false));

  return (
    <>
      <div className="form">
        <form className="input-form" onSubmit={handleSubmit}>
          <h3>Авторизация</h3>
          <Input
            className="input-one"
            changeHandler={e => emailHandler(e, setEmail, setEmailError)}
            value={email}
            blurHandler={e => blurHandler(e, setEmailDirty, setPasswordDirty)}
            name="email"
            type="email"
            placeholder="Введите емейл..."
          />
          <Input
            className="input-one"
            changeHandler={e =>
              passwordHandler(e, setPassword, setPasswordError)
            }
            value={password}
            blurHandler={e => blurHandler(e, setEmailDirty, setPasswordDirty)}
            name="password"
            type="password"
            placeholder="Введите пароль..."
          />
          <button className="btn-auth" type="submit">
            Вход
          </button>
          {authError && (
            <span style={{ color: "red", fontSize: "small" }}>
              Ошибка, попробуйте еще раз!
            </span>
          )}
          {emailDirty && emailError && (
            <div style={{ color: "red", fontSize: "small" }}>{emailError}</div>
          )}
          {passwordError && passwordDirty && (
            <div style={{ color: "red", fontSize: "small" }}>
              {passwordError}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default AuthForm;
