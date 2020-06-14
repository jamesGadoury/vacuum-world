function DumbBot(grid, robotIdx) {
 
      if (grid[robotIdx].dirtPresent) {
         console.log("CLEAN");
         return "CLEAN";
      }
      if (robotIdx === 0) {
         console.log("RIGHT");
         return "RIGHT";
      }
      console.log("LEFT");
      return "LEFT";
}

export { DumbBot };