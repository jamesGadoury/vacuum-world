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
         numCols: props.numCols,
         runningSim: true
      };

      this.updateProperties(props.numRows, props.numCols);
      this.resetWorld = this.resetWorld.bind(this);
      this.handleRobotChange = this.handleRobotChange.bind(this);
      this.handleRowChange = this.handleRowChange.bind(this);
      this.handleColChange = this.handleColChange.bind(this);
      this.stopWorld = this.stopWorld.bind(this);
      this.startWorld = this.startWorld.bind(this);
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
   componentDidUpdate(prevProps, prevState) {
      if (this.state.numRows !== prevState.numRows || this.state.numCols !== prevState.numCols) {
         this.updateProperties(this.state.numRows, this.state.numCols);
         this.resetWorld();
      }
   }

   resetWorld() {
      this.setState({world: initWorld(this.state.numRows, this.state.numCols)});
   }
   handleRobotChange(event) {
      this.setState({robotType: event.target.value, robot: CreateRobot(event.target.value)});
   }
   handleRowChange(event) {
      this.setState({numRows: event.target.value});
   }
   handleColChange(event) {
      this.setState({numCols: event.target.value});
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
   renderNumberSelection(num) {
      return <option value={num}>{num}</option>
   }
   renderRowSelection() {
      return (
         <select value={this.state.numRows} onChange={this.handleRowChange}>
            {[1,2,3,4,5,6].map((num) => this.renderNumberSelection(num))}
         </select>
      );
   }
   renderColSelection() {
      return (
         <select value={this.state.numCols} onChange={this.handleColChange}>
            {[1,2,3,4,5,6].map((num) => this.renderNumberSelection(num))}
         </select>
      );
   }
   stopWorld() {
      this.setState({runningSim: false});
   }
   startWorld() {
      this.setState({runningSim: true});
   }
   renderStartStopButton() {
      if (this.state.runningSim) {
         return (
            <button onClick={this.stopWorld} class='manager-button'>Stop</button>
         );
      }
      return (
         <button onClick={this.startWorld} class='manager-button'>Start</button>
      );
   }
   renderManagerPane() {
      return (
         <div class='div-pane'>
            {this.renderRobotSelection()}
            {this.renderRowSelection()}
            {this.renderColSelection()}
            {this.renderStartStopButton()}
            <button onClick={this.resetWorld} class='manager-button'>RESET</button>
         </div>
      );
   }

   renderWorld() {
      return (
         <WorldSim robot={this.state.robot} world={this.state.world} runningSim={this.state.runningSim}/>
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