
import React, { Fragment, useEffect, useState  } from "react";
import { useParams, useNavigate } from "react-router";

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

type textBookProps = {
  className: string,
  handleClick: (() => void) | undefined
}
const initialTextbookNav: textBookProps = {
    className: "not-active",
    handleClick: undefined
  }

const Page = () => {
  const {groupNumber, pageNumber} = useParams();
  const group = groupNumber? +groupNumber: 0;
  const page = pageNumber? +pageNumber: 0
  const [words, setWords] = useState(initialValue);
  const [isActive, setActive] = useState(initialTextbookNav);
  useEffect(() => {
    getWords(group, page, res => setWords(res))
  }, []);

  const handleClickButton = () => {
    if (isActive.className === "not-active") {
      setActive({
        className: 'active',
        handleClick: () => useEffect(() => {getWords(group, page, res => setWords(res))}, [])
      })
    } else {
      setActive(initialTextbookNav)
    }
  };
   return (
    <Fragment>
       <Header />
       <div className="page">
         <div className="button-container">
           <Button
             className="textbook-button"
             title="Выберите раздел учебника"
             handleClick={handleClickButton} />
         </div>
         <TextbookNav
            className={isActive.className}
            handleClick={isActive.handleClick}
         />
         <div className="cards">
           {words.map((word) => {
             return <Card
               key={word.id.toString()}
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
               audioMeaning={`https://rslang-b.herokuapp.com/${word.audioMeaning}`} />;
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
