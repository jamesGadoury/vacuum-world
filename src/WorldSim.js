import React from 'react';
import { UniqueKeyGenerator } from './Utilities';

function WorldSim(props)  {
   let keyGen = new UniqueKeyGenerator(); // todo do i even need this thing
 
   const renderVacuum = (cell) => {
      if (cell.vacuumPresent) {
         return (
         <div className='vacuum'><p className='action'>{props.robotActionStr}</p></div>
         )
      }
      return;
   }

   const renderCell = (cell) => {
      if (cell.dirtPresent) {
         return <div className='sim-cell' style={{'backgroundColor':'SaddleBrown'}} key={keyGen.key()}>{renderVacuum(cell)}</div>;
      }
      return <div className='sim-cell' style={{'backgroundColor':'Cornsilk'}} key={keyGen.key()}>{renderVacuum(cell)}</div>
   }

   const renderCells = () => {
      return (
         props.world.grid.map((cell) => renderCell(cell))
      );
   }
 
   return (
      <div className='div-sim'>
         {renderCells()}
      </div>
   );
}

export default WorldSim;
