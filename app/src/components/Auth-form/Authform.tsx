import React from "react";
import IAuthForm from "../../Interfaces/IAuthForm";
import Validation from "./Validation";
import "./Authform.css"


const AuthForm:React.FunctionComponent<IAuthForm> = ({active, setActive, children}): JSX.Element => {
    return (
        <div className={active ? "auth-modal active" : "auth-modal"} onClick={() => setActive(false)}>
            <div className="auth-modal__content active" onClick={e => e.stopPropagation()}>
                {children}
            </div>

        </div>
    );
}

export default AuthForm;