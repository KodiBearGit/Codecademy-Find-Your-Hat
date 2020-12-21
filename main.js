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
    console.log(this.field).toString());
  }
}
let top = 0;
let left = 0; 

let move =  prompt('Which Way? u, d, l, or r');

if (move === 'u') {
  if (top === 0) {
    console.log("Out of Bounds");
  }
  else {
    top -= 1;
  }
}
else if (move === 'd') {
  if (top + 1 > myField.length) {
    console.log("Out of Bounds");
  }
  else {
    top += 1;
  }
} 
else if (move === 'l') {
  if (left === 0) {
    console.log("Out of Bounds");
  }
  else {
    left -= 1;
  }
}
else if (move === 'r') {
  if (left = myField[top].length) {
    console.log("Out of Bounds");
  }
  else {
    left += 1;
  }
}
else {
  console.log("not a valid key");
  move =  prompt('Make your move! u, d, l, or r');
}
//example of new Field class call.  
const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);