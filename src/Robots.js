import {Actions} from './Actions';

class RandomBot {
   constructor() {
      console.log("Random bot created");
   }
   nextAction(world) {
      let nextAction = "";
      if (world.robotCell().dirtPresent) {
         nextAction = "CLEAN";
      }
      else {
         nextAction = this.randomMovement();
      }
      console.log(`Robot sent ${nextAction}`);
      return nextAction;
   }
   randomMovement() {
      return Actions[Math.floor(Math.random() * Math.floor(Actions.length-1) + 1)];
   }
}

class DumbBot {
   constructor() {
      this.memory = [];
      console.log("Dumb bot created");
   }
   nextAction(world) {
      let nextAction = "";
      if (world.robotCell().dirtPresent) {
         nextAction = "CLEAN";
      }
      else {
         if (this.lastAction() === "LEFT") {
            if (world.robotPosition.x > 0) {
               nextAction = "LEFT";
            } else {
               nextAction = "RIGHT";
            }
         } else {
            if (world.robotPosition.x < world.numCols-1) {
               nextAction = "RIGHT";
            } else {
               nextAction = "LEFT";
            }
         }
      }
      console.log(`Robot sent ${nextAction}`);
      this.memory.push(nextAction);
      return nextAction;
   }
   lastAction() {
      return this.memory[this.memory.length-1];
   }
}

const RobotTypes = ["DumbBot", "RandomBot"];

let CreateRobot = (RobotType) => {
   if (RobotType === "DumbBot") {
      return new DumbBot();
   } 
   if (RobotType === "RandomBot") {
      return new RandomBot();
   }
   console.log("Bad Robot Type.");
}

export { RobotTypes, CreateRobot };