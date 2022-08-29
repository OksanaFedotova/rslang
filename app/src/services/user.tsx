interface IUser {
  name?: string,
  email: string,
  password?: string;
  status?: string;
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

const signIn = (user: IUser, callback: (res: IUser) => void, callback2: (error: Error) => void)=> {
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
     .catch((error) => callback2(error))
   };


export {postUser, signIn}