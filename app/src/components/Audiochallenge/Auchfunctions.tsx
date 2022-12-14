/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from "react";
import { IWord } from "../../Interfaces/IWord";
import getWords from "../../services/wordsRequests";
import Auchform from "./Auchform";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

import "./Audiochallenge.css";
import Layout from "../Layout/Layout";

const pageRandomNumber = Math.floor(Math.random() * 30);

const getCard = (words: IWord[], callback: React.SetStateAction<any>) => {
  const randomizeWord: number = Math.floor(Math.random() * 16);
  const wordOne: number = randomizeWord + 1;
  const wordTwo: number = randomizeWord + 2;
  const wordThree: number = randomizeWord + 3;
  const arrWords: [number, number, number, number] = [
    randomizeWord,
    wordOne,
    wordTwo,
    wordThree
  ];
  const randomizeAudio: number =
    arrWords[Math.floor(Math.random() * arrWords.length)];

  const word = words[randomizeWord].wordTranslate;
  const word1 = words[wordOne].wordTranslate;
  const word2 = words[wordTwo].wordTranslate;
  const word3 = words[wordThree].wordTranslate;

  const wordId = words[randomizeWord].id;
  const word1Id = words[wordOne].id;
  const word2Id = words[wordTwo].id;
  const word3Id = words[wordThree].id;

  const audioWord = words[randomizeAudio].audio;
  const audioWordText = words[randomizeAudio].wordTranslate;

  callback([
    word,
    word1,
    word2,
    word3,
    `https://rslang-b.herokuapp.com/${audioWord}`,
    audioWordText,
    wordId,
    word1Id,
    word2Id,
    word3Id
  ]);
};

function AudioChellengeCard(): JSX.Element {
  // ГРУППА И СТРАНИЦА СЛОВ ИЗ REDUX
  const PageGroup = useSelector((state: RootState) => state.page);

  const userGroup = PageGroup.currentGroup;
  const userPage = PageGroup.currentPage;

  let numGroup = 0;
  let numPage = 0;

  function getGroup() {
    if (userGroup !== null) {
      numGroup = userGroup;
    } else {
      numGroup = 0;
    }
    return numGroup;
  }
  function getPage() {
    if (userPage !== null) {
      numPage = userPage;
    } else {
      numPage = 0;
    }
    return numPage;
  }

  //useStates

  const initialValue: IWord[] | [] = [];

  const [words, setWords] = useState(initialValue);
  const [card, setCard] = useState([]);
  const [KeyCode, setKeyCode] = useState(0);

  useEffect(() => {
    if (userGroup !== null) {
      document.querySelector(".level-title")?.classList.add("disable");
      document.querySelector(".level-block")?.classList.add("disable");
      document
        .querySelector("#root > div > div.layout.layout-auch")
        ?.classList.add("layout-auch2");
    }

    getWords(getGroup(), getPage(), res => {
      setWords(res);
      getCard(res, setCard);
    });
  }, []);

  // СОБЫТИЕ ПО КЛИКУ "ДАЛЕЕ"

  document.body.addEventListener("keyup", clickNextToo);

  function clickNext() {
    if (
      document
        .querySelector("#root > div > button.header-button.next")
        ?.classList.contains("noclick")
    ) {
      return;
    }

    getCard(words, setCard);

    document
      .querySelector(
        "#root > div > div.audiocard > div > div > div:nth-child(1) > b"
      )
      ?.classList.remove("correct", "incorrect");
    document
      .querySelector(
        "#root > div > div.audiocard > div > div > div:nth-child(2) > b"
      )
      ?.classList.remove("correct", "incorrect");
    document
      .querySelector(
        "#root > div > div.audiocard > div > div > div:nth-child(3) > b"
      )
      ?.classList.remove("correct", "incorrect");
    document
      .querySelector(
        "#root > div > div.audiocard > div > div > div:nth-child(4) > b"
      )
      ?.classList.remove("correct", "incorrect");
    document
      .querySelector("#root > div > div.audiocard > div > div")
      ?.classList.remove("noclick");
    document
      .querySelector("#root > div > button.header-button.next")
      ?.classList.add("noclick");
    setKeyCode(0);
  }

  // СОБЫТИЕ ПО КЛАВШИЕ "ENTER"

  function clickNextToo(event: KeyboardEvent) {
    if (event.key === "Enter") {
      clickNext();
    }

    if (KeyCode) {
      return;
    }

    if (+event.key >= 1 && +event.key <= 4) {
      if (
        !document
          .querySelector("#root > div > div > div.wrapper-word > div")
          ?.classList.contains("noclick")
      ) {
        setKeyCode(+event.key);
      }

      document.body.removeEventListener("keyup", clickNextToo);
    }
  }

  if (!document.querySelector(".auch-wrap")?.classList.contains("disable")) {
    document.body.removeEventListener("keyup", clickNextToo);
  }

  return (
    <div>
      <Layout className="layout-auch" title='Игра "Аудиовызов"'>
        <div className="game-description">
          <p>В этой игре ты сможешь проверить свои знания на слух.</p>
          <p>
            <b>Цель:</b> выбрать слово, которое слышишь
          </p>
        </div>
        <h3 className="level-title">Выбери уровень:</h3>

        <div className="level-block">
          <div
            className="level"
            onClick={() => {
              getWords(0, 0, res => {
                setWords(res);
                getCard(res, setCard);
              });

              document
                .querySelector("#root > div > div.timer-field")
                ?.classList.add("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(2)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(3)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(4)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(5)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(6)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(1)"
                )
                ?.classList.add("active");
            }}
          >
            A1
          </div>

          <div
            className="level"
            onClick={() => {
              getWords(1, 0, res => {
                setWords(res);
                getCard(res, setCard);
              });
              document
                .querySelector("#root > div > div.timer-field")
                ?.classList.add("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(1)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(3)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(4)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(5)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(6)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(2)"
                )
                ?.classList.add("active");
            }}
          >
            A2
          </div>
          <div
            className="level"
            onClick={() => {
              getWords(2, pageRandomNumber, res => {
                setWords(res);
                getCard(res, setCard);
              });
              document
                .querySelector("#root > div > div.timer-field")
                ?.classList.add("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(1)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(2)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(4)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(5)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(6)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(3)"
                )
                ?.classList.add("active");
            }}
          >
            B1
          </div>
          <div
            className="level"
            onClick={() => {
              getWords(3, pageRandomNumber, res => {
                setWords(res);
                getCard(res, setCard);
              });
              document
                .querySelector("#root > div > div.timer-field")
                ?.classList.add("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(1)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(2)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(3)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(5)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(6)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(4)"
                )
                ?.classList.add("active");
            }}
          >
            B2
          </div>
          <div
            className="level"
            onClick={() => {
              getWords(4, pageRandomNumber, res => {
                setWords(res);
                getCard(res, setCard);
              });
              document
                .querySelector("#root > div > div.timer-field")
                ?.classList.add("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(1)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(2)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(3)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(4)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(6)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(5)"
                )
                ?.classList.add("active");
            }}
          >
            C1
          </div>
          <div
            className="level"
            onClick={() => {
              getWords(5, pageRandomNumber, res => {
                setWords(res);
                getCard(res, setCard);
              });
              document
                .querySelector("#root > div > div.timer-field")
                ?.classList.add("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(1)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(2)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(3)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(4)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(5)"
                )
                ?.classList.remove("active");
              document
                .querySelector(
                  "#root > div > div.layout > div.level-block > div:nth-child(6)"
                )
                ?.classList.add("active");
            }}
          >
            C2
          </div>
        </div>
      </Layout>
      <Auchform wordsCard={card} KeyCode={KeyCode} />

      <button
        className="header-button next noclick"
        onClick={() => {
          clickNext();
        }}
      >
        <p className="next-button">Далее</p>
      </button>
    </div>
  );
}

export default AudioChellengeCard;
