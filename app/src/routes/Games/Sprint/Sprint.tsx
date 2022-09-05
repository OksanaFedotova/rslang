import React, {useEffect, useRef, useState} from "react"
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router';
import Header from "../../../components/Header/Header";
import Layout from "../../../components/Layout/Layout";
import Timer from "./Timer";
import './Sprint.css';
import IWord from "../../../Interfaces/IWord";
import getWords from "../../../services/request";
import rightAnswerSound from "../../../assets/rightAnswer.mp3";
import wrongAnswerSound from "../../../assets/wrongAnswerSound.mp3";
import setStatistic from "../../../services/setStatistic";
 
const getVariants = (words: IWord[], callback: React.Dispatch<React.SetStateAction<any>>) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const word = words[randomIndex];
  const englishWord = word.word;
  const isItCorrectCombination = Math.floor(Math.random() * 2);
  const russianWord = isItCorrectCombination ? word.wordTranslate : words[Math.floor(Math.random() * words.length)].wordTranslate;
  callback([englishWord, russianWord]);
}

const correctAnswers: string[] = [];
const wrongAnswers: string[] = [];




const Sprint = () => {
  const groupCurrent = useSelector((state: any) => state.page.currentGroup);
  const pageCurrent = useSelector((state: any) => state.page.currentPage);
 

  const initialValue: IWord[] | [] = [];
  const rightSound = new Audio(rightAnswerSound);
  const wrongSound = new Audio(wrongAnswerSound);
  const arrayWords: string[] = [];
  const navToPage = useNavigate();


  const [words, setWords] = useState(initialValue);
  const [count, setCount] = useState(0);
  const [isGameActive, setGameActive] = useState(false);
  const [variants, setVariants] = useState(arrayWords);
  const [clicks, setClicks] = useState(0);


  const pageRandomNumber = Math.floor(Math.random() * 30);
  const resultCount = Math.ceil(count * 100 / clicks);

  const yesButton = document.querySelector<HTMLButtonElement>('.yes-button');
  const noButton = document.querySelector<HTMLButtonElement>('.no-button');

  useEffect(()=>{
    if (groupCurrent !== null) {
      document.querySelector("#root > div > div.level-wrapper")?.classList.add('hidden');
      document.querySelector("#root > div > div.timer-field")?.classList.add('active');
      getWords(groupCurrent, pageCurrent, res => { 
        setWords(res)
        getVariants(res, setVariants)})
    }
    }, [])

    const handleKey = (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        yesButton?.click();
      }
      if (event.key === 'ArrowRight') {
        noButton?.click();
      }
    }

    const countRight = useRef(0);
    const countWrong= useRef(0);
    const correctAnswersCount = () => {
      ++countRight.current;
    }
    const wrongAnswersCount = () => {
      ++countWrong.current;   
    }



    const user = useSelector((state: any) => state.user.data);

 function pushStat(arr: string[]) {

      const resultReduce = arr.reduce(function(acc: { hash: { [x: string]: { [x: string]: any; }; }; map: {
          get: any; set: (arg0: any, arg1: number) => void; 
          }; result: any[]; }, cur: string | number) {
          if (!acc.hash[cur]) {
            acc.hash[cur] = { [cur]: 1 };
            acc.map.set(acc.hash[cur], 1);
            acc.result.push(acc.hash[cur]);
          } else {
            acc.hash[cur][cur] += 1;
            acc.map.set(acc.hash[cur], acc.hash[cur][cur]);
          }
          return acc;
        }, {
          hash: {},
          map: new Map(),
          result: []
        });
        
        const result = resultReduce.result.sort(function(a: any, b: any) {
          return resultReduce.map.get(b) - resultReduce.map.get(a);
        });

      return result
}

const maxSerie = useRef(0);
const currentSerie = useRef(0);



  return  (
     <>
      <Header/>
      <Layout title='Игра "Cпринт"'>
        <div className="game-description">
          <p>В этой игре ты сможешь проверить свои знания на время.</p>
          <p><b>Цель:</b> дать максимальное количество правильных ответов за 30 секунд.</p>
          </div>
          <div className="level-wrapper">
          <h3 className="level-title">Выбери уровень:</h3>
          <div className="level-block">
            <div className="level" onClick={() => {
              getWords(0, pageRandomNumber, res => { 
                setWords(res)
                getVariants(res, setVariants)})
                document.querySelector("#root > div > div.timer-field")?.classList.add('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(2)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(3)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(4)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(5)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(6)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(1)")?.classList.add('active');
              }
              }>A1</div>
            <div  className="level" onClick={() => {
              getWords(1, 0, res => { 
                setWords(res)
                getVariants(res, setVariants)})
                document.querySelector("#root > div > div.timer-field")?.classList.add('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(1)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(3)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(4)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(5)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(6)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(2)")?.classList.add('active');
              }}>A2</div>
            <div  className="level" onClick={() => {
              getWords(2, pageRandomNumber, res => { 
                setWords(res)
                getVariants(res, setVariants)})
                document.querySelector("#root > div > div.timer-field")?.classList.add('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(1)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(2)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(4)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(5)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(6)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(3)")?.classList.add('active');
              }}>B1</div>
            <div  className="level"  onClick={() => {
                getWords(3, pageRandomNumber, res => { 
                  setWords(res)
                  getVariants(res, setVariants)})
                document.querySelector("#root > div > div.timer-field")?.classList.add('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(1)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(2)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(3)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(5)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(6)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(4)")?.classList.add('active');
              }}>B2</div>
            <div  className="level"  onClick={() => {
                getWords(4, pageRandomNumber, res => { 
                  setWords(res)
                  getVariants(res, setVariants)})
                document.querySelector("#root > div > div.timer-field")?.classList.add('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(1)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(2)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(3)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(4)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(6)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(5)")?.classList.add('active');
              }}>C1</div>
            <div  className="level"  onClick={() => {
                getWords(5, pageRandomNumber, res => { 
                  setWords(res)
                  getVariants(res, setVariants)})
                document.querySelector("#root > div > div.timer-field")?.classList.add('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(1)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(2)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(3)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(4)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(5)")?.classList.remove('active');
                document.querySelector("#root > div > div > div.level-block > div:nth-child(6)")?.classList.add('active');
              }}>C2</div>
            </div>
            </div>
          <Timer setGame = {() => { 
               setGameActive(!isGameActive);
               getVariants(words, setVariants);
            }}
           />
          <div className="guess-word-block">
            <p className="english-word">{variants[0]}</p>
            <p className="russian-word">{variants[1]}</p>
              <div className="game-buttons" onKeyDown={handleKey}>
                <button className="yes-button"
                onClick={() => {
                  let currentCount = count;
                  let clicksCount = clicks;
                  clicksCount = clicksCount +1;
                  setClicks(clicksCount);

                  let wordId = '';
                  {words.forEach((word) => {
                    if (word.word == variants[0]) {
                      wordId = word.id
                     }
                  }
                )}
                  {words.forEach((word) => {
                    if (word.id == wordId) {
                    if(word.word == variants[0] && (word.wordTranslate == variants[1])) {
                      currentCount = currentCount + 1;
                      setCount(currentCount);
                      rightSound.play();
                      correctAnswers.push(word.id)
                      correctAnswersCount();
                      ++currentSerie.current;
                      } else {
                        wrongAnswers.push(word.id)
                        wrongAnswersCount();
                        wrongSound.play()
                        if (currentSerie.current > maxSerie.current) {
                          maxSerie.current = currentSerie.current;
                        }

                        currentSerie.current = 0;
                        console.log("cur", currentSerie.current)
                      }
                    }
                  })
                  getVariants(words, setVariants);
                }
                }}
                >Да</button>
                <button className="no-button"
                onClick={() => {
                  let currentCount = count;
                  let clicksCount = clicks;
                  clicksCount = clicksCount +1;
                  setClicks(clicksCount);


                  let wordId = '';
                  {words.forEach((word) => {
                    if (word.word == variants[0]) {
                      wordId = word.id
                     }
                  }
                )}

                  {words.forEach((word) => {
                    if (word.id == wordId) {
                    if((word.word == variants[0] && (word.wordTranslate !== variants[1]))) {
                      currentCount = currentCount + 1;
                      setCount(currentCount);
                      rightSound.play();
                      correctAnswers.push(word.id);   
                      correctAnswersCount();
                      ++currentSerie.current;
                    } else {
                      wrongAnswers.push(word.id)
                      wrongAnswersCount();
                      wrongSound.play()
                      if (currentSerie.current > maxSerie.current) {
                        maxSerie.current = currentSerie.current;
                      }
                      currentSerie.current = 0;
                      console.log("cur", currentSerie.current)
                    }
                  }
                  })
                  getVariants(words, setVariants);
                }
                }}
                >Нет</button>
              </div>
              <div className="points">Количество очков: {count}</div>
         </div>
         <div className="result-wrapper"> 
         <div className='result-modal' onClick={() => {
          setStatistic(user, 'Sprint', pushStat(correctAnswers), pushStat(wrongAnswers));
          document.querySelector("#root > div > div.result-wrapper")?.classList.remove('active');
          document.querySelector("#root > div > div.guess-word-block")?.classList.remove('open');
          navToPage('../games')
          }}>
          <div className="close-modal">X</div>
            <div className="result-text"><b>Твой результат:</b>
            <div><b>{resultCount}%</b></div>
            <div>{count} из {clicks}</div>
            </div>
            <button className="header-button" onClick={() => navToPage('..')}>На главную</button>
            <button className="header-button" onClick={() => navToPage('../textbook')}>В учебник</button>
        </div>
        </div>
      </Layout>
    </>
  )
}

export default Sprint;