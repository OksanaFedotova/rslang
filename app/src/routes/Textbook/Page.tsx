
import React, { Fragment, useEffect, useState  } from "react";
import { useParams} from "react-router";
import { Link } from "react-router-dom";
import {  useSelector, useDispatch } from "react-redux";
import { setGroup, setPage } from "../../store/pageSlice";

import getWords from "../../services/request";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import IWord from "../../Interfaces/IWord";
import TextbookNav from "./TextbookNav";
import Pagination from "../../components/Pagination/Pagination";
import cn from 'classnames';

import './Page.css';



const initialValue: IWord[] | [] = [];

const Page = () => {

  const {groupNumber, pageNumber} = useParams();
  const group = groupNumber? +groupNumber: 0;
  const page = pageNumber? +pageNumber: 0;

  const dispatch = useDispatch();
  dispatch(setGroup(group));
  dispatch(setPage(page));
  //выделять страницу, если слова отмечены
  const markedWords = useSelector((state: any) => state.page.markedWordsOnPage);
  let allMarked = false;
  let menuGamesActive = true;
  if (markedWords.length === 20) {
    allMarked = true;
    menuGamesActive = false;
  }

  const differentStyles = ['A1','A2','B1','B2','C1','C2'];
  
  const [words, setWords] = useState(initialValue);
  const [isActive, setActive] = useState(false);
  const [isMenuGames, setMenuGames] = useState(false);

  useEffect(() => {
    getWords(group, page, res => {
      setWords(res);
    })
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
       <div className={cn("page", differentStyles[group], {allMarked: allMarked})}>
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
            handleClick={() => {if (menuGamesActive) showGames()}}
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
           {
            words.map((word) => {
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
