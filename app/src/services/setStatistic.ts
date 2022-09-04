import { getStatistic, putStatistic } from "./requestStatistic";


interface IUserExist {
  token?: string,
  refreshToken?: string,
  userId: string, 
}
type Obj = {
 [key: string]: number | undefined
}

const calculateNewWords = async (user: IUserExist, wordsIds: string[]) => {
  const promises =  wordsIds.map(async (wordId) =>  {
    const res = await fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
    }
  })
  if (!res.ok) { 
    if (res.status === 404) {
      return 1;
    } else {
      alert ('Попробуйте выйти и зайти еще раз')
    }
  } else {
    const json = await res.json();
    return json
  }
  })
  const result= await Promise.all(promises).then((v) => v)
  return result;
}

const setStatistic = async (user: IUserExist, gameName: string, rightWords: Obj[], wrongWords: Obj[]) => {
  const currentDate = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`
  const userStatistic = await getStatistic(user);
  let newWordsPerDay = 0;
  let learnedWordsPerDay = 0;
  let learnedWords = 0;
  let sprintCorrect = 0;
  let sprintWrong = 0;
  let audioCorrect = 0;
  let audioWrong = 0;
  if (userStatistic) {
    if (currentDate) {
      if (currentDate == userStatistic.optional.currentDate) {
      newWordsPerDay = userStatistic.optional.newWordsPerDay;
      learnedWordsPerDay = userStatistic.optional.learnedWordsPerDay;
      learnedWords = userStatistic.learnedWords;
      sprintCorrect = userStatistic.optional.sprintCorrect;
      sprintWrong = userStatistic.optional.sprintWrong;
      audioCorrect = userStatistic.optional.audioCorrect;
      audioWrong = userStatistic.optional.audioWrong;
      }
    }
  }
  const allWordsPerGame = [...rightWords, ...wrongWords].flatMap((word) => Object.keys(word));
  
  const wordsPerGame = await calculateNewWords(user, allWordsPerGame);
  //новые слова
  const newWordsPerGame = wordsPerGame.filter(v => typeof v === 'number').length;
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
      audioWrong: audioWrong
    }
  }
  putStatistic(user, data)
}


export default setStatistic;
