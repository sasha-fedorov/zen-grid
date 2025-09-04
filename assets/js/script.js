import {
  generateSudoku
} from "./generator.js"

var numSelected = null;
var tileSelected = null;

var puzzle = null;
var solution = null;
var state = null;

var errors = 0;

window.onload = function () {
  start();
}

function start() {
  if (localStorage.getItem("state") !== null) {
    loadState();
  } else {
    generatePuzzle();
  }

  drawBoard();
  drawInputs();
  saveGameState();
}

function saveGameState() {
  updatePuzzle();
  updateState();
}

function updateState() {
  localStorage.setItem("state", JSON.stringify(state));
  localStorage.setItem("errors", errors);
}

function updatePuzzle() {
  localStorage.setItem("puzzle", JSON.stringify(puzzle));
  localStorage.setItem("solution", JSON.stringify(solution));

}

function loadState() {
  errors = parseInt(localStorage.getItem("errors"));
  puzzle = JSON.parse(localStorage.getItem("puzzle"));
  solution = JSON.parse(localStorage.getItem("solution"));
  state = JSON.parse(localStorage.getItem("state"));
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

  document.getElementById("errors").innerText = errors;
}

//drawing a board
function drawBoard() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = getTileId(r, c);
      tile.classList.add("tile");
      if (puzzle[r][c] == 0) {
        tile.addEventListener("click", selectTile);
      } else {
        tile.classList.add("tile-prefilled");
      }

      //drawing prefilled and inputed numbers
      if (state[r][c] != 0) {
        tile.innerText = state[r][c];
      }

      //drawing horizontal sector division line
      if (r == 2 || r == 5) {
        tile.classList.add("sector-edge-horizontal");
      }

      //drawing vertical sector division line
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

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id;
      state[r][c] = parseInt(numSelected.id);
    } else {
      errors += 1;
      document.getElementById("errors").innerText = errors;
    }

    updateState();
  }
}


//returns tile id in format row-column-sector
function getTileId(row, column) {
  let sector = ((column - column % 3) / 3) + (row - row % 3) + 1;
  return `${row}-${column}-${sector}`;
}