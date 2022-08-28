interface IUser {
  name?: string,
  email: string,
  password?: string;
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
     .catch((error) => callback(error))
   };
const singIn = (user: IUser, callback: (res: IUser) => void) => {
     fetch('https://rslang-b.herokuapp.com/singin', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(user)
     })
     .then((res) => res.json())
     .then((res) => callback(res))
     .catch((error) => callback(error))
   };
export {postUser, singIn}