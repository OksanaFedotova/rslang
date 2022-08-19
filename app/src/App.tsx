import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './routes/Main/Main';
import Manual from './routes/Manual/Manual';
import Team from './routes/Team/Team';
import './App.css';

function App() {
  return (
  <BrowserRouter>
    <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/manual" element={<Manual/>}/>
          <Route path="/team" element={<Team/>}/>
     </Routes>
  </BrowserRouter>
  );
}

export default App;
