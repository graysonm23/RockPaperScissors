let userScore = 0;
let computerScore = 0;
let userScore_span = $("#user-score");
let computerScore_span = $("#computer-score");
let scoreBoard_div = $(".scoreboard");
let result_p = $(".result > p");
let rock_div = $("#r");
let scissors_div = $("#s");
let paper_div = $("#p");
let restart_button = $("#restart");
let playGameButton = $("#introbutton");
let introScreen = $(".intro");
let match = $(".match");
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
  return "Scissors ";
}

function win(userChoice, computerChoice) {
  userScore++;
  $(userScore_span).text(userScore);
  $(computerScore_span).text(computerScore);
  $(result_p).text(
    convertToWord(userChoice) +
      " beats " +
      convertToWord(computerChoice) +
      " You win!"
  );

  if (userScore === 10) {
    alert("You Have Won The Game!");
    $(userScore_span).text(0);
    $(computerScore_span).text(0);
    userScore = 0;
    computerScore = 0;
  }
}
function lose(userChoice, computerChoice) {
  computerScore++;
  $(computerScore_span).text(computerScore);
  $(userScore_span).text(userScore);
  $(result_p).text(
    convertToWord(userChoice) +
      " loses to " +
      convertToWord(computerChoice) +
      " You lose!"
  );

  if (computerScore === 10) {
    alert("You Have Lost The Game😢");
    $(computerScore_span).text(0);
    $(userScore_span).text(0);
    computerScore = 0;
    userScore = 0;
  }
}

function draw(userChoice, computerChoice) {
  $(computerScore_span).text(computerScore);
  $(userScore_span).text(userScore);
  $(result_p).text(
    convertToWord(userChoice) +
      " ties to " +
      convertToWord(computerChoice) +
      " It's a draw!"
  );
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
  $(rock_div).on("click", function() {
    game("r");
  });
  $(paper_div).on("click", function() {
    game("p");
  });
  $(scissors_div).on("click", function() {
    game("s");
  });
}

main();

function restartGame() {
  $(restart_button).on("click", function() {
    $(computerScore_span).text(0);
    $(userScore_span).text(0);
    computerScore = 0;
    userScore = 0;
  });
}

restartGame();

function startGame() {
  $(playGameButton).on("click", function() {
    $(introScreen).addClass("fadeOut");
    $(match).addClass("fadeIn");
    // scoreBoardfade.classList.add("fadeIn");
    // headerFade.classList.add("fadeIn");
  });
}

startGame();
