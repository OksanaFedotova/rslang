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
  let newUser = true;
  const [data, setData] = useState({});
  useEffect(() => {
    const getStat = async () => {
      const res = await getStatistic(user);
      if (res) {
        newUser = false;
        setData(res);
      }
    }
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
      <Layout>
      <button onClick={handleClick}>Выйти</button>
      {newUser && <div>Вы новый пользователь, не можем отобразить статистику для Вас</div>}
      {/*Object.values(data).map()*/}
    </Layout>
    }
    {!isAuth && <div><p>Для просмотра статистики войдите или зарегестрируйтесь</p></div>}
    <Footer/>
    </Fragment>
  ) 
}
export default Statisctic;