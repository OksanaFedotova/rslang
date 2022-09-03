import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setUser, setUserAuth } from './store/userSlice';

//import { refreshToken } from './services/user';

import HomePage from './routes/Main/Main';
import Textbook from './routes/Textbook/Textbook';
import Team from './routes/Team/Team';
import Page from './routes/Textbook/Page';
import Statistic from './routes/Statisctic/Statistic';
import Games from './routes/Games/Games';
import Sprint from './routes/Games/Sprint/Sprint';
import AudioChallenge from './routes/Games/AudioChallenge/AudioChallenge';
import Difficult from './routes/Textbook/Difficult';

import './App.css';
//const isAuth
// const isAuth = {path: '/', element: HomePage};
// if (localStorage.getItem('user')) {
//   isAuth.path = '/statistics';
//   isAuth.element = Statistic;
// }

function App() {
   //redux
  const dispatch = useDispatch();
  const userLocal = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;
  
   if (userLocal && userLocal.expire < Date.now()) {
    dispatch(setUserAuth(false));
    dispatch(setUser(null));
    localStorage.removeItem('user');
   }
  //if (userLocal && userLocal.expire < Date.now()) {
  //  (async () => {
  //     const refresh = await refreshToken(userLocal); 
  //     if (typeof refresh === 'number') {
  //       dispatch(setUserAuth(false));
  //       dispatch(setUser(null));
  //       localStorage.removeItem('user');
  //     } else {
  //       userLocal.token = refresh.token;
  //       userLocal.refreshToken = refresh.refreshToken
  //       dispatch(setUser(userLocal));
  //       dispatch(setUserAuth(true));
  //     }
  //  } )()
  // }
  if (userLocal) {
    console.log(userLocal)
      dispatch(setUser(userLocal));
      dispatch(setUserAuth(true));
  }

  return (
  <BrowserRouter>
    <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/textbook" element={<Textbook/>}/>
          <Route path={'textbook/group/:groupNumber/page/:pageNumber'} element={<Page/>}/>
          <Route path="/team" element={<Team/>}/>
          <Route path="/games" element={<Games/>}/>
          <Route path="/games/sprint" element={<Sprint/>}/>
          <Route path="/games/audio-challenge" element={<AudioChallenge/>}/>
          {/*<Route path={isAuth.path} element={<isAuth.element/>}/>*/}
          <Route path="/statistics" element={<Statistic/>}/>
          <Route path="/textbook/difficult" element={<Difficult/>}/>
     </Routes>
  </BrowserRouter>
  );
}

export default App;
