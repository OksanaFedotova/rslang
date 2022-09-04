import React, { Fragment, useEffect, useState  } from "react";
import { useSelector, useDispatch} from 'react-redux';

import { getAggregatedWords } from '../../services/user';
import { setAllDifficultWords } from '../../store/wordsSlice';

import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";

const initialValue: _IWord[] | [] = [];
interface _IWord {
  _id: string;
  image: string;
  textExample: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  textMeaning: string;
  transcription: string;
  word: string;
  wordTranslate: string;
  audio: string;
  audioExample: string;
  audioMeaning: string;
}
const Difficult = () => {

  const isAuth = useSelector((state: any) => state.user.isAuth);
  const user = useSelector((state: any) => state.user.data);

  const [difficultWords, setDifficultWords] = useState(initialValue);
  
  useEffect(() => getAggregatedWords(user, res => setDifficultWords(res[0].paginatedResults)), []);

  const handleRedraw = () => {
    getAggregatedWords(user, res => {setDifficultWords(res[0].paginatedResults)})
  };

  //redux
  const dispatch = useDispatch();
  getAggregatedWords(user, res => dispatch(setAllDifficultWords(res[0].paginatedResults)));
  
  return (
    <Fragment>
      <Header/>
    {
      difficultWords.map((word: _IWord) => {
        return <Card
          key={word._id.toString()}
          wordId={word._id.toString()}
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
          redraw={handleRedraw}
          />;
      }
    )
    }
     <Footer/>
  </Fragment>
   )

}
export default Difficult;
