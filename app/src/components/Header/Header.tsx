import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import Menu from '../Menu/Menu';
import Burger from '../Menu/Burger';
import NavForm from '../NavForm/NavForm';
import logo  from '../../assets/logo.png'
import './Header.css';

const Header = () => {


const navigator = useNavigate();

const [menuActive, setMenuActive] = useState(false);
const [modalActive, setModalActive] = React.useState<boolean | undefined>(false);

  return (
      <header className='header'>
        <Burger handleClick={() => setMenuActive(!menuActive)}/>
        <div className='header-logo'>
           <img className='logo' src={logo} alt={"logo"} onClick={() => navigator('..')}/> 
           <p className='logo-text'>RSLang</p>
        </div>
        <Menu active={menuActive} setActive={setMenuActive}></Menu>
         <button className="header-button" onClick={() => setModalActive(true) }>Войти</button>
       {modalActive && <NavForm active={modalActive} setActive={setModalActive}/>}
      </header>
  )
}
  export default Header;
  
