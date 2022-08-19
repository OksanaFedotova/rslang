import React from 'react';
import Menu from '../Menu/Menu';
import logo  from '../../assets/logo.png'
import Button from '../Button/Button';
import './Header.css';

const Header = () => {
    const handleClickButton = () => {
      alert("показывать форму регистрации")
    };

  return (
    <div>
      <header className='header'>
        <div className='header-logo'>
           <img className='logo' src={logo} alt={"logo"}/> 
           <p className='logo-text'>RSLang</p>
        </div>
        <Menu></Menu>
        <Button title='Войти' handleClick={handleClickButton}></Button>
      </header>
    </div>
  )
}
  export default Header;
  