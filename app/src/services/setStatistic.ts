import { getStatistic, putStatistic } from "./requestStatistic";
import { createUserWord, updateUserWord } from "./userWordsRequests";
import { IUserExist } from "../Interfaces/IUser";
import IUserWord from "../Interfaces/IUserWord";

type Obj = {
  [key: string]: number;
};

const calculateNewWords = async (
  user: IUserExist,
  words: Obj[],
  type: string
) => {
  const promises = words.map(async word => {
    const wordId = Object.keys(word)[0];
    const number = Object.values(word)[0];
    const res = await fetch(
      `https://rslang-b.herokuapp.com/users/${user.userId}/words/${wordId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json"
        }
      }
    );
    if (!res.ok) {
      if (res.status === 404) {
        const studied = type == "right" ? true : false;
        const correct = type == "right" ? number : 0;
        const wrong = type == "wrong" ? number : 0;
        const wordInfo = {
          difficulty: "none",
          optional: {
            studied: studied,
            newWord: false,
            correct: correct,
            wrong: wrong
          }
        };
        createUserWord(user, wordId, wordInfo);
        return 1;
      }
    } else {
      const json = (await res.json()) as IUserWord;
      let correct, wrong;
      if (json.optional.correct) {
        correct =
          type == "right"
            ? +json.optional.correct + number
            : json.optional.correct;
      } else {
        correct = type == "right" ? number : 0;
      }
      if (json.optional.wrong) {
        wrong =
          type == "wrong" ? +json.optional.wrong + number : json.optional.wrong;
      } else {
        wrong = type == "wrong" ? number : 0;
      }
      const wordInfo = {
        difficulty: json.difficulty,
        optional: {
          studied: json.optional.studied,
          newWord: false,
          correct: correct,
          wrong: wrong
        }
      };
      updateUserWord(user, wordId, wordInfo);
    }
  });
  const result = await Promise.all(promises).then(v => v);
  return result;
};
const updateStatistic = async (user: IUserExist) => {
  const currentDate = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`;
  const userStatistic = await getStatistic(user);
  let data = {
    learnedWords: 0,
    optional: {
      currentDate: currentDate,
      learnedWordsPerDay: 0,
      newWordsPerDay: 0,
      sprintCorrect: 0,
      sprintWrong: 0,
      audioCorrect: 0,
      audioWrong: 0,
      longestSeriesAudio: 0,
      longestSeriesSprint: 0,
      newWordsSprint: 0,
      newWordsAudio: 0,
      percentAudio: 0,
      percentSprint: 0
    }
  };
  if (userStatistic) {
    data.learnedWords = userStatistic.learnedWords;
    if (currentDate == userStatistic.optional.currentDate) {
      data = {
        ...data,
        optional: {
          ...userStatistic.optional
        }
      };
    }
  }
  return data;
};

const setStatistic = async (
  user: IUserExist,
  gameName: string,
  rightWords: Obj[],
  wrongWords: Obj[],
  series = 0
) => {
  if (!user) return;
  if (rightWords.length == 0 && wrongWords.length == 0) return;
  const currentDate = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`;
  const userStatistic = await getStatistic(user);
  let data = await updateStatistic(user);
  if (userStatistic) {
    data.learnedWords = userStatistic.learnedWords;
    if (currentDate == userStatistic.optional.currentDate) {
      data = {
        ...data,
        optional: {
          ...userStatistic.optional
        }
      };
      //определить лучшую серию
      if (gameName == "Sprint") {
        data.optional.longestSeriesSprint =
          userStatistic.optional.longestSeriesSprint > series
            ? userStatistic.optional.longestSeriesSprint
            : series;
      } else if (gameName == "AudioChallenge") {
        data.optional.longestSeriesAudio =
          userStatistic.optional.longestSeriesAudio > series
            ? userStatistic.optional.longestSeriesAudio
            : series;
      }
    }
  } else {
    if (gameName == "Sprint") {
      data.optional.longestSeriesSprint = series;
    } else if (gameName == "AudioChallenge") {
      data.optional.longestSeriesAudio = series;
    }
  }
  //новые слова
  const rightWordsPerGame = await calculateNewWords(user, rightWords, "right");
  const wrongWordsPerGame = await calculateNewWords(user, wrongWords, "wrong");
  const allWordsPerGame = rightWordsPerGame.concat(wrongWordsPerGame);
  const newWordsPerGame = allWordsPerGame.filter(
    v => typeof v === "number"
  ).length;
  data.optional.newWordsPerDay += newWordsPerGame;

  //выученные слова
  const learnedWordsPerGame = rightWords
    .map(word => {
      const val = Object.values(word)[0] ? Object.values(word)[0] : 0;
      if (val == undefined) {
        return;
      } else {
        if (val > 2) {
          return Object.keys(word)[0];
        }
      }
    })
    .filter(wordId => wordId).length;
  data.optional.learnedWordsPerDay += learnedWordsPerGame;
  data.learnedWords += learnedWordsPerGame;
  if (gameName == "Sprint") {
    data.optional.sprintCorrect += rightWords.length;
    data.optional.sprintWrong += wrongWords.length;
    data.optional.newWordsSprint += newWordsPerGame;
    data.optional.percentSprint = Math.round(
      (data.optional.sprintCorrect /
        (data.optional.sprintCorrect + data.optional.sprintWrong)) *
        100
    );
  } else if (gameName == "AudioChallenge") {
    data.optional.audioCorrect += rightWords.length;
    data.optional.audioWrong += wrongWords.length;
    data.optional.newWordsAudio += newWordsPerGame;
    data.optional.percentAudio = Math.round(
      (data.optional.audioCorrect /
        (data.optional.audioCorrect + data.optional.audioWrong)) *
        100
    );
  }
  putStatistic(user, data);
};

export { setStatistic, updateStatistic };
