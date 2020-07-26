import React from 'react';
import {updateWorld} from './World';
import { Actions } from './Actions';

class WorldSim extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         world: props.world,
         robot: props.robot,
         robotActionStr: ""
      };
   }
 
   stepSimulation() {
      console.log("step");
      let action = this.state.robot.nextAction(this.state.world);
      if (Actions.indexOf(action) === -1)
         console.log(`${action} is not a valid action.`);
      this.setState({
         world: updateWorld(this.state.world, action),
         robotActionStr:action,
      });
   }
   timer() {
      return setInterval(
         () => this.stepSimulation(),
         1000
      );
   }
   startTimer() {
      this.timerId = this.timer();
   }
   stopTimer() {
      clearInterval(this.timerId);
   }
 
   componentDidMount() {
      console.log("mounted");
      this.startTimer();
   }

   componentDidUpdate(prevProps) {
      let updatedState = false;
      if (this.props.world !== prevProps.world) {
         console.log("world changed.");
         this.setState({
            world: this.props.world
         });
         updatedState = true;
      }
      if (this.props.robot !== prevProps.robot) {
         console.log(this.props.robot);
         this.setState({
            robot: this.props.robot
         });
         updatedState = true;
      }
      if (updatedState && this.props.runningSim) {
         console.log("timer updated.");
         this.stopTimer();
         this.startTimer();
      }
      if (this.props.runningSim !== prevProps.runningSim) {
         if (this.props.runningSim) {
            this.startTimer();
         } else {
            this.stopTimer();
         }
      }
   }
 
   componentWillUnmount() {
      this.stopTimer();
   }
 
   renderVacuum(cell) {
      if (cell.vacuumPresent) {
         return (
         <div className='vacuum'><p className='action'>{this.state.robotActionStr}</p></div>
         )
      }
      return;
   }

   renderCell(cell) {
      if (cell.dirtPresent) {
         return <div className='sim-cell' style={{'background-color':'SaddleBrown'}}>{this.renderVacuum(cell)}</div>;
      }
      return <div className='sim-cell' style={{'background-color':'Cornsilk'}}>{this.renderVacuum(cell)}</div>
   }

   renderCells() {
      return (
         this.state.world.grid.map((cell) => this.renderCell(cell))
      );
   }
 
   render() {
      return (
         <div className='div-sim'>
            {this.renderCells()}
         </div>
      );
   }
}

export default WorldSim;