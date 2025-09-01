// Main function
export function generateSudoku(difficulty = "medium") {
  const solution = createEmptyBoard();
  solveSudoku(solution);
  const puzzle = generateUniquePuzzle(solution, difficulty);

  return {
    puzzle,
    solution
  };
}


// Create empty 9x9 array board
function createEmptyBoard() {
  return Array.from({
    length: 9
  }, () => Array(9).fill(0));
}


// Solution generation
function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let num of numbers) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}


// Schuffle the board
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


// Check is number can be placed in position
function isSafe(board, row, col, num) {
  //cheking row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  //cheking column
  for (let y = 0; y < 9; y++) {
    if (board[y][col] === num) return false;
  }

  //cheking sector
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }

  return true;
}


// Ckeck number of solutions
function countSolutions(board) {
  let count = 0;

  function solve(b) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (b[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(b, row, col, num)) {
              b[row][col] = num;
              solve(b);
              b[row][col] = 0;
            }
          }
          return;
        }
      }
    }
    count++;
  }

  solve(board.map(r => r.slice()));
  return count;
}


// Generate puzzle with unique solution
function generateUniquePuzzle(solution, difficulty) {
  let cellsToRemove;
  if (difficulty === "easy") cellsToRemove = 30;
  else if (difficulty === "medium") cellsToRemove = 40;
  else if (difficulty === "hard") cellsToRemove = 50;
  else cellsToRemove = 40;

  const puzzle = solution.map(r => r.slice());
  const positions = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      positions.push([r, c]);
    }
  }

  shuffle(positions);

  for (let [row, col] of positions) {
    if (cellsToRemove <= 0) break;

    const backup = puzzle[row][col];
    puzzle[row][col] = 0;

    if (countSolutions(puzzle) !== 1) {
      puzzle[row][col] = backup; //restart if not a single solution
    } else {
      cellsToRemove--;
    }
  }

  return puzzle;
}