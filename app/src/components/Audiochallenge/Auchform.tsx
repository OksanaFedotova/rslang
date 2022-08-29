import React from "react";
import IAuchForm from "../../Interfaces/IAuchForm";
import audioButton from "../../assets/audio.png";

import './Audiochallenge.css'

const Auchform: React.FunctionComponent<IAuchForm> = ({image, textExample, textMeaning, textExampleTranslate, textMeaningTranslate, transcription, word, word2, word3, word4, wordTranslate, audio, audioWord}) => {

    return (
      <div className="audiocard">
        <div className="wrapper-word">
        <a className="close" href="../games">✖</a>
        
        <p><i>Послушай</i></p>
        <p>↧</p>

        <img
            src={audioButton}
            className="audio-control"
            title="audio"
            onClick={() => {
              const audioWord = new Audio(audio);
              audioWord.play();
            }}
          />
          
          <p><i>и ответь</i></p>
          <p>↧</p>
          
          <div className="words-container" >
            

          <div className="word-block word" onClick={() => {
            
                        if (audioWord === word) {
                            (console.log('OK'))
                            document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(1) > b")?.classList.add('correct')
                        } else {
                            document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(1) > b")?.classList.add('incorrect')
                        }
                        document.querySelector("#root > div > div.audiocard > div > div")?.classList.add('noclick')
                        document.querySelector("#root > div > div.header-button.next.noclick")?.classList.remove('noclick')
                        
                }} >{<b>{word}</b>}</div>
          
          <div className="word-block word" onClick={() => {
                        if (audioWord === word2) {
                            (console.log('OK'))
                            document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(2) > b")?.classList.add('correct')
                        } else {
                            document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(2) > b")?.classList.add('incorrect')
                        }
                        document.querySelector("#root > div > div.audiocard > div > div")?.classList.add('noclick')
                        document.querySelector("#root > div > div.header-button.next.noclick")?.classList.remove('noclick')
                        
                }} >{<b>{word2}</b>}</div>
          
          <div className="word-block word" onClick={() => {
                        if (audioWord === word3) {
                            (console.log('OK'))
                            document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(3) > b")?.classList.add('correct')
                        } else {
                            document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(3) > b")?.classList.add('incorrect')
                        }
                        document.querySelector("#root > div > div.audiocard > div > div")?.classList.add('noclick')
                        document.querySelector("#root > div > div.header-button.next.noclick")?.classList.remove('noclick')

                }} >{<b>{word3}</b>}</div>
          
          <div className="word-block word" onClick={() => {
                        if (audioWord === word4) {
                            (console.log('OK'))
                            document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(4) > b")?.classList.add('correct')
                        } else {
                            document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(4) > b")?.classList.add('incorrect')
                        }
                        document.querySelector("#root > div > div.audiocard > div > div")?.classList.add('noclick')
                        document.querySelector("#root > div > div.header-button.next.noclick")?.classList.remove('noclick')
                        
                }} >{<b>{word4}</b>}</div>
          </div>
        </div>
      </div>
    )
  }

export default Auchform