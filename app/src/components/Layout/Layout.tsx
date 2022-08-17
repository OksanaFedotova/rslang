import React from 'react';
//import { useNavigate } from 'react-router-dom';

interface ILayout {
  title: string;
  content: string;
  children: JSX.Element[];
 // handleClick: () => void
}

const Layout: React.FunctionComponent<ILayout> = ({title, content, children}) => {
    return (
      <>
      <article>
        <div>
          <h3>{title}</h3>
          <span>{content}</span>
        </div>
      </article>
      <>{children}</>
      </>
    )
  }
 
  export default Layout;