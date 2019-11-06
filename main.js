// Randomly generates an initial seeded grid
// Returns a 2D array which emulates the grid for the game
const initialiseGrid = (rows, cols) => {
  const grid = [];

  for(let i = 0; i<rows; i++){
    let array = [];

    for(let j = 0; j<cols; j++){
      array.push(Math.round(Math.random()));
    }

    grid.push(array);
  }

  return(grid);
}

// Runs the game rules on a grid
// Returns a new grid as a result of the rules
const runGameRules = (grid) => {
  let newGrid = grid;
  
  grid.forEach((row, rowIndex) => {
    row.forEach((elem, elemIndex) => {
      let neighbourSum = 0;

      for(let i = -1; i<=1; i++){
        for(let j = -1; j<=1; j++){
          let neighbourRow = rowIndex + i;
          let neighbourCol = elemIndex + j;

          if((neighbourRow >= 0 && neighbourRow < row.length) && (neighbourCol >= 0 && neighbourCol < grid.length)){
            neighbourSum = neighbourSum + grid[neighbourRow][neighbourCol];
          }
          
        }
      }

      if(elem === 1){
        if(neighbourSum < 2 || neighbourSum > 3){
          newGrid[rowIndex][elemIndex] = 0;
        }
      }else{
        if(neighbourSum === 3){
          newGrid[rowIndex][elemIndex] = 1;
        }
      }
    })
  });

  return newGrid;
}

// Renders the grid in the console
// Takes in the 2D array used for the game grid
const renderGrid = (grid) => {
  let outputString = "";

  grid.forEach((row) => {
    row.forEach((elem) => {
      if(elem === 1){
        outputString = outputString + '\u25A0'
      }else{
        outputString = outputString + '  '
      }
    });

    outputString = outputString + '\r\n';
  });

  
  process.stdout.write('\033c');
  console.log(outputString);
};

// Runs the main game logic
// Sets and interval to continue re-running the game rules
const mainGame = () => {
  let mainGrid = initialiseGrid(15,15);

  setInterval(() => {
    mainGrid = runGameRules(mainGrid);
    
    renderGrid(mainGrid);
  },50);
}

// Executes main game
mainGame();