import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";

import  setStatistic  from "../../services/setStatistic";
import { getStatistic, putStatistic } from "../../services/requestStatistic";

import IWord from "../../Interfaces/IWord";

import { getAllUserWords } from "../../services/user"
import { setUser, setUserAuth } from "../../store/userSlice";

const initialValue: IWord[] | [] = [];

const Statisctic = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const user = useSelector((state: any) => state.user.data);

  const navigator = useNavigate();
  const [userWords, setUserWords] = useState(initialValue);

  // useEffect(() => getAllUserWords(user, res => setUserWords(res)), []);
  const userTest = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGU1N2U4NzAyYjBlMDAxNmU2MmNhNyIsImlhdCI6MTY2MjI5NzIyMywiZXhwIjoxNjYyMzExNjIzfQ.oXbIGOvUAi2uCqyg_fP2owZYDg8IgP_BVHiCgLFtrWU",
  userId: "630e57e8702b0e0016e62ca7"
};

const gameName = 'sprint';
const rightWords = [{'5e9f5ee35eb9e72bc21af4b4': 2}, {'5e9f5ee35eb9e72bc21af4b5': 1}]
const wrongWords = [{'5e9f5ee35eb9e72bc21af4b6': 1}, {'5e9f5ee35eb9e72bc21b005a': 1}]

  const handleClick = () => {
    dispatch(setUser(null));
    dispatch(setUserAuth(false));
    localStorage.removeItem('user');
    navigator('..');
  }

  const getStat = async () => {
    const res = await getStatistic(user);
    console.log(res)
  }
  const setStat = () => {
     setStatistic (user, gameName, rightWords, wrongWords)
  }
  return (
    <Fragment>
    <Header/>
    {isAuth && 
      <Layout>
      <button onClick={handleClick}>Выйти</button>
      <button onClick={getStat}>Получить статистику</button>
      <button onClick={setStat}>Отправить статистику</button>
      {/* <button onClick={() => getAllUserWords(user, (res) => console.log(res))}></button> */}
      {/* <div className="difficult-words">
         {userWords.map((word) => {
             return <Card
               key={word.id.toString()}
               wordId={word.id.toString()}
               image={`https://rslang-b.herokuapp.com/${word.image}`}
               word={word.word}
               wordTranslate={word.wordTranslate}
               textExample={word.textExample}
               textExampleTranslate={word.textExampleTranslate}
               textMeaningTranslate={word.textMeaningTranslate}
               transcription={word.transcription}
               textMeaning={word.textMeaning}
               audio={`https://rslang-b.herokuapp.com/${word.audio}`}
               audioExample={`https://rslang-b.herokuapp.com/${word.audioExample}`}
               audioMeaning={`https://rslang-b.herokuapp.com/${word.audioMeaning}`} 
               />;
            }
           )}
      </div> */}
    </Layout>
    }
    {!isAuth && <div><p>Для просмотра статистики войдите или зарегестрируйтесь</p></div>}
    <Footer/>
    </Fragment>
  ) 
}
export default Statisctic;