import IWord from "../Interfaces/IWord"
interface ICard {
  wordId: string;
  key?: string;
  image: string;
  textExample: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  textMeaning: string;
  transcription: string;
  word: string;
  wordTranslate: string;
  audio: string;
  audioExample: string;
  audioMeaning: string;
  user?: Record<string, unknown>;
  wordDifficulty: Record<string, unknown>;
}
export default ICard;