import React from "react";
import  { useEffect, useState } from 'react';
import getWords from "../services/request";
import Card from "../../components/Card/Card";

interface ICard {
  image: string;
  textExample: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}
const initialValue: ICard[] | [] = [];

const Manual = () => {
  const [words, setWords] = useState(initialValue)
  useEffect(() => {
    getWords(0, 0, res => setWords(res))
  }, [])
   return (
    <>
    {
      words.forEach((word) => {
       console.log(word);
        <Card
          image={word.image}
          textExample={word.textExample} 
          textExampleTranslate={word.textExampleTranslate} 
          textMeaningTranslate={word.textMeaningTranslate} 
          transcription={word.transcription}
          word={word.word}
          wordTranslate={word.wordTranslate}
        ></Card>
        }
      )
    }
    </>
   )
}
export default Manual;
