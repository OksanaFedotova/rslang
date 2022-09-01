import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router';

import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";

import IWord from "../../Interfaces/IWord";

import { getAllUserWords } from "../../services/user"


let isAuth = false;
const user = {};
if (localStorage.user) {
  isAuth = true;
  Object.assign(user, JSON.parse(localStorage.user));
  console.log(user)
}
const initialValue: IWord[] | [] = [];

const Statisctic = () => {

  const navigator = useNavigate();
  const [userWords, setUserWords] = useState(initialValue);

  useEffect(() => getAllUserWords(user, res => setUserWords(res)), []);

  const handleClick = () => {
    localStorage.removeItem('user');
    navigator('..');
  }
  const test = {"difficulty": "weak", "optional": {testFieldString: 'test', testFieldBoolean: true}}
  return (
    <Fragment>
    <Header/>
    {isAuth && 
      <Layout>
      <button onClick={handleClick}>Выйти</button>
      <div className="difficult-words">
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
               user={user}
               wordDifficulty={test}
               />;
            }
           )}
      </div>
    </Layout>
    }
    {!isAuth && <div><p>Для просмотра статистики войдите или зарегестрируйтесь</p></div>}
    <Footer/>
    </Fragment>
  ) 
}
export default Statisctic;