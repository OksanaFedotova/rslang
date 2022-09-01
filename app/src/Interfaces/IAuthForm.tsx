import { Dispatch, JSXElementConstructor, ReactElement, SetStateAction } from "react";

type NewType = boolean | undefined;

interface IAuthForm {
    active: NewType;
    setActive:Dispatch<SetStateAction<boolean | undefined>>;
    children: (JSX.Element | boolean)[] ;
}

export default IAuthForm;
//ReactElement<any, string | JSXElementConstructor<any>> | JSX.Element[] | boolean