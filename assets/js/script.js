import {
  generateSudoku
} from "./generator.js"

var numSelected = null;
var tileSelected = null;
var puzzle = null;
var solution = null;

var errors = 0;
var error = "";

window.onload = function () {
  reset();
}

//reset function, called on load and reset
function reset() {
  errors = 0;
  error = "";
  generatePuzzle();
  drawBoard();
  drawInputs();
}

//generating the puzzle
function generatePuzzle() {
  const generated = generateSudoku("medium");

  puzzle = generated.puzzle;
  solution = generated.solution;
}

//adding number input elemnts
function drawInputs() {
  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div"); //Number Input Element
    number.id = i;
    number.innerText = i;
    number.classList.add("number-input");
    number.addEventListener("click", selectNumber)
    document.getElementById("number-inputs").appendChild(number);
  }
}

//drawing a board
function drawBoard() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = getTileId(r, c);
      tile.classList.add("tile");
      tile.addEventListener("click", selectTile);
      if (puzzle[r][c] != 0) {
        tile.innerText = puzzle[r][c];
        tile.classList.add("tile-prefilled");
      }

      if (r == 2 || r == 5) {
        tile.classList.add("sector-edge-horizontal");
      }

      if (c == 2 || c == 5) {
        tile.classList.add("sector-edge-vertical");
      }

      document.getElementById("board").appendChild(tile);
    }
  }
}

function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-input-selected")
  }

  numSelected = this;
  this.classList.add("number-input-selected")
}

function selectTile() {
  if (numSelected) {
    if (this.innerText != "") {
      return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id;
    } else {
      errors += 1;
      document.getElementById("errors").innerText = errors;
    }
  }
}


//returns tile id in format row-column-sector
function getTileId(row, column) {
  let sector = 0;
  switch (true) {
    case row < 3:
      if (column < 3) {
        sector = 1;
        break;
      }
      if (column < 6) {
        sector = 2;
        break;
      }
      sector = 3;
      break;

    case row < 6:
      if (column < 3) {
        sector = 4;
        break;
      }
      if (column < 6) {
        sector = 5;
        break;
      }
      sector = 6;
      break;

    case row >= 6:
      if (column < 3) {
        sector = 7;
        break;
      }
      if (column < 6) {
        sector = 8;
        break;
      }
      sector = 9;
      break;
  }

  return `${row}-${column}-${sector}`;
}