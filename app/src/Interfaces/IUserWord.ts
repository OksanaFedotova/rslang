interface IUserWord {
  id?: string;
  difficulty: string;
  optional: {
    studied: boolean;
    newWord: boolean;
    correct: number;
    wrong: number;
  };
  wordId?: string;
}
export default IUserWord;
