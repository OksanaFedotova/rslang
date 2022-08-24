import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import './Main.css';
import homePageImage  from '../../assets/homePageImage.jpg';


const HomePage = () => {
  
  const navigator = useNavigate();
  const handleClickButton = () => {
    navigator('/team');
  };

    return (
    <>
    <Header/>
      <div className="main-page">
        <div className="main-left-block">
        <div>
        <p className="main-text"><h2 className="main-h2">RS-Lang</h2> - приложение для эффективного изучения английского языка!</p>
      </div>
        <div>
        <p className="second-row-text">Получай новые знания, где угодно и когда угодно! Выбери игру или воспользуйся учебником и начни совершенствовать свои навыки прямо сейчас!</p>
      </div>
       <Button title="Наша команда" handleClick={handleClickButton} className="header-button"/>
       </div>
       <img className="main-img" src={homePageImage}/>
       </div>
    <Footer/>
    </>
  )  
} 
export default HomePage;
