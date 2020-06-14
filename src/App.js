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
          <WorldSim numRows={4} numCols={6} robot={DumbBot}/>
        </div>
      </div>     
    </div>
  );
}

export default App;
