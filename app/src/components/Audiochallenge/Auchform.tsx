import React, { useEffect, useRef, useState } from "react";
import IAuchForm from "../../Interfaces/IAuchForm";
import audioButton from "../../assets/audio.png";

import './Audiochallenge.css'
import './Auchmodal.css'

import setStatistic from "../../services/setStatistic";
import { useSelector } from "react-redux";

export const knowWords: string[] = [];
export const dontknowWords: string[] = [];

export const knowWordsId: string[] = [];
export const dontknowWordsId: string[] = [];



function pushStat (arr: string[]) {

//resultReduce source: https://ru.stackoverflow.com/questions/590571/
  const resultReduce = arr.reduce(function(acc: { hash: { [x: string]: { [x: string]: any; }; }; map: {
      get: any; set: (arg0: any, arg1: number) => void; 
      }; result: any[]; }, cur: string | number) {
      if (!acc.hash[cur]) {
        acc.hash[cur] = { [cur]: 1 };
        acc.map.set(acc.hash[cur], 1);
        acc.result.push(acc.hash[cur]);
      } else {
        acc.hash[cur][cur] += 1;
        acc.map.set(acc.hash[cur], acc.hash[cur][cur]);
      }
      return acc;
    }, {
      hash: {},
      map: new Map(),
      result: []
    });
    
    const result = resultReduce.result.sort(function(a: any, b: any) {
      return resultReduce.map.get(b) - resultReduce.map.get(a);
    });

  return result

}

const Auchform: React.FunctionComponent<IAuchForm> = ({ wordsCard, KeyCode}) => {

  const maxSerie = useRef(0);
  const currentSerie = useRef(0);
    

  const user = useSelector((state: any) => state.user.data);
    // счетчик правильных и неправильных ответов 
    const [countWin, setCounterWin] = useState(0)
    const [countfail, setCounterfail] = useState(0)
    const toEnd = (10 - (countWin + countfail))

    const handleWin = () => {
      setCounterWin(countWin + 1)
      }

    const handleFail = () => {
      setCounterfail(countfail + 1)
      }

    function GetStat () {
        if (countWin + countfail >= 10) {
            document.querySelector(".auch-wrap")?.classList.remove('disable');
            setStatistic(user, 'AudioChallenge', pushStat(knowWordsId), pushStat(dontknowWordsId), maxSerie.current)

        }
      }

      GetStat ()


        useEffect(() => {
            if (KeyCode) {
                CheckWord(wordsCard[KeyCode - 1], wordsCard[5], KeyCode)
            }
              }, [KeyCode]);

        // ПРОВЕРКА СЛОВА



        function CheckWord (propWord:string, propaudioWord:string, num:number) {
            

            if (propWord === propaudioWord) {
                document.querySelector("#root > div > div.audiocard > div > div > div:nth-child("+num+") > b")?.classList.add('correct')
                handleWin();
                knowWords.push(propWord, wordsCard[4])
                knowWordsId.push(wordsCard[num+5])
                ++currentSerie.current;

            } else {
                document.querySelector("#root > div > div.audiocard > div > div > div:nth-child("+num+") > b")?.classList.add('incorrect')
                handleFail();
                dontknowWords.push(propWord, wordsCard[4])
                dontknowWordsId.push(wordsCard[num+5])

                if (currentSerie.current > maxSerie.current) {
                  maxSerie.current = currentSerie.current;
                }
                currentSerie.current = 0; 

            }

            document.querySelector("#root > div > div.audiocard > div > div")?.classList.add('noclick')
            document.querySelector("#root > div > button.header-button.next.noclick")?.classList.remove('noclick')
        }

    return (

      <div className="audiocard">
        <div className="wrapper-word">
        <a className="close" href="../games">✖</a>
        
        <p><i>слушай</i></p>
        <p>↧</p>

        <img
            src={audioButton}
            className="audio-control"
            title="audio"
            onClick={() => {
              const audioWord = new Audio(wordsCard[4]);
              audioWord.play();
            }}
          />
          
          <p><i>отвечай</i></p>
          <p>↧</p>
          
          <div className="words-container" >
            
{wordsCard.map((item,index)=> {

    if (index > 3) {
        return null;
    }

    if (!document.querySelector(".auch-wrap")?.classList.contains('disable')) {
        return null;
    }

    return (

     <div key={`word${index}`} className="word-block word" onClick={() => {
        CheckWord(item, wordsCard[5], index + 1)

}} >{<b>{index + 1}.{item}</b>}</div>
)})}                         
          </div>
            <div className="stat">
                <div><i>Правильно: {countWin} | Не правильно: {countfail}</i></div>
                <div><i>Осталось слов: {toEnd}</i></div>
            </div>
        </div>

        <Modal/>

      </div>
      
    )

  }

  const Modal = ():JSX.Element => {
    return(
        <div className="auch-wrap disable">
        <div className="auch-modal">
            <div className="stat-wrapper">

                <div className="know-words">

                <div>ПРАВИЛЬНО</div>
                <div className="arrow-down">↧</div>


                {knowWords.map((item,index) => {

                    return (
                      index % 2 ? null :
                      <div className="small-word" key={`small${index}`}> {item} 
                      
                      <img
                      src={audioButton}
                      className="audio-control small"
                      title="audio"
                      onClick={() => {
                        const audioWord = new Audio(knowWords[index+1]);
                        audioWord.play();
                      }} />
                      </div>
                      
                      )
        })}
                </div>

                <div className="know-words">
                
                <div>ОШИБКИ</div>
                <div className="arrow-down">↧</div>
                
                {dontknowWords.map((item,index) => {

return (
  index % 2 ? null :
                      <div className="small-word" key={`smallword${index}`}> {item} 
                      
                      <img
                      src={audioButton}
                      className="audio-control small"
                      title="audio"
                      onClick={() => {
                        const audioWord = new Audio(dontknowWords[index+1]);
                        audioWord.play();
                      }} />
                      </div>
)
})}
                </div>

            </div>

            <div className="btn-close" onClick={() => {
                window.location.href='./'
                }}>
                В меню
            </div>
        </div>
    </div>
    )
  }

export default Auchform;
