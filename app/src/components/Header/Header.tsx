import React from 'react';
import Menu from '../Menu/Menu';
import logo  from '../../assets/logo.png'
import Button from '../Button/Button';

const Header = () => {
    const handleClickButton = () => {
      alert("показывать форму регистрации")
    };

  return (
    <div>
      <header>
        <div className='logo'>
           <img className='logo' src={logo} alt={"logo"}/> 
           <p>RSLang</p>
        </div>
        <Menu></Menu>
        <Button title='Войти' handleClick={handleClickButton}></Button>
      </header>
    </div>
  )
}
  export default Header;
  