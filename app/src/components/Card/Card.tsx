import React from "react";
interface ICard {
  image: string;
  textExample: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}
const Card: React.FunctionComponent<ICard> = ({image, textExample, textExampleTranslate, textMeaningTranslate, transcription, word, wordTranslate}) => {
  return (
    <div>
      <img src={image}></img>
      <p>{textExample}</p>
      <p>{textExampleTranslate}</p>
      <p>{textMeaningTranslate}</p>
      <p>{transcription}</p>
      <p>{word}</p>
      <p>{wordTranslate}</p>
    </div>
  )
}
export default Card
// audio: "files/01_0002.mp3"
// audioExample: "files/01_0002_example.mp3"
// audioMeaning: "files/01_0002_meaning.mp3"
// group: 0
// id: "5e9f5ee35eb9e72bc21af4a0"
// image: "files/01_0002.jpg"
// page: 0
// textExample: "A person should not drive a car after he or she has been drinking <b>alcohol</b>."
// textExampleTranslate: "Человек не должен водить машину после того, как он выпил алкоголь"
// textMeaning: "<i>Alcohol</i> is a type of drink that can make people drunk."
// textMeaningTranslate: "Алкоголь - это тип напитка, который может сделать людей пьяными"
// transcription: "[ǽlkəhɔ̀ːl]"
// word: "alcohol"
// wordTranslate: "алкоголь"