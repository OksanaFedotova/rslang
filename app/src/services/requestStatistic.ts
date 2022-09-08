interface IUserExist {
  token?: string,
  refreshToken?: string,
  userId: string, 
}
const getStatistic = async (user: IUserExist, callback?: any) => {
 return await fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/statistics`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
    }
  })
  .then((res) => res.json())
  .catch((err) => console.error(err))
}
const putStatistic =  (user: IUserExist, data: any) => {
  fetch(`https://rslang-b.herokuapp.com/users/${user.userId}/statistics`, {
       method: 'PUT',
       headers: {
        'Authorization': `Bearer ${user.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
     })
     .then((res) => res.json())
     .catch((err) => console.error(err));
}
export { getStatistic, putStatistic }