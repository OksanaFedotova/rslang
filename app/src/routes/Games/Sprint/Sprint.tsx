import React, {useState, useEffect} from "react";
import { useParams} from "react-router";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Layout from "../../../components/Layout/Layout";
import Timer from "./Timer";
import './Sprint.css';
import IWord from "../../../Interfaces/IWord";
import getWords from "../../../services/request";

const getVariants = (words: IWord[], callback: React.Dispatch<React.SetStateAction<any>>, callback2: React.Dispatch<React.SetStateAction<any>>) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const word = words[randomIndex];
  const englishWord = word.word;
  const isItCorrectCombination = Math.floor(Math.random() * 2);
  const russianWord = isItCorrectCombination ? word.wordTranslate : words[Math.floor(Math.random() * words.length)].wordTranslate;
  callback([englishWord, russianWord]);
  isItCorrectCombination ? callback2("yes") : callback2("no");
}

const Sprint = () => {
 
  const initialValue: IWord[] | [] = [];
  const arrayWords: string[] = [];

  const {groupNumber, pageNumber} = useParams();
  const group = groupNumber? +groupNumber: 0;
  const page = pageNumber? +pageNumber: 0

  const [words, setWords] = useState(initialValue);
  const [count, setCount] = useState(0);
  const [isGameActive, setGameActive] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [variants, setVariants] = useState(arrayWords);

  useEffect(() => {
    getWords(group, page, res => { 
       setWords(res);
       getVariants(res, setVariants, setCorrectAnswer)
    })
  }, []);

  return  (
     <>
      <Header/>
      <Layout title='Игра "Cпринт"'>
        <div className="game-description">
          <p>В этой игре ты сможешь проверить свои знания на время.</p>
          <p><b>Цель:</b> дать максимальное количество правильных ответов за 30 секунд.</p>
          </div>
          <Timer 
            setGame={() => {
              setGameActive(!isGameActive);
              getVariants(words, setVariants, setCorrectAnswer)
            }}

          />
          <div className="guess-word-block">
            { isGameActive &&   <>
          <p className="english-word">{variants[0]}</p>
          <p className="russian-word">{variants[1]}</p>
        </>}
              <div className="game-buttons">
                <button className="yes-button"
                  onClick={() => {
                    if (correctAnswer === 'yes') console.log('верно'); //написать логику
                    getVariants(words, setVariants, setCorrectAnswer);
                }}>Да</button>
                <button className="no-button"
                  onClick={() => {
                    if (correctAnswer === 'no') console.log('верно'); //написать логику
                    getVariants(words, setVariants, setCorrectAnswer);
                }}>Нет</button>
              </div>
              <div className="points">Количество очков:{count}</div>
         </div>
      </Layout>
      <Footer/>
    </>
  )
}

export default Sprint;
