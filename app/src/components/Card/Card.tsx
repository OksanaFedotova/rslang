import React from "react";
import ICard from "../../interfaces/ICard";
const Card: React.FunctionComponent<ICard> = ({key, image, textExample, textMeaning, textExampleTranslate, textMeaningTranslate, transcription, word, wordTranslate}) => {
  return (
    <div>
      <img src={image}></img>
      <p dangerouslySetInnerHTML={{__html: textExample}}></p>
      <p dangerouslySetInnerHTML={{__html: textExampleTranslate}}></p>
      <p dangerouslySetInnerHTML={{__html: textMeaningTranslate}}></p>
      <p dangerouslySetInnerHTML={{__html: textMeaning}}></p>
      <p dangerouslySetInnerHTML={{__html: transcription}}></p>
      <p dangerouslySetInnerHTML={{__html: word}}></p>
      <p dangerouslySetInnerHTML={{__html: wordTranslate}}></p>
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
