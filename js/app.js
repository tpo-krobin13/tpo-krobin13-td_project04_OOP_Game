/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game = null;

// ensure a new game is created everytime start game is clicked.
document.getElementById('btn__reset').addEventListener(('click'), event => {
  game = new Game();
  game.startGame();
  console.log(game.activePhrase.phrase);
});

// add event listener for class key
document.getElementById('qwerty').addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    const key = event.target.innerText;
    game.handleInteraction(key);

    // reset focus to body to catch any keypresses
    document.querySelector('.main-container').focus();
  }
});

// add a keypress listener and ensure only alpha-numeric is submited
document.addEventListener('keypress', event => {
  if (event.target.tagName === 'BODY') {
    const key = event.key.toLowerCase();
    if (/^[0-9a-zA-Z]$/.test(key)) {
      game.handleInteraction(key);
    }
  }
});
