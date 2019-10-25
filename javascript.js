// Initialize Firebase
var userScoreFb;
var computerScoreFb;
const config = {
  apiKey: "AIzaSyAQn-RII-8-qJAoKSe49bUHYMXHxhpeRtU",
  authDomain: "rock-paper-scissors-gm.firebaseapp.com",
  databaseURL: "https://rock-paper-scissors-gm.firebaseio.com",
  projectId: "rock-paper-scissors-gm",
  storageBucket: "rock-paper-scissors-gm.appspot.com",
  messagingSenderId: "923218344349",
  appId: "1:923218344349:web:000674ada554b585a21774",
  measurementId: "G-H68ESMM6EQ"
};

firebase.initializeApp(config);
var database = firebase.database();
database.ref().on(
  "value",
  function(snapshot) {
    // If Firebase has a highPrice and highBidder stored, update our client-side variables
    if (
      snapshot.child("userScoreFb").exists() &&
      snapshot.child("computerScoreFb").exists()
    ) {
      // Set the variables for highBidder/highPrice equal to the stored values. high bidder = userscore / high price =computerscore
      userScoreFb = parseInt(snapshot.val().userScoreFb);
      computerScoreFb = parseInt(snapshot.val().computerScoreFb);
    }

    // If Firebase does not have highPrice and highBidder values stored, they remain the same as the
    // values we set when we initialized the variables.
    // In either case, we want to log the values to console and display them on the page.
    console.log(userScoreFb);
    console.log(computerScoreFb);
    $("#user-score").text(userScoreFb);
    $("#computer-score").text(computerScoreFb);

    // If any errors are experienced, log them to console.
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {
  // If they are connected..
  if (snap.val()) {
    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {
  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  let viewers = $("#viewers");
  $(viewers).text(snap.numChildren());
  parseInt(viewers);
  console.log(viewers.length);
  if (viewers < 2) {
    $("#introbutton").hide();
  } else {
    $("#introbutton").show();
  }
});

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
  database.ref().set({
    userScoreFb: userScore,
    computerScoreFb: computerScore
  });
  $(computerScore_span).text(computerScore);
  $(userScore_span).text(userScore);
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
  database.ref().set({
    userScoreFb: userScore,
    computerScoreFb: computerScore
  });
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
  });
}

startGame();
