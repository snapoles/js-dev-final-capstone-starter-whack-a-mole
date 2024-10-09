const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score'); // Query selector for the score element
const timerDisplay = document.querySelector('#timer'); // Query selector for the timer element
const title = document.querySelector('#title');

let time = 0;
let timer;
let lastHole;
let points = 0;
let difficulty = "easy";

/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limit the range
 * of the number to be generated.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a difficulty parameter that can have three values: "easy",
 * "normal", or "hard". It returns the corresponding delay in milliseconds.
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
   return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  } else {
    throw new Error("Invalid difficulty value");
  }
}

/**
 * Chooses a random hole from a list of holes.
 */
function chooseHole(holes) {
  const index = randomInteger(0, holes.length - 1);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

/**
 * Calls the showUp function if time > 0 and stops the game if time = 0.
 */
function gameOver() {
  if (time > 0) {
    // console.log("GAMEOVER");
    return setTimeout(() => {
      return showUp();
    },0)
    
  } else {
    return stopGame();
  }
}

/**
 * Calls the showAndHide() function with a specific delay and a hole.
 */
function showUp() {
  //console.log("SHOWUP");
  const delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

/**
 * Shows and hides the mole in a given hole after a delay.
 */
function showAndHide(hole, delay) {
  toggleVisibility(hole); // Show the mole
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole); // Hide the mole
    gameOver(); // Check if the game continues or stops
  }, delay);
  return timeoutID;
}


/**
 * Adds or removes the 'show' class to a given hole.
 */
function toggleVisibility(hole) {
  hole.classList.toggle('show');
  return hole;
}

/**
 * Increments the score and updates the scoreboard.
 */
function updateScore() {
  points += 1;
  score.textContent = points;
  return points;
}

/**
 * Clears the score and updates the scoreboard.
 */
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
 * Updates the timer display and stops the game when time runs out.
 */
function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  } else {
    return stopGame();
  }
  return time;
}

/**
 * Starts the timer.
 */
function startTimer() {
  timerDisplay.textContent = time; // Display the initial time
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
 * Event handler for clicking on a mole.
 */
function whack() {
  // setEventListeners();  /* DO I KEEP HERE? */
  updateScore();
  // Optionally, play a hit sound here if you have one
  // playAudio(audioHit);
  return points;
}

/**
 * Adds click event listeners to all moles.
 */
function setEventListeners() {
  moles.forEach((mole) => {
    mole.addEventListener('click', whack);
  });
}

/**
 * Sets the duration of the game.
 */
function setDuration(duration) {
  time = duration;
  timerDisplay.textContent = time; // Update timer display
  return time;
}

/**
 * Stops the game by clearing the timer and hiding any visible moles.
 */
function stopGame() {
  stopAudio(song); 
  clearInterval(timer);
  holes.forEach((hole) => {
    hole.classList.remove('show'); // Hide any visible moles
  });
  //play();// Optionally, stop background music here if you have any
  return 'game stopped';
}

/**
 * Starts the game when the start button is clicked.
 */
function startGame() {
 // console.log("STARTGAME");
  setDuration(15); // Set game duration in seconds
  showUp(); // Start showing moles
  setEventListeners();
  startTimer(); // Start the countdown timer
  clearScore(); // Reset the score
  // play();// Optionally, play background music here if you have any
  return "game started";
}


// Add event listener to the start button
startButton.addEventListener('click', startGame);


// Added Music
const audioHit = new Audio('assets/hit.mp3');
const song = new Audio('assets/molesong.mp3');

function playAudio(audioObject) {
  audioObject.play();
}

function loopAudio(audioObject) {
  audioObject.loop = true;
  playAudio(audioObject);
}

function stopAudio(audioObject) {
  audioObject.pause();
}

function play(){
  playAudio(song);
} 

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
