/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

initialize();

//when clicking the ROLLDICE button.
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. display the result
    var diceDom = document.querySelector(".dice");
    diceDom.style.display = "block";
    //matching the dice img as per the number we get
    diceDom.src = "dice-" + dice + ".png";

    //   3. update the roundScore IF the rolled number was not a 1
    if (dice !== 1) {
      //update the round score as appeared on the dice
      //   roundScore = roundScore + dice
      roundScore += dice;
      //displaying the roundscore in currentscore box.
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // next player
      nextPalyer();
    }
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

    //check if player won the game
    if (scores[activePlayer] >= 20) {
      document.querySelector("#name-" + activePlayer).textContent = "winner!";
      document.querySelector(".dice").style.display = "none";
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
  document.querySelector(".dice").style.display = "none";
}

//when clicking the NEWGAME button
document.querySelector(".btn-new").addEventListener("click", initialize);

//creating initialize function in global scope to apply DRY
function initialize() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

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
