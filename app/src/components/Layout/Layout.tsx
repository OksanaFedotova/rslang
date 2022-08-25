import React from 'react';
import './Layout.css';
import cn from 'classnames';

interface ILayout {
  title?: string;
  children: JSX.Element[] | JSX.Element;
  className?: string;
}

const Layout: React.FunctionComponent<ILayout> = ({title, children, className}) => {
    return (
      <div 
        className={cn ('layout', className)}
      >
        { title? <h3>{title}</h3>: null }
      <>{children}</>
      </div>
    )
  }
 
  export default Layout;
  