import React from "react";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
    return (
    <>
    <Header title='RSLang'/>
    <Layout title='Выучить английский легко!' content="Лучшие методики изучения языка">
      <div>
        <p>Учебник</p>
      </div>
      <div>
        <p>Мини игры</p>
      </div>
    </Layout>
    <Footer/>
    </>
  )  
} 
export default HomePage;