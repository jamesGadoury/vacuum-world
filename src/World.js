// hello world

function SelectRandomCell(gridSize) {
   return Math.floor(Math.random() * gridSize);
}
 
function GetFlattenedIdx(x, y, numCols) {
   return y*numCols+x;
}
 
class Cell {
   constructor(x,y,vacuumPresent, dirtPresent) {
      this.position = {x:x, y:y};
      this.vacuumPresent = vacuumPresent;
      this.dirtPresent   = dirtPresent; 
   }
}

function InitGrid(numRows, numCols) {
   let grid = [];
   for (let i = 0; i < numRows; ++i) {
      for (let j = 0; j < numCols; ++j) {
         grid[GetFlattenedIdx(j,i,numCols)] = new Cell(j, i, false, false);
      }
   }
   return grid;
}

function InitWorld(numRows, numCols) {
   let world = new World(numRows, numCols, InitGrid(numRows, numCols), {x: SelectRandomCell(numCols), y: SelectRandomCell(numRows)});
   world.grid[world.robotIdx()].vacuumPresent = true;
   world.markRandomSpotsWithDirt();
   return world;
}

function UpdateWorld(world, robotAction) {
   let grid     = world.grid.map(a => Object.assign({}, a));
   let pos      = { ...world.robotPosition };
   let robotIdx = world.robotIdx();
   let numRows  = world.numRows;
   let numCols  = world.numCols;

   if (robotAction === "CLEAN") {
      grid[robotIdx].dirtPresent = false;
   }
   else {
      grid[robotIdx].vacuumPresent = false;
      if (robotAction === "LEFT" && pos.x > 0) {
         pos.x = pos.x-1;
      }
      else if (robotAction === "RIGHT" && pos.x < numCols-1) {
         pos.x = pos.x+1;
      }
      else if (robotAction === "UP" && pos.y > 0) {
         pos.y = pos.y-1;
      }
      else if (robotAction === "DOWN" && pos.y < numRows-1) {
         pos.y = pos.y+1;
      }
      grid[GetFlattenedIdx(pos.x, pos.y, numCols)].vacuumPresent = true;
   }

   return new World(numRows, numCols, grid, pos);
}

class World {
   constructor(numRows, numCols, grid, robotPos) {
      this.numRows       = numRows;
      this.numCols       = numCols;
      this.grid          = grid;
      this.robotPosition = robotPos;
   }

   markRandomSpotsWithDirt() {
      let randomPickCount = Math.floor(this.size() / 2);
      for (let _ = 0; _ < randomPickCount; ++_) {
         this.grid[this.randomIdx()].dirtPresent = true;
      }
   }

   robotIdx() {
      return GetFlattenedIdx(this.robotPosition.x, this.robotPosition.y, this.numCols);
   }

   size() {
      return this.numRows*this.numCols;
   }

   randomIdx() {
      return SelectRandomCell(this.size());
   }

   robotCell() {
      return this.grid[this.robotIdx()];
   }

   robotOnDirt() {
      return this.robotCell().dirtPresent;
   }
}

export {InitWorld, UpdateWorld};
