import React, { useState } from "react";
import ICard from "../../Interfaces/ICard";
import { createUserWord } from "../../services/user";
import audioButton from "../../assets/audio.png";

import './Card.css'

const initialValue: Record<string, unknown>[] | [] = [];

const Card: React.FunctionComponent<ICard> = ({wordId, image, textExample, textMeaning, textExampleTranslate, textMeaningTranslate, transcription, word, wordTranslate, audio, audioExample, audioMeaning, user, wordDifficulty}) => {
  const [difficultWords, setDifficultWord] = useState(initialValue);
  return (
    <div className="card">
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
        { user && <div className="mark-word">
            <button 
              onClick={() => {
                 createUserWord(user, wordId, wordDifficulty, (res) => {
                  // const updated = difficultWords.concat(res);
                  // console.log(updated)
                  setDifficultWord(difficultWords.concat(res));
                  console.log(difficultWords, res);
                 });
                 }}>
              Cложное слово</button>
            <button>Изученное слово</button>
            </div>}
    </div>
  )
}
export default Card
