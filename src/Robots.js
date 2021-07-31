import {Actions} from './Actions';
import {updateWorld} from './World';

const expand = (world, node) => {
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

const retrieveActionsToNode = (child) => {
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

const BreadthFirstSearchBot = (world, memory) => { 
   if (!memory.hasOwnProperty('remainingActions')) {
      memory.remainingActions = [];
   }

   const breadthFirstSearch = (world) => {
      // initialize root node w/ state = world
      let node = {state: world, parent: null, action: null};
      if (node.state.robotOnDirt()) {
         // on goal already
         return []; // todo instead of manually return empty and changing to clean; should prob just return "CLEAN"
      }

      let frontier = [ node ];
      // for reached, we can just keep track of the robot idx, since
      // the world will only change in the scope of the robots position
      // in this current world model -> not really a correct representation
      // but I really, really just want to get this to work for now 
      let reached = [ node.state.robotIdx() ];

      while (frontier.length !== 0) {
         node = frontier.shift(); // fifo like
         let children = expand(node.state, node);

         for (let child of children) {
            if (child.state.robotOnDirt()) {
               // on goal
               return retrieveActionsToNode(child);
            }
            if (!reached.includes(child.state.robotIdx())) {
               reached.push(child.state.robotIdx());
               frontier.push(child);
            }
         }
      }
      return []; // if address above todo, then this should return "" since no dirty spot was found
   } 

   if (memory.remainingActions.length === 0) { // no remaining actions defined, search to create list
      memory.remainingActions = breadthFirstSearch(world);
   }
   if (memory.remainingActions.length === 0) {
      return {action: "CLEAN", memory: memory};
   }
   let action = memory.remainingActions.pop();
   return (action ? {action: action, memory: memory} : {action: "CLEAN", memory: memory});
}

const randomMovement = () => {
   return Actions[Math.floor(Math.random() * Math.floor(Actions.length-1) + 1)];
}

const RandomBot = (world, memory) => {
   let nextAction = "";
   if (world.robotCell().dirtPresent) {
      nextAction = "CLEAN";
   }
   else {
      nextAction = randomMovement();
   }
   return {action: nextAction, memory: memory};
}

const DumbBot = (world, memory) => {
   if (!memory.hasOwnProperty('lastAction')) {
      memory.lastAction = "";
   }
   let nextAction = "";
   if (world.robotCell().dirtPresent) {
      nextAction = "CLEAN";
   }
   else {
      if (memory.lastAction === "LEFT") {
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
   return {action: nextAction, memory: {lastAction: nextAction}};
}

const RobotTypes = ["BreadthFirstSearchBot", "DumbBot", "RandomBot"];

const CreateRobot = (RobotType) => {
   if (RobotType === "DumbBot") {
      return {type: RobotType, agentFunction: DumbBot, action: "", memory: {}};
   } 
   if (RobotType === "RandomBot") {
      return {type: RobotType, agentFunction: RandomBot, action: "", memory: {}};
   }
   if (RobotType === "BreadthFirstSearchBot") {
      return {type: RobotType, agentFunction: BreadthFirstSearchBot, action: "", memory: {}}; 
   }
   console.log("Bad Robot Type.");
   return null;
}

export { RobotTypes, CreateRobot };
