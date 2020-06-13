import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Vacuum World</h1>
        <div className="div-sim">
          <World numRows={4} numCols={6}/>
        </div>
      </div>     
    </div>
  );
}

class Cell {
  constructor(vacuumPresent, dirtPresent) {
    this.vacuumPresent = vacuumPresent;
    this.dirtPresent   = dirtPresent; 
  }
}

class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {world: this.initWorld(props.numRows, props.numCols)};
    this.setSimStyleProperties(props.numRows, props.numCols)
  }

  initGrid = function(numRows, numCols) {
    let grid = [];
    for (let i = 0; i < numRows; ++i) {
      for (let j = 0; j < numCols; ++j) {
        let index = i*numCols + j;
        grid[index] = new Cell(false, false, index);
      }
    }
    return grid;
  }

  initWorld = function(numRows, numCols) {
    let world = this.initGrid(numRows, numCols);
    let size = numRows * numCols;

    world[this.selectRandomCell(size)].vacuumPresent = true;

    // now select random spots for dirt (some may be picked multiple times)
    let randomPickCount = Math.floor(size / 2);
    for (let _ = 0; _ < randomPickCount; ++_) {
       world[this.selectRandomCell(size)].dirtPresent = true;
    }
 
    return world;
  }

  selectRandomCell = function(gridSize) {
    return Math.floor(Math.random() * gridSize);
  }

  setSimStyleProperties(numRows, numCols) {
    document.documentElement.style.setProperty("--numRows", numRows);
    document.documentElement.style.setProperty("--numCols", numCols);
    document.documentElement.style.setProperty("--colWidth", 100 / numCols + "%");
  }
  renderVacuum(dirtPresent) {
    if (dirtPresent) {
      return (
        <div className='sim-cell' style={{'background-color':'SaddleBrown'}}>
          <div className='vacuum'></div>
        </div>
      )
    }
    return (
      <div className='sim-cell' style={{'background-color':'Cornsilk'}}>
        <div className='vacuum'></div>
      </div>
    )
  }
  render() {
    return (
      this.state.world.map((cell) => {
        if (cell.vacuumPresent) {
          return this.renderVacuum(cell.dirtPresent);
        }
        if (cell.dirtPresent) {
          return <div className='sim-cell' style={{'background-color':'SaddleBrown'}}></div>;
        }
        return <div className='sim-cell' style={{'background-color':'Cornsilk'}}></div>
      })
    );
  }
}



export default App;
