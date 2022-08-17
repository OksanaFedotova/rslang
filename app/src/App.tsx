import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './routes/Main/Main';
import Manual from './routes/Manual/Manual';
import './App.css';

function App() {
  return (
  <BrowserRouter>
    <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/manual" element={<Manual/>}/>
     </Routes>
  </BrowserRouter>
  );
}

export default App;
