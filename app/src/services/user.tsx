//import IWord from "../Interfaces/IWord"
interface IUser {
  name?: string,
  email: string,
  password?: string;
  error?: {status: 'failed'};
}
interface IUserWord {
  token?: string,
  userId?: string, 
}
const postUser = (user: IUser, callback: (res: IUser) => void) => {
  fetch('https://rslang-b.herokuapp.com/users', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(user)
     })
     .then((res) => res.json())
     .then((res) => callback(res))
     .catch((err) => console.error(err));
   };

const signIn = (user: IUser, callback: (res: IUser) => void, callback2?: (error: Error) => void)=> {
  console.log(user)
     fetch('https://rslang-b.herokuapp.com/signin', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(user)
     })
     .then((res) => res.json())
     .then((res) => callback(res))
     .catch((error) =>{ if(callback2) callback2(error)})
   };
const getAllUserWords = (user: IUserWord, callback: React.Dispatch<React.SetStateAction<any>>) => {
  console.log(user.userId, user.token)
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words}`, {
    method: 'GET',
    //withCredentials: true,
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
    }
  })
  .then((res) => res.json())
  .then((res) => callback(res))
  .catch((error) => console.error(error))
};
const createUserWord = (user: IUserWord, wordId: string, wordDifficulty: Record<string, unknown>, callback: React.Dispatch<React.SetStateAction<any>>) => {
  console.log('user.id:', user.userId, 'wordId:', wordId, 'token:', user.token, wordDifficulty)
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words/${wordId}`, {
    method: 'POST',
    //withCredentials: true, пришлось отключить, так как ts дает ошибку
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(wordDifficulty)
  })
  .then((res) => res.json())
  .then((res) => callback(res))
  .catch((error) => console.error(error))
};

const getUserWord = (user: IUserWord, id: string, callback: React.Dispatch<React.SetStateAction<any>>) => {
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words/${id}`, {
    method: 'GET',
    //withCredentials: true,
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
    }
  })
  .then((res) => res.json())
  .then((res) => callback(res))
  .catch((error) => console.error(error))
};

export {postUser, signIn, getAllUserWords, createUserWord, getUserWord}
