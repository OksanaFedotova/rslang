import React from "react";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";


const HomePage = () => {
  
  const navigator = useNavigate();
  const handleClickButton = () => {
    navigator('/team');
  };

    return (
    <>
    <Header/>
    <Layout title=''>
      <div>
        <p>RS-lang - приложение для эффективного изучения языка!</p>
      </div>
        <div>
        <p>Получай новые знания, где угодно и когда угодно!</p>
      </div>
       <Button title="Наша команда" handleClick={handleClickButton}/>
    </Layout>
    <Footer/>
    </>
  )  
} 
export default HomePage;
