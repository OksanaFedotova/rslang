import React from "react";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router";


const HomePage = () => {
   const navigator = useNavigate();
    const handleClickButton = () => {
     navigator('/manual');
    };
    return (
    <>
    <Header title='RSLang'/>
    <Layout title='Выучить английский легко!' content="Лучшие методики изучения языка">
        <button onClick={handleClickButton}>Учебник</button>
      <div>
        <p>Мини игры</p>
      </div>
    </Layout>
    <Footer/>
    </>
  )  
} 
export default HomePage;