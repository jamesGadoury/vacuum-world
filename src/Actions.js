const Actions = {
   CLEAN: 1,
   LEFT:  2,
   RIGHT: 3,
   DOWN:  4,
   UP:    5
};

Object.freeze(Actions);

function ActionString(action) {
   switch (action){
      case Actions.CLEAN :
         return "CLEAN";
      case Actions.LEFT :
         return "LEFT";
      case Actions.RIGHT :
         return "RIGHT";
      case Actions.DOWN :
         return "DOWN";
      case Actions.UP :
         return "UP";
      default:
         console.log("Invalid Action.");
   }
}

export { Actions, ActionString };