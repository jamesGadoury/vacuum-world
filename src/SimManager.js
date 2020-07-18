import React from 'react';
import WorldSim from './WorldSim';
import {initWorld} from './World';
import { DumbBot, RandomBot } from './Robots';

class SimManager extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         world: initWorld(props.numRows, props.numCols),
         robot: new RandomBot(),
         numRows: props.numRows,
         numCols: props.numCols
      };

      this.updateProperties(props.numRows, props.numCols);
      this.resetWorld = this.resetWorld.bind(this);
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
      this.setState({
         world: initWorld(this.state.numRows, this.state.numCols),
         robot: this.state.robot
      });
   }
   renderManagerPane() {
      return (
         <div class='div-pane'>
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