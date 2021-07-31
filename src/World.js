// hello world

function SelectRandomCell(gridSize) {
   return Math.floor(Math.random() * gridSize);
}
 
function GetFlattenedIdx(x, y, numCols) {
   return y*numCols+x;
}

function GetPositionFromIdxInWorld(idx, world) {
   return {x: idx % world.numCols, y: Math.floor(idx / world.numCols)}   
}

const VACUUM = "_";
const DIRT = "*";

function WorldSize(world) {
   return world.numRows*world.numCols;
}

function RandomWorldIdx(world) {
   return SelectRandomCell(WorldSize(world));
}

function MarkRandomSpotsWithDirt(world) {
   let dirtyWorld = Object.assign({}, world);
   let randomPickCount = Math.floor(WorldSize(dirtyWorld) / 2);
   for (let _ = 0; _ < randomPickCount; ++_) {
      let randomIdx = RandomWorldIdx(dirtyWorld);
      dirtyWorld.grid[randomIdx] = dirtyWorld.grid[randomIdx] + DIRT; 
   }
   return dirtyWorld;
}

function InitWorld(numRows, numCols) {
   let world = {numRows: numRows, numCols: numCols, grid: Array(numRows*numCols).fill("")};
   let robotIdx = RandomWorldIdx(world);
   world.grid[robotIdx] = VACUUM;
   world = MarkRandomSpotsWithDirt(world);
   return world;
}

function DirtPresentInCell(cell) {
   return cell.includes(DIRT);
}

function RobotPresentInCell(cell) {
   return cell.includes(VACUUM);
}

function RobotIdxInWorld(world) {
   for (const [index, cell] of world.grid.entries()) {
      if (RobotPresentInCell(cell)) {
         return index;
      }
   }
   return null;
}

function RobotOnDirt(world) {
   const robotIdx  = RobotIdxInWorld(world);
   const robotCell = world.grid[robotIdx];
   return DirtPresentInCell(robotCell);
}

function RobotPositionInWorld(world) {
   return GetPositionFromIdxInWorld(RobotIdxInWorld(world), world);
}

function UpdateWorld(world, robotAction) {
   let grid     = world.grid.slice();
   let robotIdx = RobotIdxInWorld(world);
   let pos      = RobotPositionInWorld(world);
   let numRows  = world.numRows;
   let numCols  = world.numCols;

   if (robotAction === "CLEAN") {
      grid[robotIdx] = grid[robotIdx].replace(DIRT, '');
   }
   else {
      grid[robotIdx] = grid[robotIdx].replace(VACUUM, '');
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
      robotIdx = GetFlattenedIdx(pos.x, pos.y, numCols);
      grid[robotIdx] = grid[robotIdx] + VACUUM;
   }

   return {numRows: world.numRows, numCols: world.numCols, grid: grid};
}

export { InitWorld, UpdateWorld, DirtPresentInCell, RobotPresentInCell, RobotOnDirt, RobotIdxInWorld, RobotPositionInWorld};
