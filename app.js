// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Guess button event listener
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Confirm the validation
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}!!`, 'red');
  }

  // Check if it's a winning number
  if(guess === winningNum){
    // Game Over - Won
    gameOver(true, `Hurray!!! ${winningNum} is correct!! You won!`,);

  }else {
    // Try remaining
    guessesLeft -= 1;

    // Check if any gueeses left
    if(guessesLeft === 0){
      // Game Over - Lost
      gameOver(false, `Ooops!! Game Over!! The correct number is ${winningNum}!`);

    }else {
      // Change border color
    guessInput.style.borderColor = 'red';

    // Clear Input
    guessInput.value = '';

    // Game Continue - Answer is wrong
    setMessage(`${guess} is not correct, ${guessesLeft} guesses left!`, 'red');

    }
  }
});

// Game Over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable the input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set message color
  message.style.color = color;

  // Display the won message
  setMessage(msg);

  // Play again??
  guessBtn.value = 'Play again?';
  // Set class
  guessBtn.className += 'play-again';
}

// Get random winning number
function getRandomNum(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}

