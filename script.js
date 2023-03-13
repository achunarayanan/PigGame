"use strict";

// selecting the score elements
let score0El = document.querySelector("#score--0");
let score1El = document.querySelector("#score--1");
//secelecting current score element
let currentScore0El = document.querySelector("#current--0");
let currentScore1El = document.querySelector("#current--1");
//selecting roll, hold and newGame button
let rollBtn= document.querySelector(".btn--roll");
let holdBtn= document.querySelector(".btn--hold");
let newGameBtn = document.querySelector(".btn--new");
// selecting the player element
let player0El = document.querySelector(".player--0");
let player1El = document.querySelector(".player--1");
//selecting the dic image element
let diceImageEl = document.querySelector(".dice");
//setting both scores to Zero
score0El.textContent = 0;
score1El.textContent = 0;
//hiding the dice Image
diceImageEl.classList.add("hidden");

// state variables
let tottalScore,currentScore,activePlayer,playing;

// function for game resetting

const inIt = function(){
  
  activePlayer = 0;
  currentScore = 0;
  tottalScore = [0, 0];
  playing = true;

  currentScore0El.textContent =0;
  currentScore1El.textContent =0;
  score0El.textContent=0;
  score1El.textContent=0;

  diceImageEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
}

inIt();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
//Rolling the dice
rollBtn.addEventListener("click", function () {
  //Generating Random number
  if (playing) {
    let randomDiceNumber = Math.floor(Math.random() * 6) + 1;
    console.log(randomDiceNumber);

    //Displaying dice roll
    diceImageEl.classList.remove("hidden");
    diceImageEl.src = `dice-${randomDiceNumber}.png`;

    //if the dice roll is not equal to 1
    if (randomDiceNumber !== 1) {
      //1.adding dice role to current score dyamically
      currentScore += randomDiceNumber;
      // currentScore0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //if the dice roll is equal to 1 we have to switch the player.
    } else {
      //switching the players
      //1.changing the current score to 0
      switchPlayer();
    }
  }
});

 holdBtn.addEventListener("click", function () {
  if (playing) {
    //adding current score to tottal score
    tottalScore[activePlayer] += currentScore;
    //display tottal score
    document.getElementById(`score--${activePlayer}`).textContent =
      tottalScore[activePlayer];

    //if the score is >=100 then finish the game current player wins!
    if (tottalScore[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceImageEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

//resetting the game.
newGameBtn.addEventListener("click", inIt);
