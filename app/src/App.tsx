import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './routes/Main/Main';
import Textbook from './routes/Textbook/Textbook';
import Team from './routes/Team/Team';
import Page from './routes/Textbook/Page';
import Statistic from './routes/Statisctic/Statistic'
import Games from './routes/Games/Games';
import Sprint from './routes/Games/Sprint/Sprint';
import AudioChallenge from './routes/Games/AudioChallenge/AudioChallenge';

import './App.css';
//const isAuth
// const isAuth = {path: '/', element: HomePage};
// if (localStorage.getItem('user')) {
//   isAuth.path = '/statistics';
//   isAuth.element = Statistic;
// }
function App() {
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
     </Routes>
  </BrowserRouter>
  );
}

export default App;
