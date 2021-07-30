import React from 'react';
import WorldSim from './WorldSim';
import {initWorld} from './World';
import { RobotTypes, CreateRobot } from './Robots';
import { UniqueKeyGenerator } from './Utilities';

class SimManager extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         world: initWorld(props.numRows, props.numCols),
         robotType: RobotTypes[0],
         robot: CreateRobot(RobotTypes[0]),
         numRows: props.numRows,
         numCols: props.numCols,
         runningSim: true,
         keyGen: new UniqueKeyGenerator()
      };

      this.updateProperties(props.numRows, props.numCols);
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

   resetWorld = () => {
      this.setState({world: initWorld(this.state.numRows, this.state.numCols)});
   }

   handleRobotChange = (event) => {
      this.setState({robotType: event.target.value, robot: CreateRobot(event.target.value)});
   }

   handleRowChange = (event) => {
      this.setState({numRows: event.target.value});
   }

   handleColChange = (event) => {
      this.setState({numCols: event.target.value});
   }

   stopWorld = () => {
      this.setState({runningSim: false});
   }

   startWorld = () => {
      this.setState({runningSim: true});
   }

   renderRobotTypeOption(type) {
      return <option value={type} key={this.state.keyGen.key()}>{type}</option>;
   }

   renderRobotSelection() {
      return (
         <select className='manager-button' value={this.state.robotType} onChange={this.handleRobotChange}>  
            {RobotTypes.map((type) => this.renderRobotTypeOption(type))}          
         </select>   
       );
   }

   renderNumberSelection(num) {
      return <option value={num} key={this.state.keyGen.key()}>{num}</option>
   }

   renderRowSelection() {
      return (
         <select className='manager-button' value={this.state.numRows} onChange={this.handleRowChange}>
            {[1,2,3,4,5,6].map((num) => this.renderNumberSelection(num))}
         </select>
      );
   }

   renderColSelection() {
      return (
         <select className='manager-button' value={this.state.numCols} onChange={this.handleColChange}>
            {[1,2,3,4,5,6].map((num) => this.renderNumberSelection(num))}
         </select>
      );
   }


   renderStartStopButton() {
      if (this.state.runningSim) {
         return (
            <button onClick={this.stopWorld} className='manager-button'>Stop</button>
         );
      }
      return (
         <button onClick={this.startWorld} className='manager-button'>Start</button>
      );
   }

   renderManagerPane() {
      return (
         <div className='div-pane'>
            {this.renderRobotSelection()}
            {this.renderRowSelection()}
            {this.renderColSelection()}
            {this.renderStartStopButton()}
            <button onClick={this.resetWorld} className='manager-button'>RESET</button>
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
         <div className='div-manager'>
            {this.renderManagerPane()}
            {this.renderWorld()}
         </div>
      );
   }
}

export default SimManager;
