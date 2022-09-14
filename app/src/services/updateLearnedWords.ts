import { getStatistic, putStatistic } from "./requestStatistic";
import { IUserExist } from "../Interfaces/IUser";
import IUserStat from "../Interfaces/IUserStat";

const updateLearnedWords = async (user: IUserExist, type: string) => {
  let userStat;
  if (user) {
    userStat = await getStatistic(user);
    if (userStat) delete userStat.id;
  }
  const currentDate = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`;
  let data: IUserStat;
  if (!userStat) {
    data = {
      learnedWords: 1,
      optional: {
        currentDate: currentDate,
        learnedWordsPerDay: 1,
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
  } else {
    let learnedWords =
      type == "add" ? userStat.learnedWords + 1 : userStat.learnedWords - 1;
    if (learnedWords < 0) learnedWords = 0;
    let learnedWordsPerDay =
      type == "add"
        ? userStat.optional.learnedWordsPerDay + 1
        : userStat.optional.learnedWordsPerDay - 1;
    if (learnedWordsPerDay < 0) learnedWordsPerDay = 0;
    data = {
      ...userStat,
      learnedWords: learnedWords,
      optional: {
        ...userStat.optional,
        learnedWordsPerDay: learnedWordsPerDay
      }
    };
  }
  putStatistic(user, data);
};
export default updateLearnedWords;
