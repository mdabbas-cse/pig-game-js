'use strict';

// variable declare,,
let scores, roundScore, activePlayer;

// call init function
init();

let lastDice;

document.querySelector('.btn--roll').addEventListener('click', function () {
    // 1. Random Number
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2. display dice 
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = './image/dice-' + dice + '.png';

    // 3. Update in the round score, If the rolled number was not a 1
    if (dice === 6) {
        scores[activePlayer] += dice;
        nextPlayer();
    }
    else if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current--' + activePlayer).textContent = roundScore;

        scores[activePlayer] += dice;

        if (scores[activePlayer] >= 100) {
            winner();
        }
    }
    else {
        document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
    }
    lastDice = dice;
    // console.log(lastDice);
});

// for Hold
document.querySelector('.btn--hold').addEventListener('click', function () {
    // ADD CURRENT score in Global Score
    scores[activePlayer] += roundScore;

    // Update UI
    document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];

    // check if player win the game
    if (scores[activePlayer] >= 100) {
        // call winner function
        winner();
    } else {
        //change player
        nextPlayer();
    }
});

// for new game
document.querySelector('.btn--new').addEventListener('click', init);

// for winner
function winner() {
    // for display score
    document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];
    // for display winner
    document.getElementById('name--' + activePlayer).textContent = 'Winner!';
    // when winner anyone player then hide dice image, Roll-btn and Hold-btn
    document.querySelector(".dice").style.display = 'none';
    document.querySelector(".btn--roll").style.display = 'none';
    document.querySelector(".btn--hold").style.display = 'none';
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    document.querySelector('.player--0').classList.toggle("player--active");
    document.querySelector('.player--1').classList.toggle("player--active");

    // when dice value is 1 then hide dice image 
    document.querySelector('.dice').style.display = 'none';
}

// function for game value initialization

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    // set initial value for DOM 
    document.querySelector('.dice').style.display = 'none';

    // for player 1
    document.getElementById('score--0').textContent = '0';
    document.getElementById('current--0').textContent = '0';

    // for player 2
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    // for show dice call btn and hold btn 
    document.querySelector(".btn--roll").style.display = 'block';
    document.querySelector(".btn--hold").style.display = 'block';

    // set name for player 
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';

}