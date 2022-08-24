import React from 'react';
import { useNavigate } from 'react-router';
import Menu from '../Menu/Menu';
import AuthForm from "../../components/Auth-form/Authform";
import Validation from "../../components/Auth-form/Validation";
import logo  from '../../assets/logo.png'
import './Header.css';

const Header = () => {

const [modalActive, setModalActive] = React.useState<boolean | undefined>(false);
const navigator = useNavigate();

  return (
      <header className='header'>
        <div className='header-logo'>
           <img className='logo' src={logo} alt={"logo"} onClick={() => navigator('..')}/> 
           <p className='logo-text'>RSLang</p>
        </div>
        <Menu></Menu>
        <button className="header-button" onClick={() => setModalActive(true) }>Войти</button>
        <AuthForm active={modalActive} setActive={setModalActive}>
            <form className="input-form" action="">
                <Validation/>
            </form>
          </AuthForm> 
      </header>
  )
}
  export default Header;
  