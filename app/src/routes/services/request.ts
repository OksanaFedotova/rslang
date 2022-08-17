import IWord from "../../Interfaces/IWord";
const getWords = (page: number, group: number, callback: React.Dispatch<React.SetStateAction<IWord[]>>) => {
  fetch(`https://rslang-b.herokuapp.com/words?page=${page}&group=${group}`)
  .then((res) => res.json())
  .then((res) => callback(res))
  .catch((err) => console.log(err))
}
export default getWords;