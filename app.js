/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
// var winningScore = 100;
// var lastDice;

initialize();

//when clicking the ROLLDICE button.
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    console.log(dice1);
    var dice2 = Math.floor(Math.random() * 6) + 1;
    console.log(dice2);

    // 2. display the result
    var diceDom1 = document.querySelector(".dice1");
    var diceDom2 = document.querySelector(".dice2");
    diceDom1.style.display = "block";
    diceDom2.style.display = "block";
    //matching the dice img as per the number we get
    diceDom1.src = "dice-" + dice1 + ".png";
    diceDom2.src = "dice-" + dice2 + ".png";

    // if statement for two 6's in a row
    /*if (dice === 6 && lastDice === 6) {
      scores[activePlayer] = 0
      document.getElementById("score-" + activePlayer).textContent = 0;
      nextPalyer();
    } */
    //   3. update the roundScore IF the rolled number was not a 1
    /*else*/ if (dice1 !== 1 && dice2 !== 1) {
      //update the round score as appeared on the dice
      //   roundScore = roundScore + dice
      roundScore += dice1 + dice2;
      //displaying the roundscore in currentscore box.
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // next player
      nextPalyer();
    }
    //lastDice = dice
  }
});

//when clicking the HOLD button.
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;

    // update the ui
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    //logic for jonas text input
    var input = document.querySelector(".final-score").value;
    var winningScore;

    //undefined, 0, null and " " are coerced to false
    //Anything else is coerced to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    //check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "winner!";
      document.querySelector(".dice1").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //next palyer
      nextPalyer();
    }
  }
});

//creating nextpalyer function in global scope to apply DRY
function nextPalyer() {
  //   next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  //current box score should go to "0"
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //class active should be toggled
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //dice should not be displayed until another player starts.
  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
}

//when clicking the NEWGAME button
document.querySelector(".btn-new").addEventListener("click", initialize);

//my logic of number input
/*var numInput = document.getElementById("gameNum");
var winningScoreDisplay = document.querySelector(".playingTo p span");
numInput.addEventListener("change", function() {
  winningScoreDisplay.textContent = numInput.value;
  winningScore = Number(numInput.value);
  initialize();
}); */

//creating initialize function in global scope to apply DRY
function initialize() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player-1";
  document.getElementById("name-1").textContent = "Player-2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
