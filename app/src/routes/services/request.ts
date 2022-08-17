interface ICard {
  image: string;
  textExample: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}
const getWords = (page: number, group: number, callback: React.Dispatch<React.SetStateAction<ICard[]>>) => {
  fetch(`https://rslang-b.herokuapp.com/words?page=${page}&group=${group}`)
  .then((res) => res.json())
  .then((res) => callback(res))
  .catch((err) => console.log(err))
}
export default getWords;