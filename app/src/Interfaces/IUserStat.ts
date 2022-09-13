interface IUserStat {
  id?: string;
  learnedWords: number;
  optional: {
    currentDate: string;
    learnedWordsPerDay: number;
    newWordsPerDay: number;
    sprintCorrect: number;
    sprintWrong: number;
    audioCorrect: number;
    audioWrong: number;
    longestSeriesAudio: number;
    longestSeriesSprint: number;
    newWordsSprint: number;
    newWordsAudio: number;
    percentAudio: number;
    percentSprint: number;
  };
}
export default IUserStat;
