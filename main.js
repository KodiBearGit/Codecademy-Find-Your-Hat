const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
  }
  print() {
    console.log(this.field.toString());
  }
}
let top = 0;
let left = 0; 

function checkInvalidMove(top, left) {
  if (myField.field[top][left] === '*') {
    return true;
  }
  return false;
}

function checkMoveResult(top, left) {
  if (myField.field[top][left] === '^') {
    console.log("you found your hat");
    return gameOver = true;
  } 
  else if (myField.field[top][left] === 'O') {
    console.log("you fell down the hole");
    return gameOver = true;
  }
  else {
    myField.field[top][left] = '*';
    return gameOver = false;
  }
}

//example of new Field class call.  
const myField = new Field([
  ['*', '^', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
  ['░', '░', '░'],
]);

//console.log(myField.field.length);
//console.log(myField.field[0].length);
let gameOver = false;

do {
  let move =  prompt('Which Way? u, d, l, or r? ');

  if (move === 'u') {
    if (top === 0) {
      console.log("Out of Bounds");
      gameOver = true;
    }
    else {
      if (!checkInvalidMove(top-1, left)) {
        top -= 1;
        checkMoveResult(top, left);
      };
    }
  }
  else if (move === 'd') {
    if (top + 1 > myField.field.length) {
      console.log("Out of Bounds");
      gameOver = true;
    }
    else {
      if (!checkInvalidMove(top + 1, left)) {
        top += 1;
        checkMoveResult(top, left);
      };
    }
  } 
  else if (move === 'l') {
    if (left === 0) {
      console.log("Out of Bounds");
      gameOver = true;
    }
    else {
      if (!checkInvalidMove(top, left - 1)) {
        left -= 1;
        checkMoveResult(top, left);
      }
    }
  }
  else if (move === 'r') {
    if (left === myField.field[0].length) {
      console.log("Out of Bounds, you lose");
      gameOver = true;
    }
    else {
      if (!checkInvalidMove(top, left + 1)) {
        left += 1;
        checkMoveResult(top, left);
      }
    }
  }
  else {
    console.log("not a valid key");
    move =  prompt('Make your move! u, d, l, or r');
  }
}  while (gameOver === false);

