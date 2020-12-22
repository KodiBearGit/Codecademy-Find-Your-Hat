const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const currentCharacter = '+';
let gameOver = false;

class Field {
  constructor(field) {
    this.field = field;
  }
  print() {
    for (let i = 0; i < this.field.length; i++){
    console.log(this.field[i].join(''));
    }
  }
  //auto-generate a field based on height and width requested for the game..I made it somewhat random to have a hole appear for now 20%. Start Position is Unknown and not assgined here.  Instead I'm assigning under play game with a strategy to move the hat if it is at the same position as the start point.
  static generateGameField(height, width, holeChance) {
    //just populate the whole thing then change for exceptions
    //20% chance of a hole
    let gameArray = [];
    for (let i = 0; i < height; i++) {
      gameArray[i] = [];
      for (let j = 0; j < width; j++) {
        if (Math.floor(Math.random()* 100 + 1) <= holeChance) {
          gameArray[i][j] = hole;
        }
        else {
          gameArray[i][j] = fieldCharacter;
        }
        //console.log(gameArray[i][j]);
      }
    }
    return gameArray;
  }

  //function repsonds to a non-out of bounds move
  checkMoveResult(top, left) {
    //evaluates a move to hat "^" position
    if (this.field[top][left] === hat) {
      console.log("you found your hat! YOU WIN!");
      gameOver = true;
    } 
    //evaluates a move to hole "O" position
    else if (this.field[top][left] === hole) {
      console.log("you fell down the hole. YOU LOST!");
      gameOver = true;
    }
    //changes curent position to '+'
    else if (this.field[top][left] === fieldCharacter || this.field[top][left] === pathCharacter) {
      this.field[top][left] = currentCharacter;
      gameOver = false;
    }
  }
  //function changes previous position to '*'
  moveASpace(top, left) {
    this.field[top][left] = pathCharacter;
  }

  pickAWinner(top, left) {
    //Pick a winnerSpot MOVE THIS
    let randomColumn;
    let randomRow;
    do {
    let randomColumn = Math.floor(Math.random() * this.field[0].length);
    let randomRow = Math.floor(Math.random() * this.field.length);
    this.field[randomRow][randomColumn] = hat;
    } while (randomColumn === left && randomRow === top);
  }

  playAGame(top, left) {
    //is the start position of top, left even valid?
    if (top >= this.field.length) {
      return console.log(`You have entered a value that exceed the current game table height of: ${this.field.length}`);
    } 
    else if (left >this.field[0].length) {
      return console.log(`You have entered values that exceed the current game table width of: ${this.field[0].length}`);
    } 
    else if (top < 0 || left < 0) {
      return console.log("the lowest starting position for column or row is zero (0)");
    }
    //sets winning point;
    this.pickAWinner(top, left);
    //sets start point
    this.field[top][left] = currentCharacter;
    //loop  unknown number of iterations keeps running until gameOver = True.
    do {
      this.print();
      let move =  prompt('Which Way? u, d, l, or r? ');
      //user moves up "u"
      if (move === 'u') {
        if (top === 0) {
          console.log("Out of Bounds, YOU LOSE!");
          gameOver = true;
        }
        else {
          this.moveASpace(top, left)
          top -= 1;
          this.checkMoveResult(top, left);
        }
      }
      //user moves down "d"
      else if (move === 'd') {
        console.log(this.field.length); 
        if (top + 1 >= this.field.length) {
          console.log("Out of Bounds, YOU LOSE!");
          gameOver = true;
        }
        else {
          this.moveASpace(top, left)
          top += 1;
          console.log(top);
          this.checkMoveResult(top, left);
        }
      } 
      //user moves left "l"
      else if (move === 'l') {
        if (left === 0) {
          console.log("Out of Bounds, YOU LOSE!");
          gameOver = true;
        }
        else {
          this.moveASpace(top, left)
          left -= 1;
          this.checkMoveResult(top, left);
        }
      }
      //user moves right "r"
      else if (move === 'r') {
        if (left === this.field[0].length - 1) {
          console.log("Out of Bounds, YOU LOSE!");
          gameOver = true;
        }
        else {
          this.moveASpace(top, left)
          left += 1;
          this.checkMoveResult(top, left);
        }
      }
      //user presses invalid key
      else {
        console.log("not a valid key");
        gameOver = false
      }
    }  while (gameOver === false);
  }
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
const myField = new Field(Field.generateGameField(10, 10, 10));

//works with fields that are in scope of the current game table could add code to check if these values are within [] ranges.  
myField.playAGame(1,4);



