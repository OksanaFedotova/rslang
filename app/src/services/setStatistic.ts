import { getStatistic, putStatistic } from "./requestStatistic";
import { createUserWord, updateUserWord } from "../services/user"

interface IUserExist {
  token?: string,
  refreshToken?: string,
  userId: string, 
}
type Obj = {
 [key: string]: number 
}

const calculateNewWords = async (user: IUserExist, words: Obj[], type: string) => {
  const promises =  words.map(async (word) =>  {
    const wordId = Object.keys(word)[0];
    const number = Object.values(word)[0]
    const res = await fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
    }
  })
  if (!res.ok) { 
    if (res.status === 404) {
      const studied = type == 'wright' ? true : false;
      const correct =  type == 'wright' ? number : 0;
      const wrong =  type == 'wrong' ? number : 0;
        const wordInfo =  {
        "difficulty": "none",
        "optional": {
          "studied": studied, 
          "newWord": false,
          "correct": correct,
          "wrong": wrong,
    }}
      createUserWord(user, wordId, wordInfo, res => console.log(res))
      return 1;
    } else {
      alert ('Попробуйте выйти и зайти еще раз')
    }
  } else {
    const json = await res.json();
    const correct =  type == 'wright' ? json.optional.correct + number : json.correct;
    const wrong =  type == 'wrong' ? json.optional.wrong + number : json.wrong;

    const wordInfo =  {
        "difficulty": json.difficulty,
        "optional": {
          "studied": json.studied, 
          "newWord": false,
          "correct": correct,
          "wrong": wrong,
    }}
    updateUserWord(user, wordId, wordInfo, res => console.log(res))
  }
  })
  const result= await Promise.all(promises).then((v) => v)
  return result;
}

const setStatistic = async (user: IUserExist, gameName: string, rightWords: Obj[], wrongWords: Obj[]) => {
  if (rightWords.length == 0 && wrongWords.length == 0) return
  const currentDate = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`
  const userStatistic = await getStatistic(user);
  let newWordsPerDay = 0;
  let learnedWordsPerDay = 0;
  let learnedWords = 0;
  let sprintCorrect = 0;
  let sprintWrong = 0;
  let audioCorrect = 0;
  let audioWrong = 0;
  let percent = 0
  if (userStatistic) {
    if (currentDate) {
      if (currentDate == userStatistic.optional.currentDate) {
      newWordsPerDay = userStatistic.optional.newWordsPerDay || 0;
      learnedWordsPerDay = userStatistic.optional.learnedWordsPerDay || 0;
      learnedWords = userStatistic.learnedWords || 0;
      sprintCorrect = userStatistic.optional.sprintCorrect || 0;
      sprintWrong = userStatistic.optional.sprintWrong || 0;
      audioCorrect = userStatistic.optional.audioCorrect || 0;
      audioWrong = userStatistic.optional.audioWrong || 0;
      percent = userStatistic.optional.percent || 0;
      }
    }
  }
 // const allWordsPerGame = [...rightWords, ...wrongWords].flatMap((word) => Object.keys(word));

  //процент
  const percentPerGame = (rightWords.length / (rightWords.length + wrongWords.length)) * 100;
  percent = percentPerGame;
  //новые слова
  const rightWordsPerGame = await calculateNewWords(user, rightWords, 'wright');
  const wrongWordsPerGame = await calculateNewWords(user, wrongWords, 'wrong');
  const allWordsPerGame = rightWordsPerGame.concat(wrongWordsPerGame)
  const newWordsPerGame = allWordsPerGame.filter(v => typeof v === 'number').length;
  newWordsPerDay += newWordsPerGame;
  //выученные слова
  const  learnedWordsPerGame = rightWords.map((word) => {
   const val = Object.values(word)[0] ? Object.values(word)[0] : 0;
    if (val == undefined) {
      return 
    } else {
      if (val > 1) {
        return  Object.keys(word)[0]
      }
    }
  }).filter(wordId => wordId).length;
  learnedWordsPerDay += learnedWordsPerGame;
  learnedWords += learnedWordsPerGame;
  if (gameName == 'Sprint') {
    sprintCorrect += rightWords.length;
    sprintWrong += wrongWords.length;
  }
  if (gameName == 'AudioChallenge') {
    audioCorrect += rightWords.length;
    audioWrong += wrongWords.length;
  }
  //отправить запрос 
  const data = {
    learnedWords: learnedWords,
    optional: {
      currentDate: currentDate,
      learnedWordsPerDay: learnedWordsPerDay,
      newWordsPerDay: newWordsPerDay,
      sprintCorrect: sprintCorrect,
      sprintWrong: sprintWrong,
      audioCorrect: audioCorrect,
      audioWrong: audioWrong,
      percent: percent
    }
  }
  putStatistic(user, data)
}


export default setStatistic;
