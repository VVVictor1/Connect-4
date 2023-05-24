let rows = 6;
let columns = 7;
let board = document.querySelector('.board');
let currentPlayer = 'red';
let playerWinner = document.getElementById('winner');
let button = document.getElementById('btn');
let Winner = false;

//create board
function createGame() {
  for (let i = 0; i < rows; ++i) {
    let row = document.createElement('div');
    row.className = 'row';
    for (let j = 0; j < columns; ++j) {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.column = j;
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
}

createGame();

function checkWin(cells, currentPlayer) {
  // Check row
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < columns - 3; ++j) {
      if (
        cells[i * columns + j].style.backgroundColor === currentPlayer &&
        cells[i * columns + j + 1].style.backgroundColor === currentPlayer &&
        cells[i * columns + j + 2].style.backgroundColor === currentPlayer &&
        cells[i * columns + j + 3].style.backgroundColor === currentPlayer
      ) {
        return true;
      }
    }
  }
  //Check column
  for (let i = 0; i < rows - 3; ++i) {
    for (let j = 0; j < columns; ++j) {
      if (
        cells[i * columns + j].style.backgroundColor === currentPlayer &&
        cells[(i + 1) * columns + j].style.backgroundColor === currentPlayer &&
        cells[(i + 2) * columns + j].style.backgroundColor === currentPlayer &&
        cells[(i + 3) * columns + j].style.backgroundColor === currentPlayer
      ) {
        return true;
      }
    }
  }
  //Check Diagonl
  for (let i = 0; i < rows - 3; ++i) {
    for (let j = 0; j < columns - 3; ++j) {
      if (
        cells[i * columns + j].style.backgroundColor === currentPlayer &&
        cells[(i + 1) * columns + j + 1].style.backgroundColor === currentPlayer &&
        cells[(i + 2) * columns + j + 2].style.backgroundColor === currentPlayer &&
        cells[(i + 3) * columns + j + 3].style.backgroundColor === currentPlayer
      ) {
        return true;
      }
    }
  }
  //Check Diagonl
  for (let i = 0; i < rows - 3; ++i) {
    for (let j = 3; j < columns; ++j) {
      if (
        cells[i * columns + j].style.backgroundColor === currentPlayer &&
        cells[(i + 1) * columns + j - 1].style.backgroundColor === currentPlayer &&
        cells[(i + 2) * columns + j - 2].style.backgroundColor === currentPlayer &&
        cells[(i + 3) * columns + j - 3].style.backgroundColor === currentPlayer
      ) {
        return true;
      }
    }
  }
  return false;
}

let cells = document.querySelectorAll('.cell');

cells.forEach((cell) => {
  cell.addEventListener('click', (event) => {
    if (Winner) {
      return;
    }
    let columnIndex = parseInt(event.target.dataset.column);

    for (let i = rows - 1; i >= 0; i--) {
      let indexCell = i * columns + columnIndex;
      if (cells[indexCell].style.backgroundColor === '') {
        cells[indexCell].style.backgroundColor = currentPlayer;

        if (checkWin(cells, currentPlayer)) {
          playerWinner.innerHTML = currentPlayer.toUpperCase() + ' Wins!';
          Winner = true;
        }
        currentPlayer = currentPlayer === 'red' ? 'black' : 'red';
        break;
      }
    }
  });
});

function resetGame() {
  cells.forEach((cell) => {
    cell.style.backgroundColor = '';
  });
  hasWinner = false;
  playerWinner.innerHTML = '';
}

