const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const currentCharacter = '+';

class Field {
  constructor(field) {
    this.field = field;
  }
  print() {
    for (let i = 0; i < this.field.length; i++){
    console.log(this.field[i].join(''));
    }
  }
}

//function repsonds to a non-out of bounds move
function checkMoveResult(top, left) {
  //evaluates a move to hat "^" position
  if (myField.field[top][left] === hat) {
    console.log("you found your hat!");
    return gameOver = true;
  } 
  //evaluates a move to hole "O" position
  else if (myField.field[top][left] === hole) {
    console.log("you fell down the hole");
    return gameOver = true;
  }
  //changes curent position to '+'
  else if (myField.field[top][left] === fieldCharacter || myField.field[top][left] === pathCharacter) {
    myField.field[top][left] = currentCharacter;
    return gameOver = false;
  }
}

//function changes previous position to '*'
function moveASpace(top, left) {
  myField.field[top][left] = pathCharacter;
}

//sets starting postion of the game
let top = 0;
let left = 0; 

//auto-generate a field based on height and width requested for the game..I made it somewhat random to have a hole appear. 
function generateGameField(myClass, height, width) {
  //just populate the whole thing then change for exceptions
  //20% chance of a hole
  let holeChance = 20
  for (let i = 0; i < height; i++) {
    myClass.field[i] = [];
    for (let j = 0; j < width; j++) {
      if (Math.floor(Math.random()* 100 + 1) <= holeChance) {
        myClass.field[i][j] = hole;
      }
      else {
        myClass.field[i][j] = fieldCharacter;
      }
      //console.log(myClass.field[i][j]);
    }
  }
  //Pick a winnerSpot
  let randomColumn;
  let randomRow;

  do {
    randomColumn = Math.floor(Math.random() * height);
    randomRow = Math.floor(Math.random() * width);
    myField.field[randomRow][randomColumn] = hat;
    //console.log(`row: ${randomRow} column: ${randomColumn}`);
  } while (randomColumn === left && randomRow === top);
}

//example of new Field class call.  
/* const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
  ['░', '░', '░'],
]);
*/

//call generateGameField which creates a new Field Instances and set game dimensions.
const myField = new Field([]);
generateGameField(myField, 10, 10);

//onsole.log(myField.field[randomRow][randomColumn]);
//set initial position to  '+'
myField.field[top][left] = currentCharacter;
let gameOver = false;

//loop  unknown number of iterations keeps running until gameOver = True.
do {
  myField.print();
  let move =  prompt('Which Way? u, d, l, or r? ');
  //user moves up "u"
  if (move === 'u') {
    if (top === 0) {
      console.log("Out of Bounds");
      gameOver = true;
    }
    else {
      moveASpace(top, left)
      top -= 1;
      checkMoveResult(top, left);
    }
  }
  //user moves down "d"
  else if (move === 'd') {
    if (top + 1 > myField.field.length) {
      console.log("Out of Bounds");
      gameOver = true;
    }
    else {
      moveASpace(top, left)
      top += 1;
      checkMoveResult(top, left);
    }
  } 
  //user moves left "l"
  else if (move === 'l') {
    if (left === 0) {
      console.log("Out of Bounds");
      gameOver = true;
    }
    else {
      moveASpace(top, left)
      left -= 1;
      checkMoveResult(top, left);
    }
  }
  //user moves right "r"
  else if (move === 'r') {
    if (left === myField.field[0].length) {
      console.log("Out of Bounds, you lose");
      gameOver = true;
    }
    else {
      moveASpace(top, left)
      left += 1;
      checkMoveResult(top, left);
    }
  }
  //user presses invalid key
  else {
    console.log("not a valid key");
    gameOver === false
  }
}  while (gameOver === false);
