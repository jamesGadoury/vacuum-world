import React, {useEffect, useRef, useState} from 'react';
import WorldSim from './WorldSim';
import {InitWorld, UpdateWorld} from './World';
import { RobotTypes, CreateRobot } from './Robots';
import { UniqueKeyGenerator } from './Utilities';
import { Actions } from './Actions';

function SimManager(props) {
   const [simState, setSimState] = useState({
      world: InitWorld(props.numRows, props.numCols),
      robot: CreateRobot(RobotTypes[0])
   });
   const [runningSim, setRunningSim] = useState(true);

   const keyGen = new UniqueKeyGenerator();

   const timer = useRef();

   useEffect(() => {
      if (runningSim) {
         timer.current = setInterval(() => {
            setSimState(prevSimState => {
               let robot = prevSimState.robot;
               let memoryCopy = Object.assign({}, robot.memory);
               let world = prevSimState.world;
               const {action, memory} = robot.agentFunction(world, memoryCopy);
               if (Actions.indexOf(action) === -1) {
                  console.log(`${action} is not a valid action.`);
               }
               return { 
                  world: UpdateWorld(world, action),
                  robot: {type: robot.type, agentFunction: robot.agentFunction, action: action, memory: memory}
               };
            })
         }, 1000)
      } else {
         clearInterval(timer.current);
      }
   }, [runningSim]); 

   const handleRobotChange = (event) => {
      setSimState({world: simState.world, robot: CreateRobot(event.target.value)});
   }

   const handleRowChange = (event) => {
      setSimState({world: InitWorld(parseInt(event.target.value), simState.world.numCols), robot: simState.robot});
   }

   const handleColChange = (event) => {
      setSimState({world: InitWorld(simState.world.numRows, parseInt(event.target.value)), robot: simState.robot});
   }

   const resetWorld = () => {
      setSimState({world: InitWorld(simState.world.numRows, simState.world.numCols), robot: simState.robot});
   }

   const stopWorld = () => {
      setRunningSim(false);
   }

   const startWorld = () => {
      setRunningSim(true);
   }

   const renderRobotTypeOption = (type) => {
      return <option value={type} key={keyGen.key()}>{type}</option>;
   }

   const renderRobotSelection = () => {
      return (
         <select className='manager-button' value={simState.robot.type} onChange={handleRobotChange}>  
            {RobotTypes.map((type) => renderRobotTypeOption(type))}          
         </select>   
       );
   }

   const renderNumberSelection = (num) => {
      return <option value={num} key={keyGen.key()}>{num}</option>
   }

   const renderRowSelection = () => {
      return (
         <select className='manager-button' value={simState.world.numRows} onChange={handleRowChange}>
            {[1,2,3,4,5,6].map((num) => renderNumberSelection(num))}
         </select>
      );
   }

   const renderColSelection = () => {
      return (
         <select className='manager-button' value={simState.world.numCols} onChange={handleColChange}>
            {[1,2,3,4,5,6].map((num) => renderNumberSelection(num))}
         </select>
      );
   }

   const renderStartStopButton = () => {
      if (runningSim) {
         return (
            <button onClick={stopWorld} className='manager-button'>Stop</button>
         );
      }
      return (
         <button onClick={startWorld} className='manager-button'>Start</button>
      );
   }

   const renderManagerPane = () => {
      return (
         <div className='div-pane'>
            {renderRobotSelection()}
            {renderRowSelection()}
            {renderColSelection()}
            {renderStartStopButton()}
            <button onClick={resetWorld} className='manager-button'>RESET</button>
         </div>
      );
   }

   const renderWorld = () => {
      return (
         <WorldSim robot={simState.robot} world={simState.world}/>
      );
   }

   return (
      <div className='div-manager'>
         {renderManagerPane()}
         {renderWorld()}
      </div>
   );
}

export default SimManager;
