let playerScore = 0;
let computerScore = 0;
let round = 0;
let gameEnded = false;
// Function to generate computer's choice
function computerPlay() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
// Function to play a single round
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        return "It's a tie!";
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        return "You win!";
    } else {
        return "You lose!";
    }
}
const playerScoreBox = document.getElementById('playerScore');
const computerScoreBox = document.getElementById('computerScore');
const scoreInfo = document.getElementById('scoreInfo');
const scoreMessage = document.getElementById('scoreMsg');
const playerSign = document.getElementById('playerSign');
const computerSign = document.getElementById('computerSign');
const rockBtn = document.getElementById('rockBtn');
const paperBtn = document.getElementById('paperBtn');
const scissorsBtn = document.getElementById('scissorsBtn');
const rpsBtn = document.getElementById("rps-buttons");
rockBtn.addEventListener('click', () => handleClick('rock'));
paperBtn.addEventListener('click', () => handleClick('paper'));
scissorsBtn.addEventListener('click', () => handleClick('scissors'));

function updateChoices(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    switch (playerSelection) {
        case 'rock':
            playerSign.textContent = '✊'
            break
        case 'paper':
            playerSign.textContent = '✋'
            break
        case 'scissors':
            playerSign.textContent = '✌'
            break
    }
    switch (computerSelection) {
        case 'rock':
            computerSign.textContent = '✊'
            break
        case 'paper':
            computerSign.textContent = '✋'
            break
        case 'scissors':
            computerSign.textContent = '✌'
            break
    }
}

function handleClick(playerSelection) {
    const computerSelection = computerPlay();
    const result = playRound(playerSelection, computerSelection);
    updateChoices(playerSelection, computerSelection);
    if (gameEnded) {
        return; // Exit the function if the game has ended
    }

    if (result === "You win!") {
        playerScore++;
    } else if (result === "You lose!") {
        computerScore++;
    }

    console.log(`Result: ${result}`);
    scoreInfo.textContent = `${result}`;
    playerScoreBox.textContent = `${playerScore}`;
    computerScoreBox.textContent = `${computerScore}`;

    if (playerScore === 5 || computerScore === 5) {
        endGame();
    }
}

function endGame() {
    let winner;
    if (playerScore > computerScore) {
        winner = "You";
    } else if (playerScore < computerScore) {
        winner = "Bot";
    } else {
        winner = "It's a tie";
    }
    scoreMessage.textContent = `Game Over! ${winner} wins!`;
    gameEnded = true;
    rpsBtn.style.opacity = "0";
    setTimeout(() => {
        rpsBtn.style.display = "none";
        // Disable the buttons after the game ends
        rockBtn.removeEventListener('click', handleClick);
        paperBtn.removeEventListener('click', handleClick);
        scissorsBtn.removeEventListener('click', handleClick);
    }, 1000);
}