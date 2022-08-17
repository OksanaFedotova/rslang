import React from 'react';

interface ILayout {
  title: string;
  content: string;
  children: JSX.Element[]
}

const Layout: React.FunctionComponent<ILayout> = ({title, content, children}) => {
    return (
    <div>
      <article>
        <div>
          <h3>{title}</h3>
          <span>{content}</span>
          {children}
        </div>
      </article>
    </div>
    )
  }
 
  export default Layout;