

//import IWord from "../Interfaces/IWord"
interface IUser {
  name?: string,
  email: string,
  password?: string;
  error?: {status: 'failed'};
  expire?: number
}
interface IUserExist {
  token?: string,
  refreshToken?: string,
  userId: string, 
}
interface IUserWord {
  id: string;
  difficulty: string;
  optional: any;
  wordId: string;
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

const refreshToken = async (user: IUserExist) => {
  return await fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/tokens`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.refreshToken}`,
      'Accept': 'application/json',
    }
  })
  .then((res) => {
    if(!res.ok) {
      return res.status
    } else {
      return res.json();
    }
  })
  .catch((error) => console.error(error))
}

const getAllUserWords = (user: IUserExist, callback: (res: IUserWord[]) => void) => {
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
    }
  })
  .then((res) => res.json())
  .then((res) => callback(res))
  .catch((error) => console.error(error))
};
const createUserWord = (user: IUserExist, wordId: string, wordInfo: Record<string, unknown>, callback?: React.Dispatch<React.SetStateAction<IUserWord>>) => {
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(wordInfo)
  })
  .then((res) => {
     if(!res.ok) {
      return;
    } else {
      return res.json();
    }
  })
  .then((res) => {if(callback)callback(res)})
  .catch((error) => console.error(error))
};
const updateUserWord = (user: IUserExist, wordId: string, wordInfo: Record<string, unknown>, callback?: (res: IUserWord) => void) => {
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(wordInfo)
  })
  .then((res) => {
     if(!res.ok) {
      return;
    } else {
      return res.json();
    }
  })
  .then((res) => {if(callback)callback(res)})
  .catch((error) => console.error(error))
}; 
const deleteUserWord = async (user: IUserExist, wordId: string) => {
  await fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .catch((error) => console.error(error))
}; 
const getUserWord = (user: IUserExist, id: string, callback: (res?: IUserWord) => void) => {
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/words/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
    }
  })
  .then((res) => {
     if(!res.ok) {
      if(res.status === 404) {
        callback();
      }
    } else {
      return res.json();
    }
  })
  .then((res) => callback(res))
  .catch((error) => console.error(error))
};
const getAggregatedWords = (user: IUserExist, callback: React.Dispatch<React.SetStateAction<any>>) => {
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/aggregatedWords?filter={"userWord.difficulty":"medium"}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
    }
  })
  .then((res) => res.json())
  .then((res) => callback(res))
  .catch((err) => console.error(err))
}
//{"$or":[{"userWord.difficulty":"medium"},{"userWord.optional.studied":"true"}]}

export {postUser, signIn, getAllUserWords, createUserWord, updateUserWord, getUserWord, deleteUserWord, getAggregatedWords, refreshToken}
