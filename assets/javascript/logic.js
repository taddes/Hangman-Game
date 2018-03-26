//GLOBAL VARIABLES
//=============================================================================================

//Arrays and variables to hold game data
var wordOptions = [
  "spock",
  "kirk",
  "mccoy",
  "scotty",
  "uhura",
  "sulu",
  "chekov"
];
var selectedWord = "";
var lettersInWord = [];
var numberOfBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

//Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 5;

//FUNCTIONS (Called when needed)
//=============================================================================================
function startGame() {
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  lettersInWord = selectedWord.split("");
  numberOfBlanks = lettersInWord.length;

  //Reset
  guessesLeft = 5;
  wrongLetters = [];
  blanksAndSuccesses = [];

  //Populate words with corresponding number of blanks
  for (var i = 0; i < numberOfBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  //DISPLAY TO HTML
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(
    " "
  );
  document.getElementById("numGuesses").innerHTML = guessesLeft;
  document.getElementById("lossCounter").innerHTML = lossCount;
  //Testing & Debugging
  console.log("SELECTED WORD: " + selectedWord);
  console.log("LETTERS IN WORD: " + lettersInWord);
  console.log("NUMBER OF BLANKS: " + numberOfBlanks);
  console.log("BLANK SPACES PRINTED: " + blanksAndSuccesses);
} //END startGame Function

function checkLetters(letter) {
  //check if letter exists
  var isLetterInWord = false;

  for (var i = 0; i < numberOfBlanks; i++) {
    if (selectedWord[i] === letter) {
      isLetterInWord = true;
    }
  }

  if(isLetterInWord) {

  //check where in word letter exists, then populate blanksAndSuccesses array.
  for (var j = 0; j < numberOfBlanks; j++) {
    if (selectedWord[j] === letter) {
      blanksAndSuccesses[j] = letter;
    } 
  }
  // Logging for testing.
  console.log(blanksAndSuccesses);
}
  else {
      wrongLetters.push(letter);
      guessesLeft--;
    }
  }
function roundComplete() {
  console.log(
    "Win Count: " +
      winCount +
      "Loss Count: " +
      lossCount +
      "Guesses Left: " +
      guessesLeft
  );

  //update th HTML to reflect the most recent count stats
  document.getElementById("numGuesses").innerHTML = guessesLeft;
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

  //check if user won
  if (lettersInWord.toString() === blanksAndSuccesses.toString()) {
    winCount++;
    alert("You Win!");

    //update the win counter in HTML
    document.getElementById("winCounter").innerHTML = winCount;

    //Reset Game
    startGame();

    //check if user lost
  } else if (guessesLeft === 0) {
    lossCount++;
    alert("You Lost!");

    //update the loss counter in HTML
    document.getElementById("lossCounter").innerHTML = lossCount;

    //Reset Game
    startGame();
  }
}

//MAIN PROCESS
//=============================================================================================

//Initiate the Game and Restart
startGame();

//Register keyboard input
document.onkeyup = function(event) {
  //convert input to lowercase letters
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  //Runs function to check correctness
  checkLetters(letterGuessed);
  console.log(letterGuessed);
  //Runs conde after round is complete
  roundComplete();

  
};