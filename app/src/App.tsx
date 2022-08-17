import React from 'react';
import HomePage from './routes/Main/Main';
import Manual from './routes/Manual/Manual';
import './App.css';

function App() {
  return (
    <div className="App">
      <Manual/>
      <HomePage/>
    </div>
  );
}

export default App;
