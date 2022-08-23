import React from "react"
import Header from "../../components/Header/Header"
import TextbookNav from "./TextbookNav";
import Footer from "../../components/Footer/Footer";
import Layout from "../../components/Layout/Layout";

import './Textbook.css';

const Textbook = () => {
  return (
    <>
    <Header/>
    <Layout title="Выберите уровень сложности">
      <TextbookNav/>
      <div>
      </div>
    </Layout>
    <Footer/>
    </>
  )
}
export default Textbook;
