import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../store/store";
import {
  setMarkedWords,
  addMarkedWords,
  removeMarkedWords
} from "../../store/pageSlice";

import { getUserWord, setUserWord } from "../../services/userWordsRequests";
import updateLearnedWords from "../../services/updateLearnedWords";

import ICard from "../../Interfaces/ICard";

import audioButton from "../../assets/audio.png";
import cn from "classnames";
import "./Card.css";

const Card: React.FunctionComponent<ICard> = ({
  wordId,
  image,
  textExample,
  textMeaning,
  textExampleTranslate,
  textMeaningTranslate,
  transcription,
  word,
  wordTranslate,
  audio,
  audioExample,
  audioMeaning,
  redraw,
  setPageStyle
}) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const user = useSelector((state: RootState) => state.user.data);

  const dispatch = useDispatch();

  const [isDifficult, setDifficult] = useState(false);
  const [isStudied, setStudied] = useState(false);

  const correctAnswerNumber = useRef(0);
  const wrongAnswerNumber = useRef(0);

  useEffect(() => {
    if (user) {
      getUserWord(user, wordId, res => {
        if (!res) return;
        if (res.difficulty && res.difficulty !== "none") {
          setDifficult(true);
          dispatch(setMarkedWords(res));
        }
        if (res.optional.studied) {
          setStudied(true);
          dispatch(setMarkedWords(res));
        }
        if (res.optional.correct) {
          correctAnswerNumber.current = res.optional.correct;
        }
        if (res.optional.wrong) {
          wrongAnswerNumber.current = res.optional.wrong;
        }
      });
    }
  }, []);

  return (
    <div
      className={cn("card", { difficult: isDifficult }, { studied: isStudied })}
    >
      <img className="card-img" src={image} />
      <div className="wrapper-word">
        <p className="word">
          {<b>{word}</b>} - {<i>{wordTranslate}</i>}
        </p>
        <p dangerouslySetInnerHTML={{ __html: transcription }} />
        <img
          src={audioButton}
          className="audio-control"
          title="audio"
          onClick={() => {
            const audioWord = new Audio(audio);
            const audioMean = new Audio(audioMeaning);
            const audioEx = new Audio(audioExample);
            void audioWord.play();
            audioWord.addEventListener("ended", () => {
              void audioMean.play();
            });
            audioMean.addEventListener("ended", () => {
              void audioEx.play();
            });
          }}
        />
      </div>
      <div className="wrapper-example">
        <p dangerouslySetInnerHTML={{ __html: textExample }} />
        <p dangerouslySetInnerHTML={{ __html: textExampleTranslate }} />
      </div>
      <div className="wrapper-meaning">
        <p dangerouslySetInnerHTML={{ __html: textMeaning }} />
        <p dangerouslySetInnerHTML={{ __html: textMeaningTranslate }} />
      </div>
      {isAuth && user && (
        <div className="mark-word">
          {/*???????????????? ?????????? ?????????????? */}
          {!isDifficult && (
            <button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                const dataToLoad = await setUserWord(
                  user,
                  wordId,
                  "medium",
                  false,
                  false
                );
                if (isStudied) {
                  //????????????????, ???????? ???????????? ???????????????????? ?? ??????????????????
                  void updateLearnedWords(user, "remove");
                  setDifficult(true);
                  setStudied(false);
                } else {
                  //?????????????? ??????????
                  setDifficult(true);
                  dispatch(addMarkedWords({ ...dataToLoad, wordId }));
                  //if (setPageStyle) setPageStyle();
                }
              }}
            >
              C???????????? ??????????
            </button>
          )}
          {/*???????????????? ?????????? ?????????????????? */}
          {isDifficult && (
            <button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                dispatch(removeMarkedWords(wordId));
                await setUserWord(user, wordId, "none", false, false);
                setDifficult(false);
                if (redraw) redraw();
                // if (setPageStyle) setPageStyle();
              }}
            >
              ?????????????????? ??????????
            </button>
          )}

          {/*???????????????? ?????????????????? */}
          {!isStudied && (
            <button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                const dataToLoad = await setUserWord(
                  user,
                  wordId,
                  "none",
                  true,
                  false
                );
                void updateLearnedWords(user, "add");
                if (isDifficult) {
                  setDifficult(false);
                  setStudied(true);
                } else {
                  dispatch(addMarkedWords({ ...dataToLoad, wordId }));
                  setStudied(true);
                }

                if (redraw) redraw();
              }}
            >
              ?????????????????? ??????????
            </button>
          )}
          {isStudied && (
            <button
              onClick={() => {
                void setUserWord(user, wordId, "none", false, false);
                void updateLearnedWords(user, "remove");
                setStudied(false);
                dispatch(removeMarkedWords(wordId));
              }}
            >
              ?????????????????????? ??????????
            </button>
          )}
          <div>
            <p>???????????????????? ???????????????????? ??????????????: {correctAnswerNumber.current}</p>
          </div>
          <div>
            <p>???????????????????? ????????????: {wrongAnswerNumber.current}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Card;
