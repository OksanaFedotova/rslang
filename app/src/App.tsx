import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './routes/Main/Main';
import Textbook from './routes/Textbook/Textbook';
import Team from './routes/Team/Team';
import './App.css';
import Page from './routes/Textbook/Page';


function App() {
  return (
  <BrowserRouter>
    <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/textbook" element={<Textbook/>}/>
          <Route path={'textbook/group/:groupNumber/page/:pageNumber'} element={<Page/>}/>
          <Route path="/team" element={<Team/>}/>
     </Routes>
  </BrowserRouter>
  );
}

export default App;
