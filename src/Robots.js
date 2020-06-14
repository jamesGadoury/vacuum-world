import {Actions, ActionString} from './Actions';

class DumbBot {
   constructor() {
      this.memory = [];
   }
   nextAction(world) {
      let nextAction;
      if (world.robotCell().dirtPresent) {
         nextAction = Actions.CLEAN;
      }
      else {
         if (this.lastAction() === Actions.LEFT) {
            if (world.robotPosition.x > 0) {
               nextAction = Actions.LEFT;
            } else {
               nextAction = Actions.RIGHT;
            }
         } else {
            if (world.robotPosition.x < world.numCols-1) {
               nextAction = Actions.RIGHT;
            } else {
               nextAction = Actions.LEFT;
            }
         }
      }
      console.log(ActionString(nextAction));
      this.memory.push(nextAction);
      return nextAction;
   }
   lastAction() {
      return this.memory[this.memory.length-1];
   }
}

export { DumbBot };