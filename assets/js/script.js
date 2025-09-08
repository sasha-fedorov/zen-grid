import {
  generateSudoku
} from "./generator.js"

var numSelected = null;
var tileSelected = null;

var puzzle = null;
var solution = null;
var state = null;
var mode = "medium";

var errors = 0;

window.onload = function () {
  //localStorage.clear();

  onInit();
  start();
}

function onInit() {
  addLiseners();
  if (localStorage.getItem("state") !== null) {
    loadState();
  } else {
    generatePuzzle();
  }
}

function addLiseners() {
  addModeLiseners();
  addRestartLisener();
}

function addModeLiseners() {
  const radios = document.querySelectorAll('input[name="mode"]');
  radios.forEach(radio => {
    //radio.addEventListener("change", changeMode);
    radio.addEventListener("click", newGame);
  });
}

function addRestartLisener() {
  document.getElementById("restart").addEventListener("click", restart);
}

function restart() {
  if (window.confirm("Do you want to restart this game?")) {
    errors = 0;
    state = puzzle;
    start();
  }
}

//starts a new game
function newGame(event) {
  if (window.confirm("Do you want to start a new " + event.target.id + " game?")) {
    errors = 0;
    mode = event.target.id;
    generatePuzzle();
    start();
  }
}

//graving board and inputs for game
function start() {
  updateValues();
  drawBoard();
  drawInputs();
  saveGameState();
}

//saves state of the game
function saveGameState() {
  updatePuzzle();
  updateState();
}

//updates game state values
function updateState() {
  localStorage.setItem("state", JSON.stringify(state));
  localStorage.setItem("errors", errors);
}

//updates game puzzle values
function updatePuzzle() {
  localStorage.setItem("mode", mode);
  localStorage.setItem("puzzle", JSON.stringify(puzzle));
  localStorage.setItem("solution", JSON.stringify(solution));
}

//loads saved values from local storadge 
function loadState() {
  errors = parseInt(localStorage.getItem("errors"));
  puzzle = JSON.parse(localStorage.getItem("puzzle"));
  solution = JSON.parse(localStorage.getItem("solution"));
  state = JSON.parse(localStorage.getItem("state"));
  mode = localStorage.getItem("mode");
}

//updates loaded values on page
function updateValues() {
  document.getElementById("errors-counter").innerText = errors;
  let currentMode = document.getElementById(mode);
  currentMode.checked = true;
}

//generates the puzzle
function generatePuzzle() {
  const generated = generateSudoku(mode);
  puzzle = generated.puzzle;
  solution = generated.solution;
  state = puzzle;
}

//adds number input elemnts
function drawInputs() {
  let numberInputs = document.getElementById("number-inputs");
  //not draws inputs when existed
  if (numberInputs.hasChildNodes()) {
    return;
  }

  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div"); //Number Input Element
    number.id = i;
    number.innerText = i;
    number.classList.add("number-input");
    number.addEventListener("click", selectNumber)
    numberInputs.appendChild(number);
  }
}

//draws a board
function drawBoard() {
  let board = document.getElementById("board");
  if (board.hasChildNodes()) {
    board.replaceChildren()
  }

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

      board.appendChild(tile);
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
      document.getElementById("errors-counter").innerText = errors;
    }

    updateState();
  }
}

//returns tile id in format row-column-sector
function getTileId(row, column) {
  let sector = ((column - column % 3) / 3) + (row - row % 3) + 1;
  return `${row}-${column}-${sector}`;
}