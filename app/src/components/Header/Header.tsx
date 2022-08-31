import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import Menu from '../Menu/Menu';
import Burger from '../Menu/Burger';
import NavForm from '../NavForm/NavForm';
import logo  from '../../assets/logo.png'
import './Header.css';

let isAuth = false
if (localStorage.user) {
  isAuth = true;
}

const Header = () => {

const navigator = useNavigate();

const [menuActive, setMenuActive] = useState(false);
const [enterButton, setEnterButton] = React.useState<boolean | undefined>(true);
const [modalActive, setModalActive] = React.useState<boolean | undefined>(false);

  return (
      <header className='header'>
        <Burger handleClick={() => setMenuActive(!menuActive)}/>
        <div className='header-logo'>
           <img className='logo' src={logo} alt={"logo"} onClick={() => navigator('..')}/> 
           <p className='logo-text'>RSLang</p>
        </div>
        <Menu active={menuActive} setActive={setMenuActive}></Menu>
        {/*состояние регистрации*/}
        {(enterButton && !isAuth) && <button className="header-button" onClick={() => setModalActive(true) }>Войти</button>}
        {(!enterButton || isAuth) && <NavLink className="nav-link" to={'/statistics'}> Моя статистика </NavLink>}
        {modalActive && 
        <NavForm 
         active={modalActive} 
         setActive={setModalActive}
         updateEnter={() => setEnterButton(false)}
         />}
      </header>
  )
}
  export default Header;
  
