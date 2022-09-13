import { IUserExist } from "../Interfaces/IUser";
import IUserWord from "../Interfaces/IUserWord";

const getAllUserWords = (
  user: IUserExist,
  callback: (res: IUserWord[]) => void
) => {
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json"
    }
  })
    .then(res => res.json())
    .then((res: IUserWord[]) => callback(res))
    .catch(error => console.error(error));
};

const createUserWord = (
  user: IUserExist,
  wordId: string,
  wordInfo: IUserWord,
  callback?: React.Dispatch<React.SetStateAction<IUserWord>>
) => {
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words/${wordId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(wordInfo)
  })
    .then(res => {
      if (!res.ok) {
        return;
      } else {
        return res.json();
      }
    })
    .then((res: IUserWord) => {
      if (callback) callback(res);
    })
    .catch(error => console.error(error));
};
const updateUserWord = (
  user: IUserExist,
  wordId: string,
  wordInfo: IUserWord,
  callback?: (res: IUserWord) => void
) => {
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words/${wordId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(wordInfo)
  })
    .then(res => {
      if (!res.ok) {
        return;
      } else {
        return res.json();
      }
    })
    .then((res: IUserWord) => {
      if (callback) callback(res);
    })
    .catch(error => console.error(error));
};
const deleteUserWord = async (user: IUserExist, wordId: string) => {
  await fetch(
    `https://rslang-b.herokuapp.com/users/${user.userId}/words/${wordId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  ).catch(error => console.error(error));
};
const getUserWord = (
  user: IUserExist,
  id: string,
  callback: (res?: IUserWord) => void
) => {
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json"
    }
  })
    .then(res => {
      if (!res.ok) {
        if (res.status === 404) {
          callback();
        }
      } else {
        return res.json();
      }
    })
    .then((res: IUserWord) => callback(res))
    .catch(error => console.error(error));
};
const getUserWordAsync = async (user: IUserExist, id: string) => {
  return await fetch(
    `https://rslang-b.herokuapp.com/users/${user.userId}/words/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json"
      }
    }
  )
    .then(res => res.json() as unknown as IUserWord)
    .catch(error => console.error(error));
};
const setUserWord = async (
  user: IUserExist,
  wordId: string,
  difficulty: string,
  studied: boolean,
  newWord: boolean
) => {
  const wordData = await getUserWordAsync(user, wordId);
  let dataToLoad: IUserWord = {
    difficulty: difficulty,
    optional: {
      studied: studied,
      newWord: newWord,
      correct: 0,
      wrong: 0
    }
  };
  if (wordData) {
    dataToLoad = {
      ...dataToLoad,
      difficulty: difficulty,
      optional: {
        studied: studied,
        newWord: newWord,
        correct: wordData.optional.correct,
        wrong: wordData.optional.wrong
      }
    };
    updateUserWord(user, wordId, dataToLoad);
  } else {
    createUserWord(user, wordId, dataToLoad);
  }
  return dataToLoad;
};
export {
  getAllUserWords,
  createUserWord,
  updateUserWord,
  deleteUserWord,
  getUserWord,
  getUserWordAsync,
  setUserWord
};
