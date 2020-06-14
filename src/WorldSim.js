import React from 'react';
import {initWorld, updateWorld} from './World';
import { ActionString } from './Actions';

class WorldSim extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         world: initWorld(props.numRows, props.numCols),
         getRobotAction: props.robot,
         robotActionStr: ""
      };
      document.documentElement.style.setProperty("--numRows", props.numRows);
      document.documentElement.style.setProperty("--numCols", props.numCols);
      document.documentElement.style.setProperty("--colWidth", 100 / props.numCols + "%");
   }
 
   stepSimulation() {
      let action = this.state.getRobotAction(this.state.world);
      this.setState({
         world: updateWorld(this.state.world, action),
         robotActionStr:ActionString(action),
      });
   }
 
   componentDidMount() {
      this.timerId = setInterval(
         () => this.stepSimulation(),
         1000
      );
   }
 
   componentWillUnmount() {
      clearInterval(this.timerId);
   }
 
   renderVacuum(dirtPresent) {
      if (dirtPresent) {
         return (
         <div className='sim-cell' style={{'background-color':'SaddleBrown'}}>
            <div className='vacuum'><p className='action'>{this.state.robotActionStr}</p></div>
         </div>
         )
      }
      return (
         <div className='sim-cell' style={{'background-color':'Cornsilk'}}>
         <div className='vacuum'><p className='action'>{this.state.robotActionStr}</p></div>
         </div>
      )
   }
 
   render() {
      return (
         this.state.world.grid.map((cell) => {
            if (cell.vacuumPresent) {
               return this.renderVacuum(cell.dirtPresent);
            }
            if (cell.dirtPresent) {
               return <div className='sim-cell' style={{'background-color':'SaddleBrown'}}></div>;
            }
            return <div className='sim-cell' style={{'background-color':'Cornsilk'}}></div>
         })
      );
   }
}

export default WorldSim;