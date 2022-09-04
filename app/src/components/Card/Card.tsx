import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ICard from "../../Interfaces/ICard";
import { createUserWord, getUserWord, updateUserWord, deleteUserWord } from "../../services/user";
import { setMarkedWords, addMarkedWords } from "../../store/pageSlice";
import audioButton from "../../assets/audio.png";
import cn from 'classnames';

import './Card.css'

const prepareData = (arr: any, wordId: string, difficulty: string, studied: boolean, newWord: boolean) => {
  const wordData = arr.filter((wordRed: any) => wordRed.wordId === wordId)[0];
  let dataToLoad = {};
  if (wordData) {
    dataToLoad  = {
      "difficulty": wordData.difficulty ? wordData.difficulty : difficulty,
       "optional": {
        "studied": studied, 
        "newWord": newWord,
        "correct": wordData.correct ? wordData.correct : '-',
        "wrong":  wordData.wrong ? wordData.wrong : '-',
      },
    }
  } else {
    dataToLoad = {
      "difficulty": difficulty,
       "optional": {
        "studied": studied, 
        "newWord": newWord,
        "correct": '-',
        "wrong": '-',
      },
    }
  }
  return dataToLoad;
}

const Card: React.FunctionComponent<ICard> = ({wordId, image, textExample, textMeaning, textExampleTranslate, textMeaningTranslate, transcription, word, wordTranslate, audio, audioExample, audioMeaning, redraw}) => {

  const isAuth = useSelector((state: any) => state.user.isAuth);
  const user = useSelector((state: any) => state.user.data);

  const dispatch = useDispatch();

  const [isDifficult, setDifficult] = useState(false);
  const [isStudied, setStudied] = useState(false);

  let correctAnswerNumber = '-';
  let wrongAnswerNumber = '-';

useEffect(() => {
  getUserWord(user, wordId, (res) => {
      if (!res) return;
      dispatch(setMarkedWords(res));
      if (res.difficulty && res.difficulty !== 'none') {
        setDifficult(true);
      }
      if (res.optional.studied) {
        setStudied(true);
      }
      if(res.optional.correct) {
        correctAnswerNumber = res.optional.correct.toString()
      }
      if(res.optional.wrong) {
        wrongAnswerNumber = res.optional.wrong.toString()
      }
    })
  }, []);
const markedWords = useSelector((state: any) => state.page.markedWordsOnPage);
  return (
    <div className={cn("card", {difficult: isDifficult}, {studied: isStudied})}>
      <img className="card-img" src={image}/>
      <div className="wrapper-word">
        <p className="word">{<b>{word}</b>} - {<i>{wordTranslate}</i>}</p>
        <p dangerouslySetInnerHTML={{__html: transcription}}/>
        <img
          src={audioButton}
          className="audio-control"
          title="audio"
          onClick={() => {
            const audioWord = new Audio(audio);
            const audioMean = new Audio(audioMeaning);
            const audioEx = new Audio(audioExample);
            audioWord.play();
            audioWord.addEventListener('ended', () => {
              audioMean.play();
            })
            audioMean.addEventListener('ended', () => {
              audioEx.play();
            })
          }}
        />
      </div>
      <div className="wrapper-example">
        <p dangerouslySetInnerHTML={{__html: textExample}}/>
        <p dangerouslySetInnerHTML={{__html: textExampleTranslate}}/>
      </div>
      <div className="wrapper-meaning">
        <p dangerouslySetInnerHTML={{__html: textMeaning}}/>
        <p dangerouslySetInnerHTML={{__html: textMeaningTranslate}}/>
      </div>
        { isAuth && <div className="mark-word">
            {!isDifficult && 
            <button 
              onClick={() => {
              //отметить слово сложным
              const dataToLoad = prepareData(markedWords, wordId, "medium", false, false)
                isStudied ?
                updateUserWord(user, wordId, dataToLoad,
                () => {
                  setDifficult(true);
                  setStudied(false);
                })
                 :
                createUserWord(user, wordId, dataToLoad, 
                () => {
                  setDifficult(true);
                  dispatch(addMarkedWords(dataToLoad))
                });
              }}> Cложное слово</button>}
              {isDifficult && 
              <button 
                onClick={
                  () => { 
                    //написать reducer для удаления 
                    deleteUserWord(user, wordId);
                    setDifficult(false);
                    if(redraw) redraw();
                  }}> Несложное слово </button>}
            {!isStudied && <button
              onClick={() => {
                const dataToLoad = prepareData(markedWords, wordId, "none", true, false)
                isDifficult ? 
                updateUserWord(user, wordId, dataToLoad, 
                () => {
                  setDifficult(false); 
                  setStudied(true);
                }) :
                dispatch(addMarkedWords(dataToLoad))
                createUserWord(user, wordId, dataToLoad, 
                () => {
                  setStudied(true);
                });
                if(redraw) redraw();
              }}>Изученное слово</button>}
              <div><p>Количество правильных ответов: {correctAnswerNumber}</p></div>
              <div><p>Количество ошибок: {wrongAnswerNumber}</p></div>
            </div>
            }
    </div>
  )
}
export default Card
