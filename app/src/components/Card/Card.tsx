import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import ICard from "../../Interfaces/ICard";
import { createUserWord, getUserWord, updateUserWord, deleteUserWord } from "../../services/user";
import { setDifficultWords } from "../../store/wordsSlice"
import audioButton from "../../assets/audio.png";
import cn from 'classnames';

import './Card.css'

const Card: React.FunctionComponent<ICard> = ({wordId, image, textExample, textMeaning, textExampleTranslate, textMeaningTranslate, transcription, word, wordTranslate, audio, audioExample, audioMeaning}) => {

  const isAuth = useSelector((state: any) => state.user.isAuth);
  const user = useSelector((state: any) => state.user.data);

  const [isDifficult, setDifficult] = useState(false);
  const [isStudied, setStudied] = useState(false);
  
  useEffect(() => {
    getUserWord(user, wordId, (res) => {
      if (!res) return;
      if (res.difficulty) setDifficult(true);
      if (res.studied) setStudied(true);
    })
  }, []);
  return (
    <div className={cn("card", {difficult: isDifficult})}>
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
                createUserWord(user, wordId, {"difficulty": "medium", "optional": {studied: false, newWord: false}}, 
                () => { 
                // dispatch(setDifficultWords(res));
                setDifficult(true);
              });
              }}> Cложное слово</button>}
              {isDifficult && 
              <button 
                onClick={
                  () => { 
                    deleteUserWord(user, wordId);
                    setDifficult(false);
                  }
                  }> Несложное слово </button>}
            <button>Изученное слово</button>
            </div>}
    </div>
  )
}
export default Card
