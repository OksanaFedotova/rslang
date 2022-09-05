import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import Footer from "../../components/Footer/Footer";

import { getStatistic } from "../../services/requestStatistic";
import { setUser, setUserAuth } from "../../store/userSlice";
import './Statisctic.css'

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
      <div className="page-stat-wrapper">
      <div>
      {newUser && <div>Вы новый пользователь, не можем отобразить статистику для Вас</div>}
      {!newUser && 
      <div className="wrapper-stat-page">
      <h3 className="stat-title">Статистика</h3>
       <div className="user-name">Пользователь: {user.name}</div>
       <div className="stat-blocks-wrapper">
       <div className="game-stat-block">
            <div className="block-title">Учебник</div>
       <div>Всего выученных слов: <p className="data-block">{data[1]}</p></div> 
       <div>Выученных слов за день: <p className="data-block">{data[2].learnedWordsPerDay}</p></div>
       <div>Всего новых слов за день: <p className="data-block">{data[2].newWordsPerDay}</p></div>
          </div>
          <div className="game-stat-block">
            <div className="block-title">Спринт</div>
       <div>Всего новых слов за день: <p className="data-block">{data[2].newWordsPerDay}</p></div>
       <div>Процент правильных ответов за день: <p className="data-block">{data[2].percent}%</p></div>
       <div>Самая длинная серия правильных ответов за день: <p className="data-block">{data[2].longestSeries}</p></div>
          </div>
          <div className="game-stat-block">
            <div className="block-title">Аудиовызов</div>
       <div>Всего новых слов за день: <p className="data-block">{data[2].newWordsPerDay}</p></div>
       <div>Процент правильных ответов за день: <p className="data-block">{data[2].percent}%</p></div>
       <div>Самая длинная серия правильных ответов за день: <p className="data-block">{data[2].longestSeries}</p></div>
          </div>
        </div>
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