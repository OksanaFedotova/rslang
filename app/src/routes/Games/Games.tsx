import React from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setGroup, setPage } from "../../store/pageSlice";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import Footer from "../../components/Footer/Footer";
import "./Games.css";
import sprintGamePic from "../../assets/sprintGamePic.jpg";
import audioGamePic from "../../assets/audioGamePic.jpg";

const Games = () => {
  const navToGames = useNavigate();

  const dispatch = useDispatch();
  dispatch(setPage(null));
  dispatch(setGroup(null));

  return (
    <>
      <Header />
      <Layout title="Выбери игру">
        <div></div>
        <div className="games-page-wrapper">
          <div
            className="sprint game-block"
            onClick={() => navToGames("../games/sprint")}
          >
            <img
              src={sprintGamePic}
              alt={"sprint-game-image"}
              className="game-image"
            />
            Спринт
          </div>
          <div
            className="audio-challenge game-block"
            onClick={() => navToGames("../games/audio-challenge")}
          >
            <img
              src={audioGamePic}
              alt={"audio-game-image"}
              className="game-image"
            />
            <p>Аудио вызов</p>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};
export default Games;
