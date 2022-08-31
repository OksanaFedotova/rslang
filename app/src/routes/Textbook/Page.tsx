
import React, { Fragment, useEffect, useState  } from "react";
import { useParams} from "react-router";
import { Link } from "react-router-dom";

import getWords from "../../services/request";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import IWord from "../../Interfaces/IWord";
import TextbookNav from "./TextbookNav";
import Pagination from "../../components/Pagination/Pagination";


import './Page.css';

const initialValue: IWord[] | [] = [];

const user = {};
if (localStorage.user) {
  Object.assign(user, JSON.parse(localStorage.user));
  console.log(user)
}

const test = {"difficulty": "weak", "optional": {testFieldString: 'test', testFieldBoolean: true}} //временно, для проверки запроса
const Page = () => {

  const {groupNumber, pageNumber} = useParams();
  const group = groupNumber? +groupNumber: 0;
  const page = pageNumber? +pageNumber: 0

  const [words, setWords] = useState(initialValue);
  const [isActive, setActive] = useState(false);
  const [isMenuGames, setMenuGames] = useState(false);

  useEffect(() => {
    getWords(group, page, res => setWords(res))
  }, []);

  const handleClickButton = () => {
    setActive(!isActive)
  };
  const showGames = () => {
    setMenuGames(!isMenuGames)
  }
   return (
    <Fragment>
       <Header />
       <div className="page">
         <div className="button-container">
           <Button
             className="button textbook-button"
             title="Выберите раздел учебника"
             handleClick={handleClickButton} />
          {
            isActive && <TextbookNav
              handleClick={() => 
                useEffect(() => {getWords(group, page, res => setWords(res))}, [])
              }/> 
          }
          <Button
            className="button games-button"
            title="Мини игры"
            handleClick={showGames}
          />
          {isMenuGames && 
            <ul className="page__menu-games">
              <Link
                key={'link-sprint'}
                to={'../games/sprint'}
              >
                Спринт
              </Link>
              <Link
                key={'link-audio-challenge'}
                to={'../games/audio-challenge'} 
              >
                Аудио-вызов
              </Link>
            </ul>
          }
        </div>
         <div className="cards">
           {words.map((word) => {
             return <Card
               key={word.id.toString()}
               wordId={word.id.toString()}
               image={`https://rslang-b.herokuapp.com/${word.image}`}
               word={word.word}
               wordTranslate={word.wordTranslate}
               textExample={word.textExample}
               textExampleTranslate={word.textExampleTranslate}
               textMeaningTranslate={word.textMeaningTranslate}
               transcription={word.transcription}
               textMeaning={word.textMeaning}
               audio={`https://rslang-b.herokuapp.com/${word.audio}`}
               audioExample={`https://rslang-b.herokuapp.com/${word.audioExample}`}
               audioMeaning={`https://rslang-b.herokuapp.com/${word.audioMeaning}`}
               user={user}
               wordDifficulty={test}
               />;
            }
           )}
         </div>
       </div>
       <Pagination 
        group={group}
        page={page}
        handleClick={() => 
          useEffect(() => {getWords(group, page, res => setWords(res))}, [])
        }
       />
     <Footer />
    </Fragment>
   )
}
export default Page;
