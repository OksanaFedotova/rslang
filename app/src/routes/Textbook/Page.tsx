import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../store/store";
import { setGroup, setPage, cleanMarkedWords } from "../../store/pageSlice";

import getWords from "../../services/wordsRequests";

import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { IWord } from "../../Interfaces/IWord";
import TextbookNav from "./TextbookNav";
import cn from "classnames";

import "./Page.css";
import "./Pagination.css";

const initialValue: IWord[] | [] = [];

const Page = () => {
  const { groupNumber, pageNumber } = useParams();
  const group = groupNumber ? +groupNumber : 0;
  const page = pageNumber ? +pageNumber : 0;

  const PAGINATION = [
    {
      title: "<<",
      to: `../textbook/group/${group}/page/0`,
      result: 0
    },
    {
      title: "<",
      to: `../textbook/group/${group}/page/${page - 1}`,
      result: page - 1
    },
    {
      title: `${page + 1}`,
      to: `../textbook/group/${group}/page/${page}`,
      result: page
    },
    {
      title: `>`,
      to: `../textbook/group/${group}/page/${page + 1}`,
      result: page + 1
    },
    {
      title: `>>`,
      to: `../textbook/group/${group}/page/29`,
      result: 29
    }
  ];

  const dispatch = useDispatch();
  dispatch(setGroup(group));
  dispatch(setPage(page));
  //выделять страницу, если слова отмечены
  const [menuGamesActive, setMenuGamesActive] = useState(true);

  const markedWords = useSelector(
    (state: RootState) => state.page.markedWordsOnPage
  );
  useEffect(() => setMenuGamesActive(markedWords.length < 20), [markedWords]);

  const differentStyles = ["A1", "A2", "B1", "B2", "C1", "C2"];

  const [words, setWords] = useState(initialValue);
  const [isActive, setActive] = useState(false);
  const [isMenuGames, setMenuGames] = useState(false);

  useEffect(() => {
    getWords(group, page, res => {
      setWords(res);
      if (markedWords.length == 20) {
        setMenuGamesActive(false);
      }
    });
  }, []);

  const handleClickButton = () => {
    setActive(!isActive);
  };
  const showGames = () => {
    setMenuGames(!isMenuGames);
  };

  const handleTextbookNav = (index: number) => {
    getWords(index, page, res => {
      setWords(res);
    });
  };

  return (
    <Fragment>
      <Header />
      <div
        className={cn("page", differentStyles[group], {
          allMarked: !menuGamesActive
        })}
      >
        <div className="button-container">
          <Button
            className="button textbook-button"
            title="Выберите раздел учебника"
            handleClick={handleClickButton}
          />
          {isActive && <TextbookNav handleClick={handleTextbookNav} />}
          <Button
            className="button games-button"
            title="Мини игры"
            handleClick={() => {
              if (menuGamesActive) showGames();
            }}
          />
          {isMenuGames && (
            <ul className="page__menu-games">
              <Link key={"link-sprint"} to={"../games/sprint"}>
                Спринт
              </Link>
              <Link
                key={"link-audio-challenge"}
                to={"../games/audio-challenge"}
              >
                Аудио-вызов
              </Link>
            </ul>
          )}
        </div>
        <div className="cards">
          {words.map(word => {
            return (
              <Card
                key={word.id.toString()}
                wordId={word.id.toString()}
                image={`https://rslang-b.herokuapp.com/${word.image}`}
                word={word.word}
                wordTranslate={word.wordTranslate}
                textExample={word.textExample}
                textExampleTranslate={word.textExampleTranslate}
                textMeaningTranslate={word.textMeaningTranslate}
                transcription={word.transcription}
                textMeaning={word.textMeaning}
                audio={`https://rslang-b.herokuapp.com/${word.audio}`}
                audioExample={`https://rslang-b.herokuapp.com/${word.audioExample}`}
                audioMeaning={`https://rslang-b.herokuapp.com/${word.audioMeaning}`}
              />
            );
          })}
        </div>
      </div>
      <div className="pagination">
        <ul className="pagination-ul">
          {PAGINATION.map(({ title, to, result }, index) => (
            <li className="pagination__list-item" key={index}>
              <Link
                key={index}
                to={to}
                style={
                  result < 0 || result > 29
                    ? { pointerEvents: "none" }
                    : undefined
                }
                onClick={() => {
                  getWords(group, result, res => {
                    setWords(res);
                    dispatch(cleanMarkedWords());
                    console.log(markedWords.length);
                    markedWords.length < 20
                      ? setMenuGamesActive(true)
                      : setMenuGamesActive(false);
                  });
                }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </Fragment>
  );
};
export default Page;
