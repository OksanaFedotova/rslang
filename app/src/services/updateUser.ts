import { getStatistic, putStatistic } from "./requestStatistic";
interface IUserExist {
  token?: string,
  refreshToken?: string,
  userId: string, 
}
const updateLearnedWords = async (user: IUserExist, type: string) => {
  const userStat = await getStatistic(user);
  const currentDate = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`
  let data;
  if (!userStat) {
    data =  {
      learnedWords: 1,
      optional: {
        currentDate: currentDate,
        learnedWordsPerDay: 1,
        newWordsPerDay: 0,
        sprintCorrect: 0,
        sprintWrong: 0,
        audioCorrect: 0,
        audioWrong: 0,
        percent: 0
      }
    }
  } else {
    const lw = type == 'add' ? userStat.learnedWords + 1 : userStat.learnedWords - 1;
    data = {
      learnedWords: lw,
      optional: {
        currentDate: currentDate,
        learnedWordsPerDay: userStat.optional.learnedWordsPerDay || 0,
        newWordsPerDay: userStat.optional.newWordsPerDay || 0,
        sprintCorrect: userStat.optional.sprintCorrect || 0,
        sprintWrong: userStat.optional.sprintWrong || 0,
        audioCorrect: userStat.optional.audioCorrect || 0,
        audioWrong: userStat.optional.audioWrong || 0,
        percent: userStat.optional.percent || 0
      }
    }
  }
  putStatistic(user, data)
}
export default updateLearnedWords 
