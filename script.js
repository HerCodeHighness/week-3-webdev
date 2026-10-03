// Game Variables

let secretNumber;
let attempts = 0;
let maxNumber = 100;
let gameOver = false;


// Get HTML Elements

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const restartButton = document.getElementById("restartButton");
const difficulty = document.getElementById("difficulty");
const rangeText = document.getElementById("rangeText");



// Start the Game


function startGame() {

    attempts = 0;
    gameOver = false;

    // Set range according to difficulty
    if (difficulty.value === "easy") {
        maxNumber = 50;
    }
    else if (difficulty.value === "medium") {
        maxNumber = 100;
    }
    else {
        maxNumber = 200;
    }

    // Generate random number
    secretNumber = Math.floor(Math.random() * maxNumber) + 1;

    // Reset display
    attemptsDisplay.textContent = attempts;

    rangeText.textContent =
        `Guess a number between 1 and ${maxNumber}`;

    message.textContent = "Start guessing! 🤔";

    guessInput.value = "";
    guessInput.disabled = false;
    guessButton.disabled = false;

    guessInput.focus();
}



// Check the Guess


function checkGuess() {

    if (gameOver) {
        return;
    }

    const guess = Number(guessInput.value);

    // Check if input is valid
    if (!guess || guess < 1 || guess > maxNumber) {

        message.textContent =
            `⚠️ Enter a number between 1 and ${maxNumber}.`;

        return;
    }

    // Increase attempts
    attempts++;

    attemptsDisplay.textContent = attempts;


    // Check the guess
    if (guess === secretNumber) {

        message.textContent =
            `🎉 Correct! You guessed the number in ${attempts} attempts!`;

        gameOver = true;

        guessInput.disabled = true;
        guessButton.disabled = true;
    }

    else if (guess < secretNumber) {

        message.textContent =
            "📈 Too low! Try a higher number.";
    }

    else {

        message.textContent =
            "📉 Too high! Try a lower number.";
    }

    // Clear input
    guessInput.value = "";
    guessInput.focus();
}



// Restart Game


function restartGame() {
    startGame();
}



// Event Listeners


guessButton.addEventListener("click", checkGuess);

restartButton.addEventListener("click", restartGame);

difficulty.addEventListener("change", startGame);


// Allow Enter key to submit the guess

guessInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkGuess();
    }

});


// Start the game when the page loads

startGame();
