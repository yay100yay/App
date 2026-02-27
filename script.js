const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("reset");
const cells = [...document.querySelectorAll(".cell")];

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

function setStatus(message) {
  statusElement.textContent = message;
}

function lockBoard() {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

function checkWinner(player) {
  return winningLines.some((line) => line.every((index) => board[index] === player));
}

function handleMove(event) {
  const index = Number(event.target.dataset.index);

  if (gameOver || board[index]) {
    return;
  }

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.disabled = true;

  if (checkWinner(currentPlayer)) {
    setStatus(`Player ${currentPlayer} wins!`);
    gameOver = true;
    lockBoard();
    return;
  }

  if (board.every((cell) => cell !== "")) {
    setStatus("It's a draw!");
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  setStatus(`Player ${currentPlayer}'s turn`);
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
  });

  setStatus("Player X's turn");
}

boardElement.addEventListener("click", (event) => {
  if (!event.target.classList.contains("cell")) {
    return;
  }

  handleMove(event);
});

resetButton.addEventListener("click", resetGame);
