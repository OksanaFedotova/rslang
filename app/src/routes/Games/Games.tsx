import React from "react";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import Footer from "../../components/Footer/Footer";
import './Games.css';
import sprintGamePic from "../../assets/sprintGamePic.jpg";
import audioGamePic from "../../assets/audioGamePic.jpg";

const Games = () => {
  return  (
     <>
      <Header/>
      <Layout title="Выберите игру">
        <div></div>
        <div className="games-page-wrapper">
        <div className="sprint game-block">
          <img src={sprintGamePic} alt={"sprint-game-image"} className="game-image"/>
          Спринт
        </div>
        <div className="audio-challenge game-block">
        <a className="audio-challenge game-block" href="../games/audio-challenge">
          <img src={audioGamePic} alt={"audio-game-image"} className="game-image" />
          <p>Аудио вызов</p>
          </a></div>
        </div>
      </Layout>
      <Footer/>
    </>
  )
}
export default Games;
