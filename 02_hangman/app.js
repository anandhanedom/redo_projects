const wordDiv = document.getElementById('word');
const wrongLettersDiv = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

//Human parts
const figureParts = document.querySelectorAll('.figure-part');

//words array
const words = ['india', 'russia', 'china', 'america', 'france'];
let actualWord = words[Math.floor(Math.random() * words.length)];

console.log(actualWord);

//correct and wrong letters array
const correctLetters = [];
const wrongLetters = [];

//display the letters
function displayLetters() {
  wordDiv.innerHTML = `${actualWord
    .split('')
    .map(
      (letter) =>
        `<div class="letter">${
          correctLetters.includes(letter) ? letter : ' '
        }</div>`
    )
    .join('')}`;

  if (wordDiv.innerText.replace(/\n/g, '') === actualWord) {
    finalMessage.innerText = 'Rakshapettu! 😀';
    popup.style.display = 'flex';
  }
}

//display correct letters
function displayWrongLetters() {
  const wrongLettersLength = wrongLetters.length;

  wrongLettersDiv.innerHTML = `${wrongLettersLength > 0 ? `<p>Wrong</p>` : ''} 
      ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  //Show parts
  figureParts.forEach((part, i) => {
    if (i < wrongLettersLength) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  //Check if lost
  if (wrongLettersLength === figureParts.length) {
    finalMessage.innerText = `RIP! 😔`;
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

function wordInput(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const inputLetter = e.key;

    if (actualWord.includes(inputLetter)) {
      if (!correctLetters.includes(inputLetter)) {
        correctLetters.push(inputLetter);
        displayLetters();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(inputLetter)) {
        wrongLetters.push(inputLetter);
        displayWrongLetters();
      } else {
        showNotification();
      }
    }
  }
}

//Event listeners
window.addEventListener('keydown', wordInput);
playAgainBtn.addEventListener('click', () => {
  //Clear arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  //Randomise
  actualWord = words[Math.floor(Math.random() * words.length)];

  displayLetters();
  displayWrongLetters();

  //Close popup
  popup.style.display = 'none';
});

displayLetters();
