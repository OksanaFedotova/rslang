
import React, { Fragment } from "react";
import  { useEffect, useState } from 'react';
import getWords from "../../services/request";
import Card from "../../components/Card/Card";
import IWord from "../../interfaces/IWord";

const initialValue: IWord[] | [] = [];

const Manual = () => {
  const [words, setWords] = useState(initialValue)
  useEffect(() => {
    getWords(0, 0, res => setWords(res))
  }, [])
   return (
    <Fragment>
    {
      words.map((word) => {
       return <Card
          key={word.id}
          image={`https://rslang-b.herokuapp.com/${word.image}`}
          textExample={word.textExample} 
          textExampleTranslate={word.textExampleTranslate} 
          textMeaningTranslate={word.textMeaningTranslate} 
          transcription={word.transcription}
          textMeaning={word.textMeaning}
          word={word.word}
          wordTranslate={word.wordTranslate}
        />
        }
      )
    }
    </Fragment>
   )
}
export default Manual;
