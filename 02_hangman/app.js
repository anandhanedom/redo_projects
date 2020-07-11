const wordsDiv = document.getElementById('word');
const wrongLettersDiv = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

//Human parts
const figureParts = document.querySelectorAll('.figure-part');

//Word collection array
const word = ['india', 'america', 'russia', 'france', 'china'];

//Random word selection
let selectedWord = word[Math.floor(Math.random() * word.length)];

// console.log(selectedWord);

//Correct and wrong letters array
const correct = [];
const wrong = [];

//Display hidden and correct letters
function displayLetters() {
  wordsDiv.innerHTML = `${selectedWord
    .split('')
    .map(
      (letter) =>
        `<span class="letter">
             ${correct.includes(letter) ? letter : ''}
         </span>`
    )
    .join('')}`;

  const innerWord = wordsDiv.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congrats..you WON!';
    popup.style.display = 'flex';
  }
}

//Update wrong letters
function updateWrongLetters() {
  //Show wrong letters
  wrongLettersDiv.innerHTML = `${
    wrong.length > 0 ? '<p>Wrong</p>' : ''
  }${wrong.map((letter) => `<span>${letter}</span>`)}`;

  //Show parts
  figureParts.forEach((part, i) => {
    const err = wrong.length;

    if (i < err) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  //Check if lost
  if (wrong.length === figureParts.length) {
    finalMessage.innerText = 'You lost man!';
    popup.style.display = 'flex';
  }
}

//Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

//Keypress event
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    // console.log(letter);

    if (selectedWord.includes(letter)) {
      if (!correct.includes(letter)) {
        correct.push(letter);
        displayLetters();
      } else {
        showNotification();
      }
    } else {
      if (!wrong.includes(letter)) {
        wrong.push(letter);
        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});

//Restart game
playAgainBtn.addEventListener('click', () => {
  //Empty the arrays
  correct.splice(0);
  wrong.splice(0);

  selectedWord = word[Math.floor(Math.random() * word.length)];
  displayLetters();

  updateWrongLetters();

  popup.style.display = 'none';
});

displayLetters();
