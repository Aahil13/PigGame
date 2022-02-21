'use strict';

const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const diceImg = document.querySelector('.dice');

const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');

let nowPlaying, current, currentScore, playing;

function init() {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  nowPlaying = 0;
  current = 0;
  currentScore = [0, 0];
  playing = true;

  diceImg.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
}

init();

const swicthPlayer = () => {
  document.querySelector(`#current--${nowPlaying}`).textContent = 0;
  nowPlaying = nowPlaying === 0 ? 1 : 0;
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
  current = 0;
};

rollBtn.addEventListener('click', function () {
  if (playing) {
    const randomDiceRoll = Math.trunc(Math.random() * 6) + 1;
    diceImg.src = `dice-${randomDiceRoll}.png`;
    current += randomDiceRoll;
    diceImg.classList.remove('hidden');
    if (randomDiceRoll !== 1) {
      document.querySelector(`#current--${nowPlaying}`).textContent = current;
    } else {
      swicthPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    currentScore[nowPlaying] += current;
    document.querySelector(`#score--${nowPlaying}`).textContent =
      currentScore[nowPlaying];
    if (currentScore[nowPlaying] >= 100) {
      playing = false;
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${nowPlaying}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${nowPlaying}`)
        .classList.add('player--active');
    } else {
      swicthPlayer();
    }
  }
});

newBtn.addEventListener('click', init);
