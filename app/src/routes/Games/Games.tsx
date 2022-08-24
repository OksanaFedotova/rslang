import React from "react";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import Footer from "../../components/Footer/Footer";

const Games = () => {
  return  (
     <>
      <Header/>
      <Layout>
        <div className="sprint">
          Спринт
        </div>
        <div className="audio-challenge">
          Аудио вызов
        </div>
      </Layout>
      <Footer/>
    </>
  )
}
export default Games;