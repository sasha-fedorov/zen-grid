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
  getPuzzle();
  drawBoard();
  drawInputs();
}

//fethcing the puzzle
function getPuzzle() {
  //there will be puzzle fetch
  puzzle = [
    ["6", "0", "0", "0", "3", "0", "0", "0", "0"],
    ["0", "0", "3", "0", "0", "2", "0", "0", "0"],
    ["9", "0", "1", "0", "0", "0", "3", "5", "6"],
    ["0", "0", "0", "9", "4", "0", "0", "1", "0"],
    ["0", "0", "0", "0", "0", "5", "0", "0", "3"],
    ["0", "7", "6", "2", "0", "3", "0", "0", "0"],
    ["7", "0", "0", "4", "0", "0", "0", "0", "5"],
    ["5", "1", "0", "0", "0", "7", "4", "0", "0"],
    ["4", "0", "0", "5", "2", "0", "8", "6", "0"]
  ];

  solution = [
    ["6", "5", "7", "1", "3", "9", "2", "4", "8"],
    ["8", "4", "3", "6", "5", "2", "9", "7", "1"],
    ["9", "2", "1", "8", "7", "4", "3", "5", "6"],
    ["3", "8", "5", "9", "4", "6", "7", "1", "2"],
    ["2", "9", "4", "7", "1", "5", "6", "8", "3"],
    ["1", "7", "6", "2", "8", "3", "5", "9", "4"],
    ["7", "6", "2", "4", "9", "8", "1", "3", "5"],
    ["5", "1", "8", "3", "6", "7", "4", "2", "9"],
    ["4", "3", "9", "5", "2", "1", "8", "6", "7"]
  ];
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