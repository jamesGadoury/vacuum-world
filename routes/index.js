var express = require('express');
var router = express.Router();

class Cell {
  constructor(vacuumPresent, dirtPresent) {
    this.vacuumPresent = vacuumPresent;
    this.dirtPresent   = dirtPresent;
  }
}

function makeGrid(numRows, numCols) {
  let grid = [];
  for (let i = 0; i < numRows; ++i) {
    for (let j = 0; j < numCols; ++j) {
      grid[i*numCols + j] = new Cell(false, false);
    }
  }

  //TODO fix
  grid[0].vacuumPresent = true;
  grid[1].dirtPresent = true;
  grid[2] = new Cell(true, true);
  return grid;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let numRows = 8;
  let numCols = 8;
  // let gridHeight = numRows * 2 + "em";
  let gridHeight = 100 / numRows + "%";
  let colWidth = 100 / numCols + "%";
  res.render('index', { 
    title: 'Vacuum World', 
    writeup: '',
    numRows: numRows,
    numCols: numCols,
    gridHeight: gridHeight,
    colWidth: colWidth,
    grid: makeGrid(numRows, numCols) 
  });
});

module.exports = router;
