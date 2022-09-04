import React, {useEffect, useState} from "react"
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Layout from "../../../components/Layout/Layout";
import Timer from "./Timer";
import './Sprint.css';
import IWord from "../../../Interfaces/IWord";
import getWords from "../../../services/request";
import rightAnswer from "../../../assets/rightAnswer.mp3";

import  setStatistic  from "../../../services/setStatistic"

const userTest = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGU1N2U4NzAyYjBlMDAxNmU2MmNhNyIsImlhdCI6MTY2MjI5NzIyMywiZXhwIjoxNjYyMzExNjIzfQ.oXbIGOvUAi2uCqyg_fP2owZYDg8IgP_BVHiCgLFtrWU",
  userId: "630e57e8702b0e0016e62ca7"
};

const gameName = 'sprint';
const rightWords = [{'5e9f5ee35eb9e72bc21af4b4': 2}, {'5e9f5ee35eb9e72bc21af4b5': 1}]
const wrongWords = [{'5e9f5ee35eb9e72bc21af4b6': 1}, {'5e9f5ee35eb9e72bc21b005a': 1}]

//setStatistic(userTest, gameName, rightWords, wrongWords);
 
const getVariants = (words: IWord[], callback: React.Dispatch<React.SetStateAction<any>>) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const word = words[randomIndex];
  const englishWord = word.word;
  const isItCorrectCombination = Math.floor(Math.random() * 2);
  const russianWord = isItCorrectCombination ? word.wordTranslate : words[Math.floor(Math.random() * words.length)].wordTranslate;
  callback([englishWord, russianWord]);
}

const Sprint = () => {

  const groupCurrent = useSelector((state: any) => state.page.currentGroup);
  const pageCurrent = useSelector((state: any) => state.page.currentPage);
 

  const initialValue: IWord[] | [] = [];
  const rightSound = new Audio(rightAnswer);
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
                document.querySelector("#root > div > div.level-block > div:nth-child(2)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(3)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(4)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(5)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(6)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(1)")?.classList.add('active');
              }
              }>A1</div>
            <div  className="level" onClick={() => {
              getWords(1, 0, res => { 
                setWords(res)
                getVariants(res, setVariants)})
                document.querySelector("#root > div > div.timer-field")?.classList.add('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(1)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(3)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(4)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(5)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(6)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(2)")?.classList.add('active');
              }}>A2</div>
            <div  className="level" onClick={() => {
              getWords(2, pageRandomNumber, res => { 
                setWords(res)
                getVariants(res, setVariants)})
                document.querySelector("#root > div > div.timer-field")?.classList.add('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(1)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(2)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(4)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(5)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(6)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(3)")?.classList.add('active');
              }}>B1</div>
            <div  className="level"  onClick={() => {
                getWords(3, pageRandomNumber, res => { 
                  setWords(res)
                  getVariants(res, setVariants)})
                document.querySelector("#root > div > div.timer-field")?.classList.add('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(1)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(2)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(3)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(5)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(6)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(4)")?.classList.add('active');
              }}>B2</div>
            <div  className="level"  onClick={() => {
                getWords(4, pageRandomNumber, res => { 
                  setWords(res)
                  getVariants(res, setVariants)})
                document.querySelector("#root > div > div.timer-field")?.classList.add('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(1)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(2)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(3)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(4)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(6)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(5)")?.classList.add('active');
              }}>C1</div>
            <div  className="level"  onClick={() => {
                getWords(5, pageRandomNumber, res => { 
                  setWords(res)
                  getVariants(res, setVariants)})
                document.querySelector("#root > div > div.timer-field")?.classList.add('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(1)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(2)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(3)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(4)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(5)")?.classList.remove('active');
                document.querySelector("#root > div > div.level-block > div:nth-child(6)")?.classList.add('active');
              }}>C2</div>
            </div>
            </div>
          <Timer setGame = {() => { 
               setGameActive(!isGameActive);
               getVariants(words, setVariants);
               
             }
            }
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
                  {words.forEach((word) => {
                    if(word.word == variants[0] && (word.wordTranslate == variants[1])) {
                      currentCount = currentCount + 1;
                      setCount(currentCount);
                      rightSound.play();
                      } else {
                        getVariants(words, setVariants);
                      }
                  })
                }
                }}
                >Да</button>
                <button className="no-button"
                onClick={() => {
                  let currentCount = count;
                  let clicksCount = clicks;
                  clicksCount = clicksCount +1;
                  setClicks(clicksCount);
                  {words.forEach((word) => {
                    if((word.word !== variants[0] && (word.wordTranslate == variants[1]))) {
                      currentCount = currentCount + 1;
                      setCount(currentCount);
                      rightSound.play();
                    } else {
                      getVariants(words, setVariants);
                    }
                  })
                }
                }}
                >Нет</button>
              </div>
              <div className="points">Количество очков: {count}</div>
         </div>
         <div className="result-wrapper">
         <div className='result-modal'>
          <div className="close-modal" onClick={() => {
          document.querySelector("#root > div > div.result-wrapper")?.classList.remove('active');
          document.querySelector("#root > div > div.guess-word-block")?.classList.remove('open');
          }}>X</div>
            <div className="result-text"><b>Твой результат:</b>
            <div><b>{resultCount}%</b></div>
            <div>{count} из {clicks}</div>
            </div>
            <button className="header-button" onClick={() => navToPage('..')}>На главную</button>
            <button className="header-button" onClick={() => navToPage('../textbook')}>В учебник</button>
        </div>
        </div>
      </Layout>
      <Footer/>
    </>
  )
}

export default Sprint;