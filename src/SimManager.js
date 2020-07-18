import React from 'react';
import WorldSim from './WorldSim';
import { DumbBot, RandomBot } from './Robots';

class SimManager extends React.Component {
   componentDidMount() {
   }
 
   componentWillUnmount() {
   }

   render() {
      return <WorldSim numRows={3} numCols={6} robot={new RandomBot()}/>;
   }
}

export default SimManager;