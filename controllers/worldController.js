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
   // grid[0].vacuumPresent = true;
   // grid[1].dirtPresent = true;
   // grid[2] = new Cell(true, true);
   return grid;
}
 
/* GET home page. */
exports.world_1_get = function(req, res, next) {
   let numRows = 1;
   let numCols = 4;
   // let gridHeight = numRows * 2 + "em";
   let gridHeight = 100 / numRows + "%";
   let colWidth = 100 / numCols + "%";
   res.render('world', { 
      title: 'Vacuum World', 
      writeup: '',
      numRows: numRows,
      numCols: numCols,
      gridHeight: gridHeight,
      colWidth: colWidth,
      grid: makeGrid(numRows, numCols) 
   });
}