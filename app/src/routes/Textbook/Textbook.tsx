import React from "react"
import Header from "../../components/Header/Header"
import TextbookNav from "./TextbookNav";
import Footer from "../../components/Footer/Footer";
import Layout from "../../components/Layout/Layout";

import textbookImg from "../../assets/textbook.jpeg"
import './Textbook.css';

const Textbook = () => {
  return (
    <>
    <Header/>
    <Layout 
      className="textbook"
      title="Выберите уровень сложности">
      <div className="textbook-wrapper">
      <TextbookNav/>
      <div className="textbook-image">
        <img src={textbookImg}/>
      </div>
      </div>
    </Layout>
    <Footer/>
    </>
  )
}
export default Textbook;
