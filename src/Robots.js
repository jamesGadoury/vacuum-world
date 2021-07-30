import {Actions} from './Actions';
import {updateWorld} from './World';

class BreadthFirstSearchBot { // Breadth First Search Bot
   constructor() {
      this.remainingActions = [];
   }

   nextAction(world) {
      if (this.remainingActions.length === 0) { // no remaining actions defined, search to create list
         this.remainingActions = this.breadthFirstSearch(world);
      }
      if (this.remainingActions.length === 0) {
         return "CLEAN";
      }
      let action = this.remainingActions.pop();
      return (action ? action : "CLEAN");
   }

   breadthFirstSearch(world) {
      // initialize root node w/ state = world
      let node = {state: world, parent: null, action: null};
      if (node.state.robotOnDirt()) {
         // on goal already
         return [];
      }

      let frontier = [ node ];
      // for reached, we can just keep track of the robot idx, since
      // the world will only change in the scope of the robots position
      // in this current world model -> not really a correct representation
      // but I really, really just want to get this to work for now 
      let reached = [ node.state.robotIdx() ];

      while (frontier.length !== 0) {
         node = frontier.shift(); // fifo like
         let children = this.expand(node.state, node);

         for (let child of children) {
            if (child.state.robotOnDirt()) {
               // on goal
               return this.retrieveActionsToNode(child);
            }
            if (!reached.includes(child.state.robotIdx())) {
               reached.push(child.state.robotIdx());
               frontier.push(child);
            }
         }
      }
      return [];
   } 

   expand(world, node) {
      let children = [];
      for (let action of ["LEFT", "RIGHT", "UP", "DOWN"]) {
         let newWorld = updateWorld(world, action);
         if (world.robotIdx() !== newWorld.robotIdx()) {
            // this is a valid action, append list with this node
            children.push({state: newWorld, parent: node, action: action});
         }
      }

      return children;
   }

   retrieveActionsToNode(child) {
      let actions = [ child.action ];
      let parent = child.parent;
      while (parent != null) {
         if (parent.action) {
            actions.push(parent.action);
         }
         parent = parent.parent;
      }
      return actions;
   }
}

class RandomBot {
   nextAction(world) {
      let nextAction = "";
      if (world.robotCell().dirtPresent) {
         nextAction = "CLEAN";
      }
      else {
         nextAction = this.randomMovement();
      }
      return nextAction;
   }
   randomMovement() {
      return Actions[Math.floor(Math.random() * Math.floor(Actions.length-1) + 1)];
   }
}

class DumbBot {
   constructor() {
      this.memory = [];
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
      this.memory.push(nextAction);
      return nextAction;
   }
   lastAction() {
      return this.memory[this.memory.length-1];
   }
}

const RobotTypes = ["BreadthFirstSearchBot", "DumbBot", "RandomBot"];

let CreateRobot = (RobotType) => {
   if (RobotType === "DumbBot") {
      return new DumbBot();
   } 
   if (RobotType === "RandomBot") {
      return new RandomBot();
   }
   if (RobotType === "BreadthFirstSearchBot") {
      return new BreadthFirstSearchBot();
   }
   console.log("Bad Robot Type.");
}

export { RobotTypes, CreateRobot };
