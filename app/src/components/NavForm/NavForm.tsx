import React from "react";
import { Dispatch, SetStateAction } from "react";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import AuthForm from "./AuthForm/AuthForm";
import { useState } from "react";
import "./NavForm.css";

interface INavForm {
  setActive: Dispatch<SetStateAction<boolean | undefined>>;
  updateEnter: () => void;
  active: boolean;
}

const NavForm: React.FunctionComponent<INavForm> = ({
  setActive,
  updateEnter
}) => {
  const [formState, setFormState] = useState("auth");
  const [switchButtonActive, setSwitchActive] = useState(true); //кнопка с переключением на вход/регистрацию
  return (
    <>
      <div className="nav-form " onClick={() => setActive(false)}>
        <div className="nav-form__content" onClick={e => e.stopPropagation()}>
          {formState === "auth" && (
            <AuthForm
              updateState={() => setActive(false)}
              updateEnter={updateEnter}
            />
          )}
          {formState === "register" && (
            <RegistrationForm
              updateState={() => setActive(false)}
              updateEnter={updateEnter}
              updateSwitchButton={() => setSwitchActive(false)}
            />
          )}
          {switchButtonActive && (
            <button
              className="nav-form__button"
              onClick={() =>
                formState === "auth"
                  ? setFormState("register")
                  : setFormState("auth")
              }
            >
              {formState === "auth" ? `Регистрация` : `Вход`}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default NavForm;
