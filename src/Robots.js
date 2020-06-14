import {Actions, ActionString} from './Actions';

function DumbBot(grid, robotIdx) {
 
      if (grid[robotIdx].dirtPresent) {
         console.log(ActionString(Actions.CLEAN));
         return Actions.CLEAN;
      }
      if (robotIdx === 0) {
         console.log(ActionString(Actions.RIGHT));
         return Actions.RIGHT;
      }
      console.log(ActionString(Actions.LEFT));
      return Actions.LEFT;
}

export { DumbBot };