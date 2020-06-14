import {Actions, ActionString} from './Actions';

function DumbBot(world) {
   if (world.robotCell().dirtPresent) {
      console.log(ActionString(Actions.CLEAN));
      return Actions.CLEAN;
   }
   if (world.robotIdx() === 0) {
      console.log(ActionString(Actions.RIGHT));
      return Actions.RIGHT;
   }
   console.log(ActionString(Actions.LEFT));
   return Actions.LEFT;
}

export { DumbBot };