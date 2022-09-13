import { IWord } from "../Interfaces/IWord";
const getWords = (
  group: number,
  page: number,
  callback: React.Dispatch<IWord[]>
) => {
  fetch(`https://rslang-b.herokuapp.com/words?group=${group}&page=${page}`)
    .then(res => res.json())
    .then((res: IWord[]) => callback(res))
    .catch(err => console.error(err));
};
export default getWords;
