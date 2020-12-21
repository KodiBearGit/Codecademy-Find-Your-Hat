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

//example of new Field class call.  
const myField = new Field([
  ['*', '░', 'O'],
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
      top -= 1;
    }
  }
  else if (move === 'd') {
    if (top + 1 > myField.field.length) {
      console.log("Out of Bounds");
      gameOver = true;
    }
    else {
      top += 1;
    }
  } 
  else if (move === 'l') {
    if (left === 0) {
      console.log("Out of Bounds");
      gameOver = true;
    }
    else {
      left -= 1;
    }
  }
  else if (move === 'r') {
    console.log(myField.field[0].length);
    if (left === myField.field[0].length) {
      console.log("Out of Bounds, you lose");
      gameOver = true;
    }
    else {
      left += 1;
      console.log(left);
    }
  }
  else {
    console.log("not a valid key");
    move =  prompt('Make your move! u, d, l, or r');
  }
}  while (gameOver === false);

