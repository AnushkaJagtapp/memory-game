// Game Setup
const gameBoard = document.getElementById('game-board');
const moveCountDisplay = document.getElementById('move-count');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restart-btn');


// Images for the game (replace these with the paths to your images)
const images = [
    'imagess/apple.jpg', 'imagess/apple.jpg',
    'imagess/banana.jpg','imagess/banana.jpg',
    'imagess/grape.jpg', 'imagess/grape.jpg',
    'imagess/kiwi.jpg', 'imagess/kiwi.jpg',
    'imagess/cherry.jpg', 'imagess/cherry.jpg',
    'imagess/strawberry.jpg', 'imagess/strawberry.jpg',
    'imagess/orange.jpg', 'imagess/orange.jpg',
    'imagess/ovacado.jpg', 'imagess/ovacado.jpg'
]

let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer;
let seconds = 0;

// Shuffle cards
function shuffleCards() {
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);
    return shuffledImages;
}

// Create the game board
function createBoard() {
    const shuffledImages = shuffleCards();

    gameBoard.innerHTML = ''; // Clear previous game board
    shuffledImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);

        // Create the image element and set the source
        const img = document.createElement('img');
        img.setAttribute('src', '');
        img.setAttribute('alt', 'Fruit');
        img.setAttribute('data-value', image);
        card.appendChild(img);

        // Add the event listener to flip the card
        card.addEventListener('click', flipCard);

        gameBoard.appendChild(card);
    });
}

// Flip card logic
function flipCard(event) {
    const card = event.target.closest('.card');
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    card.classList.add('flipped');
    const img = card.querySelector('img');
    img.setAttribute('src', img.getAttribute('data-value')); // Show the image

    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
        incrementMoves();
    }
}

// Check if two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('img');
    const img2 = card2.querySelector('img');

    if (img1.getAttribute('src') === img2.getAttribute('src')) {
        matchedPairs++;
        if (matchedPairs === images.length / 2) {
            clearInterval(timer);
            alert('Congratulations! You matched all pairs!');
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Increment move count
function incrementMoves() {
    moves++;
    moveCountDisplay.textContent = moves;
}

// Timer
function startTimer() {
    timer = setInterval(() => {
        seconds++;
        timerDisplay.textContent = seconds;
    }, 1000);
}

// Restart game
function restartGame() {
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    seconds = 0;
    moveCountDisplay.textContent = moves;
    timerDisplay.textContent = seconds;
    clearInterval(timer);
    createBoard();
    startTimer();
}

// Initial game setup
createBoard();
startTimer();

// Restart button
restartBtn.addEventListener('click', restartGame);
