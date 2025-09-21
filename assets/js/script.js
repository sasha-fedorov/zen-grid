/* jshint esversion: 6 */

import {
  generateSudoku
} from "./generator.js";

var alertAction = null;
var tileSelected = null;
var highlightedNumbers = [];

//correctly placed numbers count
var correctlyPlaced = {};

var puzzle = null;
var solution = null;
var state = null;
var mode = "medium";
var newMode = "medium";
var errors = 0;

window.onload = function () {
  onInit();
  start();
};

function onInit() {
  addListeners();
  if (localStorage.getItem("state") !== null) {
    loadState();
  } else {
    generatePuzzle();
  }
}

function addListeners() {
  addModeListeners();
  addTileResetLisener();
  addRestartLisener();
  addHelpLisener();
  addAlertLisener();
}

function addModeListeners() {
  const radios = document.querySelectorAll('input[name="mode"]');
  radios.forEach(radio => {
    radio.addEventListener("click", onNewGame);
  });
}

function addRestartLisener() {
  document.getElementById("restart").addEventListener("click", onRestart);
}

function addHelpLisener() {
  document.getElementById("help-button").addEventListener("click", onHelp);
}

function addAlertLisener() {
  document.getElementById("alert-confirm").addEventListener("click", confirmAlert);
  document.getElementById("alert-close").addEventListener("click", closeAlert);
}

function addTileResetLisener() {
  document.addEventListener("click", e => resetHighlights(e));
}

//on click restart
function onRestart() {
  showAlert("Do you want to restart this game?", restart);
}

//restarts current puzzle
function restart() {
  errors = 0;
  state = puzzle;
  start();
}

//on click help
function onHelp() {
  document.getElementById("alert-close").classList.add("hidden");
  document.getElementById("help").classList.remove("hidden");
  showAlert("", closeHelp);
}

//on confirm to hide help
function closeHelp() {
  document.getElementById("alert-close").classList.remove("hidden");
  document.getElementById("help").classList.add("hidden");
}

//on click mode
function onNewGame(event) {
  newMode = event.target.id;
  const message = "Do you want to start a new " + event.target.id + " game?";
  showAlert(message, startNewGame);
  document.getElementById(mode).checked = true;
}

//starts a new game
function startNewGame() {
  errors = 0;
  mode = newMode;
  generatePuzzle();
  start();
}

function confirmAlert() {
  if (alertAction) {
    alertAction();
  }

  closeAlert();
}

function closeAlert() {
  document.getElementById("alert").classList.add("hidden");
  alertAction = null;
}

function showAlert(message, onConfirm) {
  alertAction = onConfirm;
  document.getElementById("alert-text").innerText = message;
  document.getElementById("alert").classList.remove("hidden");
}

//graving board and inputs for game
function start() {
  tileSelected = null;
  updateValues();
  checkCorrectlyPlacedNumbers();
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

//loads saved values from local storage
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
  document.getElementById(mode).checked = true;
}

//counting each correctly placed number
function checkCorrectlyPlacedNumbers() {
  correctlyPlaced = {};
  const flatState = state.flat();
  const flatSolution = solution.flat();
  for (let i = 0; i < flatState.length; i++) {
    let e = flatState[i];
    if (flatState[i] == flatSolution[i]) {
      correctlyPlaced[e] = (correctlyPlaced[e] || 0) + 1;
    }
  }
}

//generates the puzzle
function generatePuzzle() {
  const generated = generateSudoku(mode);
  puzzle = generated.puzzle;
  solution = generated.solution;
  state = puzzle;
}

//adds number input elements
function drawInputs() {
  let numberInputs = document.getElementById("number-inputs");
  if (numberInputs.hasChildNodes()) {
    numberInputs.replaceChildren();
  }

  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div"); //Number Input Element
    number.id = i;

    if (!isAllPlaced(i)) {
      number.innerText = i;
      number.addEventListener("click", selectNumber);
    }

    number.classList.add("number-input");
    numberInputs.appendChild(number);
  }
}

//checking is all of specified number placed
function isAllPlaced(number) {
  if (correctlyPlaced[number] == 9) {
    return true;
  }

  return false;
}

//draws a board
function drawBoard() {
  let board = document.getElementById("board");
  if (board.hasChildNodes()) {
    board.replaceChildren();
  }

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = getTileId(r, c);
      tile.classList.add("tile");

      if (puzzle[r][c] == 0) {
        tile.addEventListener("click", selectTile);

        //coloring correct and incorrect inputted numbers
        if (state[r][c] != 0) {
          if (state[r][c] == solution[r][c]) {
            tile.classList.add("correct-number");
          } else {
            tile.classList.add("incorrect-number");
          }
        }
      } else {
        //adding prefilled tile style
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
  const number = parseInt(this.id);
  if (tileSelected) {
    if (highlightNumbers.length > 0) {
      removeHighlightNumbers();
    }

    //reading coords from tile id
    const coords = parseTileId(tileSelected.id);
    const r = coords[0];
    const c = coords[1];

    //quit when correct number already placed
    if (solution[r][c] == state[r][c]) {
      return;
    }

    if (solution[r][c] == number) {
      //if number placed correctly
      tileSelected.classList.add("correct-number");
      correctlyPlaced[number] = (correctlyPlaced[number] || 0) + 1;
    } else {
      //if different number placed incorrectly
      if (tileSelected.innerText != number) {
        tileSelected.classList.add("incorrect-number");
        errors += 1;
        document.getElementById("errors-counter").innerText = errors;
      }
    }

    tileSelected.innerText = number;
    state[r][c] = number;

    //checks if the puzzle is done
    if (!state.flat().includes(0)) {
      puzzleCompleteAlert();
    }

    //remove input when all of this numbers placed
    if (isAllPlaced(number)) {
      this.innerText = "";
      this.removeEventListener("click", selectNumber);
    }

    updateState();
  } else {
    highlightNumbers(number);
  }
}

function selectTile() {
  if (tileSelected) {
    if (tileSelected.id == this.id) {
      return;
    }

    removeHighlight(tileSelected.id);
  }

  tileSelected = this;
  addHighlight(this.id);
}

//called on click outside of board and number inputs 
function resetHighlights(e) {
  //checking is traget id contains digits (valid only for tiles and inputs)
  if (/\d/.test(e.target.id)) {
    return;
  }

  //removing highlited numbers and exit (no highlight by tile selection highlit to remove)
  if (tileSelected == null) {
    removeHighlightNumbers();
    return;
  }

  tileSelected.classList.remove("tile-selected");
  removeHighlight(tileSelected.id);
  tileSelected = null;
}

function addHighlight(id) {
  let elements = getRowColSectorelements(id);
  elements.forEach(e => e.classList.add("tile-highlight"));
  tileSelected.classList.add("tile-selected");
}

function removeHighlight(id) {
  let elements = getRowColSectorelements(id);
  elements.forEach(e => e.classList.remove("tile-highlight"));
  tileSelected.classList.remove("tile-selected");
}

function highlightNumbers(number) {
  removeHighlightNumbers();
  let elements = [...document.getElementById("board").children];
  highlightedNumbers = elements.filter(e => e.textContent.trim() == number);
  highlightedNumbers.forEach(e => e.classList.add("tile-highlight"));
}

function removeHighlightNumbers() {
  if (highlightNumbers.length > 0) {
    highlightedNumbers.forEach(e => e.classList.remove("tile-highlight"));
  }
}

function getRowColSectorelements(id) {
  const coords = parseTileId(id);
  return [
    ...document.querySelectorAll(`[id^="${coords[0]}-"]`),
    ...document.querySelectorAll(`[id*="-${coords[1]}-"]`),
    ...document.querySelectorAll(`[id$="-${coords[2]}"]`)
  ];
}

//returns tile id in format row-column-sector
function getTileId(row, column) {
  let sector = ((column - column % 3) / 3) + (row - row % 3) + 1;
  return `${row}-${column}-${sector}`;
}

//returns tile id in format [row, column, sector]
function parseTileId(id) {
  let coords = tileSelected.id.split("-");
  return [parseInt(coords[0]), parseInt(coords[1]), parseInt(coords[2])];
}

//dispalays alert on puzzle complition
function puzzleCompleteAlert() {
  const info = " Click on a preferred difficulty to start a new game.";

  const withErrors = [
    "Congrats! You finished the puzzle. Start a new one, or click Restart to try again without mistakes.",
    "Puzzle complete! You can pick another difficulty or restart to aim for a flawless solve.",
    "Well played! Choose a new game or restart this one to go for a perfect score."
  ];

  const easyPerfect = [
    "Great job! You solved the Easy puzzle with no mistakes. Step it up with Medium difficulty!",
    "Perfect clear! Easy mode conquered without errors. Try a Medium puzzle next.",
    "Flawless solve on Easy! Ready to take on a bigger challenge in Medium?"
  ];

  const mediumPerfect = [
    "Impressive! You finished the Medium puzzle with no mistakes. Can you handle Hard mode?",
    "Outstanding work! Medium solved flawlessly — challenge yourself with Hard next.",
    "Perfect Medium game! No errors at all. Time to test your skills in Hard mode."
  ];

  const hardPerfect = [
    "Outstanding! You mastered Hard mode with zero mistakes!",
    "Incredible — a flawless Hard puzzle solve! You're a true Sudoku pro.",
    "Perfect game! Hard mode completed without errors. Can you keep the streak?",
  ];

  const seed = Math.floor(Math.random() * 3);
  let message = "";

  if (errors == 0) {
    switch (mode) {
      case "easy":
        message = easyPerfect[seed];
        break;
      case "medium":
        message = mediumPerfect[seed];
        break;
      case "hard":
        message = hardPerfect[seed];
        break;
    }
  } else {
    message = withErrors[seed];
  }

  window.alert(message + info);
}