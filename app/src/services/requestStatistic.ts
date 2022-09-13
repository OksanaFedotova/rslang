import { IUserExist } from "../Interfaces/IUser";
import IUserStat from "../Interfaces/IUserStat";
const getStatistic = async (user: IUserExist) => {
  return await fetch(
    `https://rslang-b.herokuapp.com/users/${user.userId}/statistics`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json"
      }
    }
  )
    .then(res => res.json() as unknown as IUserStat)
    .catch(err => console.error(err));
};
const putStatistic = (user: IUserExist, data: IUserStat) => {
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/statistics`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};
export { getStatistic, putStatistic };
