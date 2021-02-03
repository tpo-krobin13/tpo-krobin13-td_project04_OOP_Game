/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game = null;

// ensure a new game is created everytime start game is clicked.
document.getElementById('btn__reset').addEventListener(('click'), event => {
  game = new Game();
  game.startGame();
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
    if (/^[0-9a-zA-Z]$/.test(key) && (!isKeyDisabled(key) )) {
      game.handleInteraction(key);
    }
  }
});

// Helper function to determine if the key is a used invalid selection
function isKeyDisabled(key) {
  const elemKeys = document.querySelectorAll('.key.wrong');
  for(let i =0; i < elemKeys.length; i++){
    if (elemKeys[i].innerText === key){
      return true
    }
  }
  return false;
}
