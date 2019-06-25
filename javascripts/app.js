function Rover(grid, game, startingPosition) {
  game.rovers.push(this);
  if(!Array.isArray(grid) || grid.length != 2) throw new Error("Grid has to be an two dimensional array.")
  this.grid = grid
  this.position = startingPosition
  this.facing = "N"

  this.action = function(m) {
    switch(m.toUpperCase()) {
      case "N":
        this.facing = "N";
        break;
      case "E":
        this.facing = "E";
        break;
      case "S":
        this.facing = "S";
        break;
      case "W":
        this.facing = "W";
        break;
      case "F":
        this.moveForward(); 
        break;
      default:
        console.log(m + " is an invalid command. Command ignored.")                      
    }
  }

  this.moveForward = function() {
    
    switch(this.facing.toUpperCase()) {
      case "N":
  
        if((this.position[1] + 1) > grid[1] ) this.OutOfBounds()
        else this.position[1]++;
        break;
      case "E":
        if((this.position[0] + 1) > grid[0] ) this.OutOfBounds()
        else this.position[0]++;
        break;
      case "S":
        if((this.position[1] - 1) < 0 ) this.OutOfBounds()
        else this.position[1]--;
        break;
      case "W":
        if((this.position[0] -1) < 0 ) this.OutOfBounds()
        else this.position[0]--;
        break;
    }

    game.checkForCollision();
  }

  this.OutOfBounds = function() {
    throw new Error("Out of bounds, invalid move!");
  }

  this.tellMeWhatToDo = function(stringOfCommands) {
    for(let i = 0; i < stringOfCommands.length; i++) {
      this.action(stringOfCommands[i])
    }
  }
}



function Game() {
  this.rovers = []
  this.checkForCollision = function() {
    for(var i = 0; this.rovers.length; i++) {
      for(var j = 0; this.rovers.length; j++) {
        if((this.rovers[i].position[0] === this.rovers[j].position[0]) && 
        (this.rovers[i].position[1] === this.rovers[j].position[1]) && i !== j) {
          alert("BOEM!")
        }
      }
    }
    
  }
}
var theGame = new Game()
var aRover = new Rover([10,10], theGame, [5,5])
var anotherOver = new Rover([10, 10], theGame, [5,6])

aRover.tellMeWhatToDo("f")
//Boem!