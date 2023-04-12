const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const btnEl = document.querySelector("#btnEl");
const winSequence = [
  [0, 1, 2], // Row
  [3, 4, 5], // Row
  [6, 7, 8], // Row
  [0, 3, 6], // Columns
  [1, 4, 7], // Columns
  [2, 5, 8], // Columns
  [0, 4, 8], // Diagonals
  [2, 4, 6], // Diagonals
];
let playerChoice = ["", "", "", "", "", "", "", "", ""]; //stores player's choice
let currentPlayer = "X"; // variable to Hold player
let running = false; // game status

initalizeGame(); //start game

function initalizeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked)); // listening for clicks
  btnEl.addEventListener("click", restartGame); // restart button active
  statusText.textContent = `${currentPlayer}'s turn`; //diplay who's turn is it
  running = true; //game status active
}

function cellClicked() {
  // all of this will happend on every click
  const cellIndex = this.getAttribute("id");

  if (playerChoice[cellIndex] != "" || running == false) {
    return alert("Select an empty box"); //if player does not click an empty box
  }
  updateCell(this, cellIndex);
  checkWinner();

  console.log(playerChoice); // checking if current player is being store in this array
}

function updateCell(cell, index) {
  playerChoice[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  //   if ((currentPlayer = "X")) {
  //     currentPlayer = "O";
  //   } else {
  //     currentPlayer = "X";
  //   }

  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winSequence.length; i++) {
    let combinations = winSequence[i];
    let cellA = playerChoice[combinations[0]];
    let cellB = playerChoice[combinations[1]];
    let cellC = playerChoice[combinations[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue; // if true, 'continue' will skip and keep the loop runnig
    } else if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} Wins!`;
    running = false;
  } else if (playerChoice.includes("") == false) {
    statusText.textContent = `Draw`;
  } else {
    changePlayer();
  }
}

function restartGame() {
  playerChoice = ["", "", "", "", "", "", "", "", ""]; //clear all choices
  currentPlayer = "X"; // X will select first
  statusText.textContent = `${currentPlayer}'s turn`; // display message
  cells.forEach((cell) => (cell.textContent = "")); // clear all cell
  running = true; // game status is running
}
