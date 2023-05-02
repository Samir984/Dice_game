'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

//buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let playing = true;
let score = [0, 0];
let currentscore = 0;
let activePlayer = 0;
let winnerPlayerState;

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentscore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice Functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = 'Image/dice-' + dice + '.png';

    // 3. Check for rolled 1: if true switch to next player
    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      //switch the player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // 1. add current score to active player's score
  score[activePlayer] += currentscore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentscore = 0;

  // 2. check if player's score is >= 100
  // finish the game

  if (score[activePlayer] >= 100) {
    playing = false;
    winnerPlayerState = activePlayer;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceEl.classList.add('hidden');
  } else {
    //3. switch to next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  diceEl.classList.add('hidden');
  playing = true;
  score = [0, 0];
  document
    .querySelector(`.player--${winnerPlayerState}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${winnerPlayerState}`)
    .classList.add('player--active');
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
});
