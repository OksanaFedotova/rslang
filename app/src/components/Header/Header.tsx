import React from 'react';
interface IHeader {
  title: string;
}

const Header: React.FunctionComponent<IHeader> = ({title}) => {
  return (
    <div>
      <header>
        <div>
          { title? <h1>{title}</h1>: null }
          </div>
      </header>
    </div>
  )
}
  export default Header;
  