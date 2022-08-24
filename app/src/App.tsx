import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './routes/Main/Main';
import Textbook from './routes/Textbook/Textbook';
import Team from './routes/Team/Team';
import Page from './routes/Textbook/Page';
import Games from './routes/Games/Games';
import Sprint from './routes/Games/Sprint/Sprint';
import AudioChallenge from './routes/Games/AudioChallenge/AudioChallenge';

import './App.css';


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
     </Routes>
  </BrowserRouter>
  );
}

export default App;
