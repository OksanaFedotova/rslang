import { IUser } from "../Interfaces/IUser";

const postUser = (user: IUser, callback: (res: IUser) => void) => {
  fetch("https://rslang-b.herokuapp.com/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then((res: IUser) => callback(res))
    .catch(err => console.error(err));
};

const signIn = (
  user: IUser,
  callback: (res: IUser) => void,
  callback2?: (error: Error) => void
) => {
  fetch("https://rslang-b.herokuapp.com/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then((res: IUser) => callback(res))
    .catch((error: Error) => {
      if (callback2) callback2(error);
    });
};

export { postUser, signIn };
