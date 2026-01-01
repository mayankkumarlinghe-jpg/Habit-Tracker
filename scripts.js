// Game state
let userScore = 0;
let computerScore = 0;

// DOM elements
const choices = document.querySelectorAll('.choice');
const msgElement = document.getElementById('msg');
const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const userChoiceDisplay = document.getElementById('user-choice');     // Optional: add these in HTML
const computerChoiceDisplay = document.getElementById('comp-choice'); // for better visuals

// Possible choices
const OPTIONS = ['rock', 'paper', 'scissors'];

// Generate computer's choice
const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return OPTIONS[randomIndex];
};

// Determine winner
const determineWinner = (user, computer) => {
    if (user === computer) return 'tie';
    
    if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'paper' && computer === 'rock') ||
        (user === 'scissors' && computer === 'paper')
    ) {
        return 'user';
    }
    return 'computer';
};

// Update UI with result
const showResult = (userChoice, computerChoice, winner) => {
    // Update choice visuals (optional but recommended)
    if (userChoiceDisplay) userChoiceDisplay.textContent = formatChoice(userChoice);
    if (computerChoiceDisplay) computerChoiceDisplay.textContent = formatChoice(computerChoice);

    // Highlight chosen options
    document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
    document.getElementById(userChoice).classList.add('selected');

    // Update message and scores
    let message = '';
    let messageClass = '';

    switch (winner) {
        case 'tie':
            message = `It's a Tie! Both chose ${formatChoice(userChoice)}.`;
            messageClass = 'tie';
            break;
        case 'user':
            message = `You Win! ${formatChoice(userChoice)} beats ${formatChoice(computerChoice)}.`;
            userScore++;
            userScoreElement.textContent = userScore;
            messageClass = 'win';
            break;
        case 'computer':
            message = `Computer Wins! ${formatChoice(computerChoice)} beats ${formatChoice(userChoice)}.`;
            computerScore++;
            computerScoreElement.textContent = computerScore;
            messageClass = 'lose';
            break;
    }

    msgElement.textContent = message;
    msgElement.className = messageClass; // Allows different styling for win/tie/lose
};

// Helper to capitalize choice
const formatChoice = (choice) => {
    return choice.charAt(0).toUpperCase() + choice.slice(1);
};

// Main game function
const playGame = (userChoice) => {
    console.log("User choice:", userChoice);
    
    const computerChoice = getComputerChoice();
    console.log("Computer choice:", computerChoice);
    
    const winner = determineWinner(userChoice, computerChoice);
    showResult(userChoice, computerChoice, winner);
};

// Add click listeners to choices
choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const choiceID = choice.getAttribute('id');
        
        // Add animation feedback
        choice.classList.add('clicked');
        setTimeout(() => choice.classList.remove('clicked'), 300);
        
        playGame(choiceID);
    });
});

// Optional: Add keyboard support
document.addEventListener('keydown', (e) => {
    const keyMap = { 'r': 'rock', 'p': 'paper', 's': 'scissors' };
    const choice = keyMap[e.key.toLowerCase()];
    if (choice) {
        document.getElementById(choice)?.click();
    }
});