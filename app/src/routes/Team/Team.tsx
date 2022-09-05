import React, { Fragment } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import './Team.css';
import testPicture from "../../assets/testPicture.jpg";
import sashaPicture from "../../assets/Sasha.jpg";
import Oksana from "../../assets/Oksana.png"

import githubIcon from "../../assets/githubIcon.svg";

const Team = () => {
  return (
    <Fragment>
    <Header/>
      <div>
      </div>
      <div className="team-wrapper">
        <div className="team-member">
          <img src={Oksana} alt={"team-member-image"} className="team-member-image"/>
          <p className="team-member-name">Оксана</p>
          <p className="team-member-role">Team lead</p>
          <p className="team-member-decription">Начинающий фронтенд разработчик</p>
          <a target="blank" rel="noreferer" href='https://github.com/OksanaFedotova' className="github-link"><img src={githubIcon} alt={"github-image"}/></a>
        </div>
        <div className="team-member">
          <img src={sashaPicture} alt={"team-member-image"} className="team-member-image"/>
          <p className="team-member-name">Александр</p>
          <p className="team-member-role">Developer</p>
          <p className="team-member-decription">печатает...</p>
          <a target="blank" rel="noreferer" href='https://github.com/sashajozwiak' className="github-link"><img src={githubIcon} alt={"github-image"}/></a>
        </div>
        <div className="team-member">
          <img src={testPicture} alt={"team-member-image"} className="team-member-image"/>
          <p className="team-member-name">Дарья</p>
          <p className="team-member-role">Developer</p>
          <p className="team-member-decription">Добавить пару слов о себе</p>
          <a target="blank" rel="noreferer" href='https://github.com/daryadak' className="github-link"><img src={githubIcon} alt={"github-image"}/></a>
        </div>
      </div>
  <Footer/>
  </Fragment>
  )
}
export default Team;
