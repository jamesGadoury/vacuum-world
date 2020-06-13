class Cell {
   constructor(vacuumPresent, dirtPresent, id) {
      this.vacuumPresent = vacuumPresent;
      this.dirtPresent   = dirtPresent;
      this.id            = id;
   }
}
 
function makeGrid(numRows, numCols) {
   let grid = [];
   for (let i = 0; i < numRows; ++i) {
      for (let j = 0; j < numCols; ++j) {
         let index = i*numCols + j;
         grid[index] = new Cell(false, false, index);
      }
   }
   return grid;
}

function makeWorld(numRows, numCols) {
   let world = makeGrid(numRows, numCols);
   let size = numRows * numCols;

   world[selectRandomCell(size)].vacuumPresent = true;

   // now select random spots for dirt (some may be picked multiple times)
   let randomPickCount = Math.floor(size / 2);
   for (let _ = 0; _ < randomPickCount; ++_) {
      world[selectRandomCell(size)].dirtPresent = true;
   }

   return world;
}

function calcColWidth(numCols) {return 100 / numCols;}
function getColWidth(numCols) {return calcColWidth(numCols) + "%";}

function selectRandomCell(gridSize) {
   return Math.floor(Math.random() * gridSize);
}

function renderWorld(res, numRows, numCols, writeup) {
   res.render('world', { 
      title: 'Vacuum World', 
      writeup: writeup,
      numRows: numRows,
      numCols: numCols,
      colWidth: getColWidth(numCols),
      world: makeWorld(numRows, numCols) 
   });
}
 
/* GET home page. */
exports.world_1_get = function(req, res, next) {
   let numRows = 1;
   let numCols = 2;
   let writeup = 'Hello! This is World 1!';
   renderWorld(res, numRows, numCols, writeup);
}

exports.world_1_post_reset = function(req, res, next) {
   res.render('index', {title:'reset'}, function(err, content) {
      if (err) return next(err);
      res.send(content);
   });
}