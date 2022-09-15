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
  redraw?: () => void;
  setPageStyle?: () => void;
}
export default ICard;
