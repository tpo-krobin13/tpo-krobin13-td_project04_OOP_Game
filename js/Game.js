/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

/** @class Game represents a Phrase Hunter Game object */
class Game {
  /**
   * Creates an instance of Game.
   * @constructor
   * @author: krobinson
   *
   */
  constructor () {
    this.missed = 0;
    this.phrases = this.loadPhrases();
    this.activePhrase = null;
  }

  /**
  * Starts the game
  * It identifies a random phrase, makes the appropriate call to display the elment
  * and removes the overlay
  */
  startGame () {
    const selectedPhrase = this.getRandomPhrase();
    this.activePhrase = selectedPhrase;
    this.activePhrase.addPhraseToDisplay();
    document.getElementById('overlay').style.display = 'none';
  }

  /**
  * Randomly selects a phrase
  * @return {Phrase} returns a randomly selected phrase object.
  */
  getRandomPhrase () {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  /**
  * Checks if the supplied letter is matches any letter in the phrase
  * This will remove a life heart if not found or calls check for win and possibly ends the game
  */
  handleInteraction (key) {
    const isLetterFound = this.activePhrase.checkLetter(key);
    if (isLetterFound) {
      this.activePhrase.showMatchedLetter(key);
      if (this.checkForWin()) {
        this.gameOver();
      }
    } else {
      this.activePhrase.getSelectedButtonElement(key).classList.add('wrong');
      this.activePhrase.getSelectedButtonElement(key).disabled = true;
      this.removeLife();
      if (this.missed === 5) {
        this.gameOver();
      }
    }
  }

  /**
  * Removes a life heart and replaces it with a lostheart
  * Also swtichs background color and adds borders to increase contrast
  */
  removeLife () {
    const tryList = document.querySelectorAll('.tries img');
    tryList[this.missed].src = 'images/lostHeart.png' ;
    this.missed++;
    if (this.missed === 1) {
      document.querySelectorAll('button.key').forEach((elem) => elem.style.borderColor='#3a3f58');
      document.querySelectorAll('li.letter').forEach((elem) => elem.style.border='1px solid #3a3f58');
      document.body.style.background = '#FFFAE5';
    } else if (this.missed === 2) {
      document.body.style.background = '#FFEA9F';
    } else if (this.missed === 3) {
      document.body.style.background = '#FFDB58';
    } else if (this.missed === 4) {
      document.body.style.background = '#f8a18f';
    }
  }

  /**
  * Resets all lost heart elements with a life heart
  */
  resetLife () {
    const tryList = document.querySelectorAll('.tries img');
    for (let i = 0; i < tryList.length; i++) {
      tryList[i].setAttribute('src', 'images/liveHeart.png');
    }
  }

  /**
  * Counts the letters selected and the phrase letters to determine if the user has gotten all the letters
  * @return {boolean} returns true if the use has guessed all the letters or false if they have not guessed all the letters.
  */
  checkForWin () {
    let outcome = false;
    const phraseCharCount = this.activePhrase.phrase.replaceAll(' ', '').length;
    const displayedLetterCount = document.querySelectorAll('.letter.show').length;
    if (displayedLetterCount === phraseCharCount) {
      outcome = true;
    }
    return outcome;
  }

  /**
  * If the user has won the game loads the win overlay and locates a quote
  * If the user has lost the game loads the lose overlay and locates a quote
  * this also clears the screens and preps for the next game
  */
  gameOver () {
    const userWon = this.checkForWin();
    let postGameMessage = null;

    if (userWon) {
      postGameMessage = this.getWinMessage();
      document.getElementById('overlay').className = 'win';
    } else {
      postGameMessage = this.getlossMessage();
      document.getElementById('overlay').className = 'lose';
    }

    this.activePhrase.clearTheScreen();
    document.getElementById('overlay').style.display = '';
    document.getElementById('game-over-message').innerText = postGameMessage;
    this.resetLife();
  }

  /**
  * Returns an array of Phrase objects
  * @return {Phrase[]} returns an array of phrase objects
  */
  loadPhrases () {
    const phraseList = [];
    phraseList.push('Just win baby');
    phraseList.push('Just do it');
    phraseList.push('And still I rise');
    phraseList.push('It works on my machine');
    phraseList.push('No risk it no biscuit');
    const phraseObjs = phraseList.map(phrase => new Phrase(phrase));
    return phraseObjs;
  }

  /**
  * Returns a random win message for display on the win overlay
  * @return {string} returns quote for use on the win overlay
  */
  getWinMessage () {
    const winMessageList = [];
    winMessageList.push('You won you won!!');
    winMessageList.push('Hot dog!! You done it!!');
    winMessageList.push('When you win, say nothing. When you lose, say less.'); // les brown
    winMessageList.push('OMG you did it! Great game!'); //congratulationsto.com
    winMessageList.push('You are a true legend and inspiration to us all!'); //congratulationsto.com
    winMessageList.push('Your performance was stunning! No one deserves a relaxing day more than you do.'); //congratulationsto.com
    winMessageList.push('You are a CHAMPION! Your legend grows with this new title.'); //congratulationsto.com
    winMessageList.push('Train like an athlete, eat like a nutritionist, sleep like a baby and win like a champion!'); //congratulationsto.com
    return winMessageList[Math.floor(Math.random() * winMessageList.length)];
  }

  /**
  * Returns a random loss message for display on the loss overlay
  * @return {string} returns a quote for use on the loss overlay
  */
  getlossMessage () {
    const lossMessageList = [];
    lossMessageList.push('Keep calm, cause you just lost the game');
    lossMessageList.push('So Sorry Our Time Had To End');
    lossMessageList.push('You can’t win unless you learn how to lose.');// Karem Abdul Jabbar
    lossMessageList.push('Losing is only temporary and not all encompassing '); // john Wooden
    lossMessageList.push('If you learn from a loss you have not lost.'); // AUSTIN O'MALLEY
    lossMessageList.push('Sometimes you lose. Nothing you can do but admit it.'); // SARAH DESSEN
    lossMessageList.push('Always imitate the behavior of the winners when you lose.'); // GEORGE MEREDITH
    return lossMessageList[Math.floor(Math.random() * lossMessageList.length)];
  }
}
