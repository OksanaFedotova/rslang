import React from 'react';
import './Layout.css';

interface ILayout {
  title?: string;
  children: JSX.Element[];
}

const Layout: React.FunctionComponent<ILayout> = ({title, children}) => {
    return (
      <div className='layout'>
        { title? <h3>{title}</h3>: null }
      <>{children}</>
      </div>
    )
  }
 
  export default Layout;
  