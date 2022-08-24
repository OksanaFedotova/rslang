import { Dispatch, JSXElementConstructor, ReactElement, SetStateAction } from "react";

type NewType = boolean | undefined;

interface IAuthForm {
    active: NewType;
    setActive:Dispatch<SetStateAction<boolean | undefined>>;
    children: ReactElement<any, string | JSXElementConstructor<any>>;
}

export default IAuthForm;
