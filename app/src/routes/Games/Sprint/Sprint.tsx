import React, {useState, useEffect} from "react";
import { useParams} from "react-router";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Layout from "../../../components/Layout/Layout";
import Timer from "./Timer";
import './Sprint.css';
import IWord from "../../../Interfaces/IWord";
import getWords from "../../../services/request";



const Sprint = () => {
 
  const initialValue: IWord[] | [] = [];
  const arrayEnWords: string[] = [];
  const arrayRuWords: string[] = [];


    const {groupNumber, pageNumber} = useParams();
    const group = groupNumber? +groupNumber: 0;
    const page = pageNumber? +pageNumber: 0
  
    const [words, setWords] = useState(initialValue);
    const [count, setCount] = useState(0);
    const [isGameActive, setGameActive] = useState(false);

  
    useEffect(() => {
      getWords(group, page, res => setWords(res))
    }, []);

    words.forEach((word) => {
      arrayEnWords.push(word.word);
      arrayRuWords.push(word.wordTranslate);
    });


    const randomIndexEn = Math.floor(Math.random() * words.length);
    const randomIndexRu = Math.floor(Math.random() * words.length);


    const checkAnswer = (answer: boolean) => {
      let currentCount = count;
      words.forEach((word) => {
        if(word.word == arrayEnWords[randomIndexEn] && (word.wordTranslate == arrayRuWords[randomIndexRu])) {
          answer == true;
          currentCount++;
          setCount(currentCount);
        }
    })
  }
  const checkWrongAnswer = (answer: boolean) => {
    let currentCount = count;
      words.forEach((word) => {
        if(word.word !== arrayEnWords[randomIndexEn] || (word.wordTranslate !== arrayRuWords[randomIndexRu])) {
          answer == false;
          currentCount++;
          setCount(currentCount);
        } 
  })
}


  return  (
     <>
      <Header/>
      <Layout title='Игра "Cпринт"'>
        <div className="game-description">
          <p>В этой игре ты сможешь проверить свои знания на время.</p>
          <p><b>Цель:</b> дать максимальное количество правильных ответов за 30 секунд.</p>
          </div>
          <Timer onClick={() => setGameActive(!false)}/>
          <div className="guess-word-block">
            <p className="english-word">{arrayEnWords[randomIndexEn]}</p>
            <p className="russian-word">{arrayRuWords[randomIndexRu]}</p>
              <div className="game-buttons">
                <button className="yes-button"
                onClick={() => checkAnswer(true)}
                >Да</button>
                <button className="no-button"
                onClick={() => checkWrongAnswer(false)}
                >Нет</button>
              </div>
              <div className="points">Количество очков:{count}</div>
         </div>
      </Layout>
      <Footer/>
    </>
  )
}

export default Sprint;
