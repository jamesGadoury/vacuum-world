import React from 'react';
import { UniqueKeyGenerator } from './Utilities';
import { DirtPresentInCell, RobotPresentInCell } from './World';

function WorldSim(props)  {
   let keyGen = new UniqueKeyGenerator(); // todo do i even need this thing
 
   const renderVacuum = (cell) => {
      if (RobotPresentInCell(cell)) {
         return (
         <div className='vacuum'><p className='action'>{props.robot.action}</p></div>
         )
      }
      return;
   }

   const renderCell = (cell) => {
      if (DirtPresentInCell(cell)) {
         return <div className='sim-cell' style={{'backgroundColor':'SaddleBrown'}} key={keyGen.key()}>{renderVacuum(cell)}</div>;
      }
      return <div className='sim-cell' style={{'backgroundColor':'Cornsilk'}} key={keyGen.key()}>{renderVacuum(cell)}</div>
   }

   const renderCells = () => {
      return (
         props.world.grid.map((cell) => renderCell(cell))
      );
   }

   let cssProperties = {'--numRows': props.world.numRows, '--numCols': props.world.numCols, '--colWidth': 100 / props.world.numCols + '%' };
 
   return (
      <div className='div-sim' style={cssProperties}>
         {renderCells()}
      </div>
   );
}

export default WorldSim;
