<<<<<<< HEAD:app/src/services/request.ts
import IWord from "../interfaces/IWord";
=======
import IWord from "../../interfaces/IWord";
>>>>>>> ff348da88d6f220530a5f67903d5454dd33e3a88:app/src/routes/services/request.ts
const getWords = (page: number, group: number, callback: React.Dispatch<React.SetStateAction<IWord[]>>) => {
  fetch(`https://rslang-b.herokuapp.com/words?page=${page}&group=${group}`)
  .then((res) => res.json())
  .then((res) => callback(res))
  .catch((err) => console.log(err))
}
export default getWords;