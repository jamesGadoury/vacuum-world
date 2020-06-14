import React from 'react';
import WorldSim from './WorldSim';
import { DumbBot } from './Robots';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Vacuum World</h1>
        <div className="div-sim">
          <WorldSim numRows={1} numCols={6} robot={new DumbBot()}/>
        </div>
      </div>     
    </div>
  );
}

export default App;
