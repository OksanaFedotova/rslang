import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import Menu from '../Menu/Menu';
import Burger from '../Menu/Burger';
import AuthForm from "../../components/Auth-form/Authform";
import Validation from "../../components/Auth-form/Validation";
import logo  from '../../assets/logo.png'
import './Header.css';

const Header = () => {

const [modalActive, setModalActive] = React.useState<boolean | undefined>(false);
const navigator = useNavigate();

const [menuActive, setMenuActive] = useState(false);

  return (
      <header className='header'>
        <Burger handleClick={() => setMenuActive(!menuActive)}/>
        <div className='header-logo'>
           <img className='logo' src={logo} alt={"logo"} onClick={() => navigator('..')}/> 
           <p className='logo-text'>RSLang</p>
        </div>
        <Menu active={menuActive} setActive={setMenuActive}></Menu>
        <button className="header-button" onClick={() => setModalActive(true) }>Войти</button>
        <AuthForm active={modalActive} setActive={setModalActive}>
                <Validation/>
          </AuthForm> 
      </header>
  )
}
  export default Header;
  
