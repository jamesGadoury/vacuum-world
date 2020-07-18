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
      let action = this.state.robot.nextAction(this.state.world);
      if (Actions.indexOf(action) === -1)
         console.log(`${action} is not a valid action.`);
      this.setState({
         world: updateWorld(this.state.world, action),
         robotActionStr:action,
      });
   }
 
   componentDidMount() {
      this.timerId = setInterval(
         () => this.stepSimulation(),
         1000
      );
   }

   componentDidUpdate(prevProps) {
      if (this.props.world !== prevProps.world) {
         this.setState({
            world: this.props.world
         });
      }
      if (this.props.robot !== prevProps.robot) {
         this.setState({
            robot: this.props.robot
         });
      }
   }
 
   componentWillUnmount() {
      clearInterval(this.timerId);
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