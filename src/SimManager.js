import React from 'react';
import WorldSim from './WorldSim';
import {initWorld} from './World';
import { RobotTypes, CreateRobot } from './Robots';

class SimManager extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         world: initWorld(props.numRows, props.numCols),
         robotType: RobotTypes[0],
         robot: CreateRobot(RobotTypes[0]),
         numRows: props.numRows,
         numCols: props.numCols
      };

      this.updateProperties(props.numRows, props.numCols);
      this.resetWorld = this.resetWorld.bind(this);
      this.handleRobotChange = this.handleRobotChange.bind(this);
   }
   componentDidMount() {
   }
 
   componentWillUnmount() {
   }

   updateProperties(numRows, numCols) {
      document.documentElement.style.setProperty("--numRows", numRows);
      document.documentElement.style.setProperty("--numCols", numCols);
      document.documentElement.style.setProperty("--colWidth", 100 / numCols + "%");
   }

   resetWorld() {
      console.log("reset world called");
      this.setState({world: initWorld(this.state.numRows, this.state.numCols)});
   }
   handleRobotChange(event) {
      console.log("robot changed");
      console.log(event.target.value);
      this.setState({robotType: event.target.value, robot: CreateRobot(event.target.value)});
   }
   renderRobotTypeOption(type) {
      return <option value={type}>{type}</option>;
   }
   renderRobotSelection() {
      return (
         <select value={this.state.robotType} onChange={this.handleRobotChange}>  
         {RobotTypes.map((type) => this.renderRobotTypeOption(type))}          
         </select>   
       );
   }
   renderManagerPane() {
      return (
         <div class='div-pane'>
            {this.renderRobotSelection()}
            <button onClick={this.resetWorld} class='manager-button'>RESET</button>
         </div>
      );
   }

   renderWorld() {
      return (
         <WorldSim robot={this.state.robot} world={this.state.world}/>
      );
   }

   render() {
      return (
         <div class='div-manager'>
            {this.renderManagerPane()}
            {this.renderWorld()}
         </div>
      );
   }
}

export default SimManager;