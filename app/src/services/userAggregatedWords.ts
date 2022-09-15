import { IUserExist } from "../Interfaces/IUser";
import { _IWord } from "../Interfaces/IWord";
interface IAggregatedWords {
  paginatedResults: _IWord[];
  totalCount: { count: number }[];
}
const getAggregatedWords = (
  user: IUserExist,
  callback: React.Dispatch<IAggregatedWords[]>
) => {
  fetch(
    `https://rslang-b.herokuapp.com/users/${user.userId}/aggregatedWords?wordsPerPage=100&filter={"userWord.difficulty":"medium"}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json"
      }
    }
  )
    .then(res => res.json())
    .then((res: IAggregatedWords[]) => callback(res))
    .catch(err => console.error(err));
};
export default getAggregatedWords;
