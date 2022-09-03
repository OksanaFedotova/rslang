
import React, { SelectHTMLAttributes, useEffect, useState } from "react";
import IWord from "../../Interfaces/IWord";
import getWords from "../../services/request";
import Auchform from "./Auchform";

import "./Audiochallenge.css"

const getCard = (words:IWord[], callback: React.Dispatch<React.SetStateAction<any>>) => {
            const randomizeWord:number = Math.floor(Math.random() * 16);
            const wordOne:number = randomizeWord + 1;
            const wordTwo:number = randomizeWord + 2;
            const wordThree:number = randomizeWord + 3;
            const arrWords:[number, number, number, number] = [randomizeWord, wordOne, wordTwo, wordThree]
            const randomizeAudio:number = arrWords[Math.floor(Math.random() * arrWords.length)];
            
            const word = words[randomizeWord].word;
            const word1 = words[wordOne].word;
            const word2 = words[wordTwo].word;
            const word3 = words[wordThree].word;
            const audioWord = words[randomizeAudio].audio;
            const audioWordText = words[randomizeAudio].word;
            callback([word, word1, word2, word3, `https://rslang-b.herokuapp.com/${audioWord}`, audioWordText])
          }

          
function AudioChellengeCard(): JSX.Element {

    const initialValue: IWord[] | [] = [];

    const [words, setWords] = useState(initialValue);
    const [card, setCard] = useState([]);
    const [KeyCode, setKeyCode] = useState(0);

          useEffect(() => {
             getWords(0, 0, res => { 
                setWords(res);
                getCard(res, setCard)
             })
           }, []);

           // СОБЫТИЕ ПО КЛИКУ "ДАЛЕЕ"

           document.body.addEventListener ('keyup', clickNextToo)

            function clickNext () {
            if (document.querySelector("#root > div > button.header-button.next")?.classList.contains('noclick')) {
                return
            }

            getCard(words, setCard)

            document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(1) > b")?.classList.remove('correct','incorrect');
            document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(2) > b")?.classList.remove('correct','incorrect');
            document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(3) > b")?.classList.remove('correct','incorrect');
            document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(4) > b")?.classList.remove('correct','incorrect');
            document.querySelector("#root > div > div.audiocard > div > div")?.classList.remove('noclick')
            document.querySelector("#root > div > button.header-button.next")?.classList.add('noclick')
            setKeyCode(0)
        }
        
           // СОБЫТИЕ ПО КЛАВШИЕ "ENTER"

           function clickNextToo (event: KeyboardEvent) {

            if (event.key === 'Enter') {
                clickNext()            
            } 

            if (KeyCode) {
                return
            } 

            if (+(event.key) >= 1 && +(event.key) <= 4) {
                if (!document.querySelector("#root > div > div > div.wrapper-word > div")?.classList.contains('noclick')) {
                    setKeyCode(+(event.key));
                }
                
                document.body.removeEventListener('keyup', clickNextToo)
            }

        }

        if (!document.querySelector(".auch-wrap")?.classList.contains('disable')) {
            document.body.removeEventListener('keyup', clickNextToo)
        }
    
        return (
            <div>
                <Auchform
                    wordsCard = {card}
                    KeyCode = {KeyCode}
                    />

                    <button className="header-button next noclick" onClick={() => {
                    clickNext()
                }}><p className="next-button">Далее</p></button>
            </div>
        );
}

export default AudioChellengeCard;
