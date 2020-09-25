import React from 'react';
import SimManager from './SimManager';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Vacuum World</h1>
        <SimManager numRows={3} numCols={3}/>       
      </div>     
    </div>
  );
}

export default App;
