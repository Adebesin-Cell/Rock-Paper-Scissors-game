// console.log("App Started");

const gameBoard = document.querySelector(".game__board");
const scoreEL = document.querySelector(".score");
const resetBtn = document.querySelector(".action__btn");
const resultBoard = document.querySelector(".result");
const playerBoard = document.querySelector(".player__board");
const computerBoard = document.querySelector(".computer__board");
const placeHolder = document.querySelector(".placeholder");
const actionBoard = document.querySelector(".action");
const playerChoiceContainer = document.querySelector(
  ".player--choice__container"
);
const resultText = document.querySelector(".action__header");

const computerChoiceContainer = document.querySelector(
  ".computer--choice__container"
);

const time = 2.5;

let currentChoice;
let computerChoice;
let score = 0;

resultText.textContent = "";

scoreEL.textContent = score;

const computerChoices = ["paper", "scissors", "rock"];

/**
 *
 * @param {player-Choice} cur
 * @param {computer-Choice} cmp
 */

const game = function (cur, cmp) {
  let markup = `
    <button
       class="player__choice player__choice--${cur}"
       data-result="scissors"
     >
       <div class="inner__choice">
         <img
           src="./images/icon-${cur}.svg"
           alt="${cur}"
           class="game__image"
         />
       </div>
     </button>;`;

  let compMarkup = `
    <button
       class="player__choice player__choice--${cmp}"
       data-result="scissors"
     >
       <div class="inner__choice">
         <img
           src="./images/icon-${cmp}.svg"
           alt="${cmp}"
           class="game__image"
         />
       </div>
     </button>;`;

  if (cur === "paper" && cmp === "scissors") {
    resultText.textContent = "You Lose";
    score--;

    if (score < 1) score = 0;
    setTimeout(function () {
      scoreEL.textContent = score;
    }, time * 1000);
  } else if (cur === "paper" && cmp === "rock") {
    resultText.textContent = "You Win";
    score++;
    setTimeout(function () {
      scoreEL.textContent = score;
    }, time * 1000);
  } else if (cur === "paper" && cmp === "paper") {
    resultText.textContent = "Draw!";
  }

  if (cur === "scissors" && cmp === "scissors") {
    resultText.textContent = "Draw!";
  } else if (cur === "scissors" && cmp === "rock") {
    resultText.textContent = "You Win";
    score++;
    setTimeout(function () {
      scoreEL.textContent = score;
    }, time * 1000);
  } else if (cur === "scissors" && cmp === "paper") {
    resultText.textContent = "You Lose";
    score--;
    if (score < 1) score = 0;
    setTimeout(function () {
      scoreEL.textContent = score;
    }, time * 1000);
  }

  if (cur === "rock" && cmp === "rock") {
    resultText.textContent = "Draw!";
  } else if (cur === "rock" && cmp === "scissors") {
    resultText.textContent = "You Win";
    score++;
    setTimeout(function () {
      scoreEL.textContent = score;
    }, time * 1000);
  } else if (cur === "rock" && cmp === "paper") {
    resultText.textContent = "You Lose";
    score--;
    if (score < 1) score = 0;
    setTimeout(function () {
      scoreEL.textContent = score;
    }, time * 1000);
  }

  localStorage.setItem("score", JSON.stringify(score));
  playerChoiceContainer.insertAdjacentHTML("beforeend", markup);

  placeHolder.classList.remove("hide");

  setTimeout(function () {
    computerChoiceContainer.insertAdjacentHTML("beforeend", compMarkup);
    placeHolder.classList.add("hide");
    resultBoard.classList.add("result--lg");
    actionBoard.classList.remove("hidden");
  }, time * 1000);
};

const playAgain = function () {
  currentChoice =
    computerChoice =
    playerChoiceContainer.innerHTML =
    computerChoiceContainer.innerHTML =
      "";

  resultBoard.classList.add("result--hidden");
  resultBoard.classList.remove("result--lg");
  gameBoard.classList.remove("hidden");
  actionBoard.classList.add("hidden");
};

gameBoard.addEventListener("click", function (e) {
  let i = Math.trunc(Math.random() * 3);

  const btn = e.target.closest(".game__choice");

  if (!btn) return;

  currentChoice = btn.dataset.choice;

  computerChoice = computerChoices[i];

  game(currentChoice, computerChoice);
  gameBoard.classList.add("hidden");
  resultBoard.classList.remove("result--hidden");
});

window.addEventListener("load", function () {
  const data = JSON.parse(localStorage.getItem("score"));

  if (!data) return 0;

  console.log(+data);

  scoreEL.textContent = data;
});

resetBtn.addEventListener("click", playAgain);
