import React from 'react';
import Menu from '../Menu/Menu';
import AuthForm from "../../components/Auth-form/Authform";
import Validation from "../../components/Auth-form/Validation";
import logo  from '../../assets/logo.png'
import Button from '../Button/Button';

const Header = () => {
    const handleClickButton = () => {
      alert("показывать форму регистрации")
    };

const [modalActive, setModalActive] = React.useState<boolean | undefined>(false);

  return (
    <div>
      <header>
        <div className='logo'>
           <img className='logo' src={logo} alt={"logo"}/> 
           <p>RSLang</p>
        </div>
        <Menu></Menu>
        <button className="auth-open" onClick={() => setModalActive(true) }>Войти</button>
        <AuthForm active={modalActive} setActive={setModalActive}>
            <form className="input-form" action="">
                <Validation/>
            </form>
          </AuthForm> 
      </header>
    </div>
  )
}
  export default Header;
  