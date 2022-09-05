import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import Footer from "../../components/Footer/Footer";

import { getStatistic } from "../../services/requestStatistic";
import { setUser, setUserAuth } from "../../store/userSlice";

const Statisctic = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const user = useSelector((state: any) => state.user.data);

  const navigator = useNavigate();
  //const data = {
  //   learnedWords: learnedWords,
  //   optional: {
  //     currentDate: currentDate,
  //     learnedWordsPerDay: learnedWordsPerDay,
  //     newWordsPerDay: newWordsPerDay,
  //     sprintCorrect: sprintCorrect,
  //     sprintWrong: sprintWrong,
  //     audioCorrect: audioCorrect,
  //     audioWrong: audioWrong
  //   }
  // }
  const [newUser, setIsNew] = useState(true);
  type Obj = {
    [key: string]: number | undefined
  }
  const initialValue: any[] | [] = [];

  const [data, setData] = useState(initialValue);
  useEffect(() => {
    const getStat = async () => {
      const res = await getStatistic(user);
     // console.log(res)
      if (res) {
        setIsNew(false)
        setData(Object.values(res));
        console.log(res)
      }
    }
    getStat()
  }, []);

  const handleClick = () => {
    dispatch(setUser(null));
    dispatch(setUserAuth(false));
    localStorage.removeItem('user');
    navigator('..');
  }

  return (
    <Fragment>
    <Header/>
    {isAuth && 
      <div>
      <button onClick={handleClick}>Выйти</button>
      <div>
      {newUser && <div>Вы новый пользователь, не можем отобразить статистику для Вас</div>}
      {!newUser && 
      <div>
       <div>Всего выученных слов: <p>{data[1]}</p></div> 
       <div>Всего выученных слов: <p>{data[2].learnedWordsPerDay}</p></div> 
       
       </div>
      }
      </div>
    </div>
    }
    {!isAuth && <div><p>Для просмотра статистики войдите или зарегестрируйтесь</p></div>}
    <Footer/>
    </Fragment>
  ) 
}
export default Statisctic;