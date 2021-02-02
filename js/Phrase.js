/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

/** @class Phrase represents a Phrase Hunter phrase object */
class Phrase {
/**
 * Creates an instance of Phrase.
 *
 * @constructor
 * @author: krobinson
 * @param {string} stringPhrase The phrase for this boject.
 */

  constructor (stringPhrase) {
    this.phrase = stringPhrase.toLowerCase();
  }

  /**
  * Creates a list of li elements from the phrase
  * and adds them to the appropriate div.
  * takes no paramter and returns no value
  * Accounts for spaces with a special div
  */

  addPhraseToDisplay () {
    let phraseDisplay = this.phrase.split('').map(letter => {
      if (/\s/.test(letter)) {
        return `<li class="space">${letter}</li>
        `;
      } else {
        return `<li class="hide letter ${letter}">${letter}</li>
        `;
      }
    });
    phraseDisplay = `
          ${phraseDisplay.join('')}`;

    document.getElementById('phrase').insertAdjacentHTML('afterbegin', phraseDisplay);
  }

  /**
  * Checks to see if the supplied letter is valid and
  * applies the correct style to the keyboard for the selected letter.
  * @param {string} inputLetter representing the value selectd on the keyboard
   * @return {boolean} returns true if the letter was found false if not.
  */

  checkLetter (inputLetter) {
    const isLetterFound = this.phrase.includes(inputLetter);
    if (isLetterFound) {
      this.showMatchedLetter(inputLetter);
    } else {
      this.getSelectedButtonElement(inputLetter).classList.add('wrong');
      this.getSelectedButtonElement(inputLetter).disabled = true;
    }
    return isLetterFound;
  }

  /**
  * Applies the correct style to the display letter if the letter is matched
  * @param {string} matchedLetter representing the value selectd to display as a match
  */

  showMatchedLetter (matchedLetter) {
    const elems = document.querySelectorAll(`.${matchedLetter}`);
    elems.forEach(elem => {
      elem.classList.add('show');
      elem.classList.remove('hide');
    });

    const keyboardButton = this.getSelectedButtonElement(matchedLetter);
    keyboardButton.classList.add('chosen');
    keyboardButton.disabled = true;
  }

  /**
  * Locates the button element that corresponds with the value clicked by the user
  * @param {string} buttonLetter representing the value selectd to display as a match
   * @return {HTMLButtonElement} returns the html button element representing the selected element.
  */

  getSelectedButtonElement (buttonLetter) {
    const highlightedItems = Array.from(document.querySelectorAll('.key'));
    let clickedButton = null;
    for (let i = 0; i < highlightedItems.length; i++) {
      if (highlightedItems[i].innerHTML.trim() === buttonLetter) {
        clickedButton = highlightedItems[i];
      }
    }
    return clickedButton;
  }

  /**
  * Resets background, keyboard, phrase letters and border elements
  */

  clearTheScreen () {
    document.body.style.background = '#ffffff';
    document.querySelectorAll('button.key').forEach((elem) => elem.style.borderColor='');
    document.querySelectorAll('li.letter').forEach((elem) => elem.style.border='');

    const parentElement = document.getElementById('phrase');
    const children = Array.from(parentElement.children);
    for (let i = children.length - 1; i >= 0; i--) {
      children[i].remove();
    }

    const elems = document.querySelectorAll('.key');
    elems.forEach(elem => {
      elem.classList.remove('chosen');
      elem.classList.remove('wrong');
      elem.disabled = false;
      elem.blur();
    });
  }
}
