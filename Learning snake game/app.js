const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const gameOverScreen = document.getElementById("gameOverScreen");
const playAgainBtn = document.getElementById("playAgainBtn");

let snakex = 10, snakey = 10;
let velocityx = 0, velocityy = 0;
let foodx = 15, foody = 15;
let snakeBody = [];
let score = 0;
let setIntervalId;

const changeFoodPosition = () => {
  foodx = Math.floor(Math.random() * 30) + 1;
  foody = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  clearInterval(setIntervalId);
  gameOverScreen.style.display = "block";
};

const changeDirection = (e) => {
  if ((e.key === "ArrowUp" || e.key === "w") && velocityy !== 1) {
    velocityx = 0;
    velocityy = -1;
  } else if ((e.key === "ArrowDown" || e.key === "s") && velocityy !== -1) {
    velocityx = 0;
    velocityy = 1;
  } else if ((e.key === "ArrowLeft" || e.key === "a") && velocityx !== 1) {
    velocityx = -1;
    velocityy = 0;
  } else if ((e.key === "ArrowRight" || e.key === "d") && velocityx !== -1) {
    velocityx = 1;
    velocityy = 0;
  }
};

const initGame = () => {
  snakex += velocityx;
  snakey += velocityy;

  if (snakex <= 0 || snakex > 30 || snakey <= 0 || snakey > 30) {
    return handleGameOver();
  }

  let html = `<div class="food" style="grid-area: ${foody} / ${foodx}"></div>`;

  if (snakex === foodx && snakey === foody) {
    changeFoodPosition();
    snakeBody.push([foodx, foody]);
    score++;
    scoreElement.innerText = `Score: ${score}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakex, snakey];

  for (let i = 1; i < snakeBody.length; i++) {
    if (snakeBody[i][0] === snakex && snakeBody[i][1] === snakey) {
      return handleGameOver();
    }
  }

  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
  }

  playBoard.innerHTML = html;
};

changeFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keydown", changeDirection);

playAgainBtn.addEventListener("click", () => {
  location.reload();
});
