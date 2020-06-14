import React from 'react';
import World from './World';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Vacuum World</h1>
        <div className="div-sim">
          <World numRows={1} numCols={2}/>
        </div>
      </div>     
    </div>
  );
}

export default App;
