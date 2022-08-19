import React from 'react';
//import { useNavigate } from 'react-router-dom';

interface ILayout {
  title?: string;
  children: JSX.Element[];
}

const Layout: React.FunctionComponent<ILayout> = ({title, children}) => {
    return (
      <>
      <article>
        <div>
          { title? <h3>{title}</h3>: null }
        </div>
      </article>
      <>{children}</>
      </>
    )
  }
 
  export default Layout;
  