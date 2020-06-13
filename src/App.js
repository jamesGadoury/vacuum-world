import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Vacuum World</h1>
        <div className="div-sim">
          <World numRows={1} numCols={2} robotIdx={selectRandomCell(2)}/>
        </div>
      </div>     
    </div>
  );
}

function selectRandomCell(gridSize) {
  return Math.floor(Math.random() * gridSize);
}

function getFlattenedIdx(x, y, numCols) {
  return y*numCols+x;
}

class Cell {
  constructor(x,y,vacuumPresent, dirtPresent) {
    this.position = {x:x, y:y};
    this.vacuumPresent = vacuumPresent;
    this.dirtPresent   = dirtPresent; 
  }
}

class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {numRows: props.numRows, numCols: props.numCols, world: this.initWorld(props.numRows, props.numCols, props.robotIdx)};
    this.setSimStyleProperties(props.numRows, props.numCols)
  }

  initGrid(numRows, numCols) {
    let grid = [];
    for (let i = 0; i < numRows; ++i) {
      for (let j = 0; j < numCols; ++j) {
        grid[getFlattenedIdx(j,i,numCols)] = new Cell(j, i, false, false);
      }
    }
    return grid;
  }

  initWorld(numRows, numCols, robotIdx) {
    let grid = this.initGrid(numRows, numCols);
    let size = numRows * numCols;

    grid[robotIdx].vacuumPresent = true;
    let robotPosition = grid[robotIdx].position;
    // now select random spots for dirt (some may be picked multiple times)
    let randomPickCount = Math.floor(size / 2);
    for (let _ = 0; _ < randomPickCount; ++_) {
      grid[selectRandomCell(size)].dirtPresent = true;
    }
 
    return {grid:grid, robotPosition:robotPosition};
  }


  setSimStyleProperties(numRows, numCols) {
    document.documentElement.style.setProperty("--numRows", numRows);
    document.documentElement.style.setProperty("--numCols", numCols);
    document.documentElement.style.setProperty("--colWidth", 100 / numCols + "%");
  }

  getRobotAction() {
    let world = this.state.world;
    let grid = world.grid;
    let pos = world.robotPosition;
    let idx = getFlattenedIdx(pos.x, pos.y, this.state.numCols);

    if (grid[idx].dirtPresent) {
      console.log("CLEAN");
      return "CLEAN";
    }
    if (idx === 0) {
      console.log("RIGHT");
      return "RIGHT";
    }
    console.log("LEFT");
    return "LEFT";
  }

  processRobotAction(action) {
    let world = this.state.world;
    let grid = world.grid;
    let pos = world.robotPosition;
    let idx = getFlattenedIdx(pos.x, pos.y, this.state.numCols);

    if (action === "CLEAN") {
      grid[idx].dirtPresent = false;
    }
    else {
      grid[idx].vacuumPresent = false;
      if (action === "LEFT" && pos.x > 0) {
        pos.x--;
      }
      else if (action === "RIGHT" && pos.x < this.state.numCols-1) {
        pos.x++;
      }
      else if (action === "UP" && pos.y > 0) {
        pos.y--;
      }
      else if (action === "DOWN" && pos.y < this.state.numRows-1) {
        pos.y++;
      }
      grid[getFlattenedIdx(pos.x, pos.y, this.state.numCols)].vacuumPresent = true;
    }
    
     
    return {grid: grid, robotPosition: pos};
  }

  stepSimulation() {
    // console.log(this.state.world.grid);
    this.setState({
      world:this.processRobotAction(this.getRobotAction())
    });
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.stepSimulation(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
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
      this.state.world.grid.map((cell) => {
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
