import {Actions} from './Actions';
import {UpdateWorld, RobotOnDirt, RobotIdxInWorld, RobotPositionInWorld} from './World';

const Expand = (world, node) => {
   let children = [];
   for (let action of ["LEFT", "RIGHT", "UP", "DOWN"]) {
      let newWorld = UpdateWorld(world, action);
      if (RobotIdxInWorld(world) !== RobotIdxInWorld(newWorld)) {
         // this is a valid action, append list with this node
         children.push({state: newWorld, parent: node, action: action});
      }
   }

   return children;
}

const RetrieveActionsToNode = (child) => {
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

const BreadthFirstSearch = (world) => {
   // initialize root node w/ state = world
   let node = {state: world, parent: null, action: null};
   if (RobotOnDirt(node.state)) {
      // on goal already
      return []; // todo instead of manually return empty and changing to clean; should prob just return "CLEAN"
   }

   let frontier = [ node ];
   // for reached, we can just keep track of the robot idx, since
   // the world will only change in the scope of the robots position
   // in this current world model -> not really a correct representation
   // but I really, really just want to get this to work for now 
   let reached = [ RobotIdxInWorld(node.state) ];

   while (frontier.length !== 0) {
      node = frontier.shift(); // fifo like
      let children = Expand(node.state, node);

      for (let child of children) {
         if (RobotOnDirt(child.state)) {
            // on goal
            return RetrieveActionsToNode(child);
         }
         if (!reached.includes(RobotIdxInWorld(child.state))) {
            reached.push(RobotIdxInWorld(child.state));
            frontier.push(child);
         }
      }
   }
   return []; // if address above todo, then this should return "" since no dirty spot was found
} 

const BreadthFirstSearchAgent = (world, memory) => { 
   if (!memory.hasOwnProperty('remainingActions')) {
      memory.remainingActions = [];
   }
   if (memory.remainingActions.length === 0) { // no remaining actions defined, search to create list
      memory.remainingActions = BreadthFirstSearch(world);
   }
   if (memory.remainingActions.length === 0) {
      return {action: "CLEAN", memory: memory};
   }
   let action = memory.remainingActions.pop();
   return (action ? {action: action, memory: memory} : {action: "CLEAN", memory: memory});
}

const RandomMovement = () => {
   return Actions[Math.floor(Math.random() * Math.floor(Actions.length-1) + 1)];
}

const RandomAgent = (world, memory) => {
   let nextAction = "";
   if (RobotOnDirt(world)) {
      nextAction = "CLEAN";
   }
   else {
      nextAction = RandomMovement();
   }
   return {action: nextAction, memory: memory};
}

const DumbAgent = (world, memory) => {
   if (!memory.hasOwnProperty('lastAction')) {
      memory.lastAction = "";
   }
   let nextAction = "";
   if (RobotOnDirt(world)) {
      nextAction = "CLEAN";
   }
   else {
      let robotPosition = RobotPositionInWorld(world);
      if (memory.lastAction === "LEFT") {
         if (robotPosition.x > 0) {
            nextAction = "LEFT";
         } else {
            nextAction = "RIGHT";
         }
      } else {
         if (robotPosition.x < world.numCols-1) {
            nextAction = "RIGHT";
         } else {
            nextAction = "LEFT";
         }
      }
   }
   return {action: nextAction, memory: {lastAction: nextAction}};
}

const RobotTypes = ["BreadthFirstSearchAgent", "DumbAgent", "RandomAgent"];

const CreateRobot = (RobotType) => {
   if (RobotType === "DumbAgent") {
      return {type: RobotType, agentFunction: DumbAgent, action: "", memory: {}};
   } 
   if (RobotType === "RandomAgent") {
      return {type: RobotType, agentFunction: RandomAgent, action: "", memory: {}};
   }
   if (RobotType === "BreadthFirstSearchAgent") {
      return {type: RobotType, agentFunction: BreadthFirstSearchAgent, action: "", memory: {}}; 
   }
   console.log("Bad Robot Type.");
   return null;
}

export { RobotTypes, CreateRobot };
