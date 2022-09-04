import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ICard from "../../Interfaces/ICard";
import { createUserWord, getUserWord, updateUserWord, deleteUserWord } from "../../services/user";
//import { setDifficultWords } from "../../store/wordsSlice"
import { calculateMarkedWords } from "../../store/pageSlice";
import audioButton from "../../assets/audio.png";
import cn from 'classnames';

import './Card.css'

const Card: React.FunctionComponent<ICard> = ({wordId, image, textExample, textMeaning, textExampleTranslate, textMeaningTranslate, transcription, word, wordTranslate, audio, audioExample, audioMeaning, redraw}) => {

  const isAuth = useSelector((state: any) => state.user.isAuth);
  const user = useSelector((state: any) => state.user.data);

  const dispatch = useDispatch();

  const [isDifficult, setDifficult] = useState(false);
  const [isStudied, setStudied] = useState(false);
  
  useEffect(() => {
    getUserWord(user, wordId, (res) => {
      if (!res) return;
      if (res.difficulty && res.difficulty !== 'none') {
        setDifficult(true);
      }
      if (res.optional.studied) {
        setStudied(true);
      }
    })
  }, []);
 
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
                dispatch(calculateMarkedWords(1));
                isStudied ? 
                updateUserWord(user, wordId, {"difficulty": "medium", "optional": {studied: false, newWord: false}},
                () => {
                  setDifficult(true);
                  setStudied(false);
                })
                 :
                createUserWord(user, wordId, {"difficulty": "medium", "optional": {studied: false, newWord: false}}, 
                () => setDifficult(true));
              }}> Cложное слово</button>}
              {isDifficult && 
              <button 
                onClick={
                  () => { 
                    dispatch(calculateMarkedWords(-1));
                    deleteUserWord(user, wordId);
                    setDifficult(false);
                    if(redraw) redraw();
                  }}> Несложное слово </button>}
            {!isStudied && <button
              onClick={() => {
                isDifficult ? 
                updateUserWord(user, wordId, {"difficulty": "none", "optional": {studied: true, newWord: false}}, 
                () => {
                  setDifficult(false); 
                  setStudied(true);
                }) :
                dispatch(calculateMarkedWords(1));
                createUserWord(user, wordId, {"difficulty": "none", "optional": {studied: true, newWord: false}}, 
                () => {
                  setStudied(true);
                });
                if(redraw) redraw();
              }}>Изученное слово</button>}
            </div>}
    </div>
  )
}
export default Card
