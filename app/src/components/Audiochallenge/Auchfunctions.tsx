
import React, { ReactElement, SetStateAction, useEffect, useState } from "react";
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
            callback([word, word1, word2, word3, audioWord, audioWordText]) 
}


function AudioChellengeCard(): JSX.Element {

    const initialValue: IWord[] | [] = [];
    const [words, setWords] = useState(initialValue);

    const [card, setCard] = useState([]);

          useEffect(() => {
             getWords(0, 0, res => { 
                setWords(res);
                getCard(res, setCard)
             })
           }, []);


        return (
            <div>
                <Auchform key={""}
                    image={""}
                    textExample={""}
                    textExampleTranslate={""}
                    textMeaningTranslate={""}
                    textMeaning={""}
                    transcription={""}
                    word={card[0]}
                    word2={card[1]}
                    word3= {card[2]}
                    word4={card[3]}
                    wordTranslate={""}

                    audio= {`https://rslang-b.herokuapp.com/${card[4]}`}
                    audioWord = {card[5]}
                    />
                    <div className="header-button next noclick" onClick={() => {
                        getCard(words, setCard)
                        document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(1) > b")?.classList.remove('correct','incorrect');
                        document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(2) > b")?.classList.remove('correct','incorrect');
                        document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(3) > b")?.classList.remove('correct','incorrect');
                        document.querySelector("#root > div > div.audiocard > div > div > div:nth-child(4) > b")?.classList.remove('correct','incorrect');
                        document.querySelector("#root > div > div.audiocard > div > div")?.classList.remove('noclick')
                        document.querySelector("#root > div > div.header-button.next")?.classList.add('noclick')
                }}><p className="next-button">Далее</p></div>

            </div>
                        
        );
}

export default AudioChellengeCard;
