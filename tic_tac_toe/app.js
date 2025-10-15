const boxes = document.querySelectorAll(".boxes");
const resetBtn = document.getElementById("resetBtn");
const winMessage = document.getElementById("winMessage");
const winnerText = document.getElementById("winnerText");
const newGameBtn = document.getElementById("newGameBtn");

let currentPlayer = "X";
let isGameOver = false;

const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Click event on each box
boxes.forEach((box, index) => {
  box.onclick = () => {
    if (box.textContent === "" && !isGameOver) {
      box.textContent = currentPlayer;

      if (checkWin(currentPlayer)) {
        winnerText.textContent = currentPlayer + " wins! and for some reason Abhii is Noob :3";
        showWinMessage();
        isGameOver = true;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  };
});

resetBtn.onclick = () => {
  resetBoard();
  hideWinMessage();
};

newGameBtn.onclick = () => {
  resetBoard();
  hideWinMessage();
};

function resetBoard() {
  boxes.forEach(box => {
    box.textContent = "";
    box.disabled = false;
  });
  currentPlayer = "X";
  isGameOver = false;
}

function checkWin(player) {
  return winningCombos.some(combo => {
    return combo.every(index => boxes[index].textContent === player);
  });
}

function showWinMessage() {
  winMessage.classList.remove("hidden");
  winMessage.style.display = "flex"; 
}

function hideWinMessage() {
  winMessage.classList.add("hidden");
  winMessage.style.display = "none";
}
