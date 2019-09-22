let userScore = 0;
let computerScore = 0;
let userScore_span = document.getElementById("user-score");
let computerScore_span = document.getElementById("computer-score");
let scoreBoard_div = document.querySelector(".scoreboard");
let result_p = document.querySelector(".result > p");
let rock_div = document.getElementById("r");
let scissors_div = document.getElementById("s");
let paper_div = document.getElementById("p");
let restart_button = document.getElementById("restart");
let playGameButton = document.querySelector("#introbutton");
let introScreen = document.querySelector(".intro");
let match = document.querySelector(".match");
// let scoreBoardfade = document.getElementById("scoreboard");
// let headerFade = document.getElementsByClassName("header");

function getComputerChoice() {
  let choices = ["r", "p", "s"];
  let randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}
getComputerChoice();

function convertToWord(letter) {
  if (letter === "r") return "Rock ";
  if (letter === "p") return "Paper ";
  return "Scissors";
}

function win(userChoice, computerChoice) {
  userScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML =
    convertToWord(userChoice) +
    " beats " +
    convertToWord(computerChoice) +
    " You win!";

  if (userScore === 10) {
    alert("You Have Won The Game!");
    userScore_span.innerHTML = 0;
    computerScore_span.innerHTML = 0;
    userScore = 0;
    computerScore = 0;
  }
}
function lose(userChoice, computerChoice) {
  computerScore++;
  computerScore_span.innerHTML = computerScore;
  userScore_span.innerHTML = userScore;
  result_p.innerHTML =
    convertToWord(userChoice) +
    " loses to " +
    convertToWord(computerChoice) +
    " You lose!";

  if (computerScore === 10) {
    alert("You Have Lost The Game😢");
    computerScore_span.innerHTML = 0;
    userScore_span.innerHTML = 0;
    computerScore = 0;
    userScore = 0;
  }
}

function draw(userChoice, computerChoice) {
  computerScore_span.innerHTML = computerScore;
  userScore_span.innerHTML = userScore;
  result_p.innerHTML =
    convertToWord(userChoice) +
    " ties to " +
    convertToWord(computerChoice) +
    " It's a draw!";
}

function game(userChoice) {
  let computerChoice = getComputerChoice();
  switch (userChoice + computerChoice) {
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      break;
    case "rp":
    case "ps":
    case "sr":
      lose(userChoice, computerChoice);
      break;
    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, computerChoice);
      break;
  }
}
game();

function main() {
  rock_div.addEventListener("click", function() {
    game("r");
  });
  paper_div.addEventListener("click", function() {
    game("p");
  });
  scissors_div.addEventListener("click", function() {
    game("s");
  });
}

main();

function restartGame() {
  restart_button.addEventListener("click", function() {
    computerScore_span.innerHTML = 0;
    userScore_span.innerHTML = 0;
    computerScore = 0;
    userScore = 0;
  });
}

restartGame();

function startGame() {
  playGameButton.addEventListener("click", function() {
    introScreen.classList.add("fadeOut");
    match.classList.add("fadeIn");
    // scoreBoardfade.classList.add("fadeIn");
    // headerFade.classList.add("fadeIn");
  });
}

startGame();
