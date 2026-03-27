// Memory Matching Game Logic

const cards = [
    '🔴', '🔴',
    '🔵', '🔵',
    '🟢', '🟢',
    '🟡', '🟡',
    '🟣', '🟣',
    '🟠', '🟠',
];

let cardValues = [];
let cardIds = [];
const cardsWon = [];

const grid = document.getElementById('grid');

// Create a grid of cards
function createBoard() {
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        card.setAttribute('data-id', i);
        card.classList.add('card');
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
}

function flipCard() {
    const selected = this;
    const cardId = selected.getAttribute('data-id');

    if (cardValues.length < 2 && !selected.classList.contains('matched')) {
        cardValues.push(cards[cardId]);
        cardIds.push(cardId);
        selected.innerHTML = cards[cardId];
        selected.classList.add('flipped');

        if (cardValues.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('.card');

    const [firstCardId, secondCardId] = cardIds;
    if (cardValues[0] === cardValues[1]) {
        cards[firstCardId].classList.add('matched');
        cards[secondCardId].classList.add('matched');
        cardsWon.push(cardValues);
    } else {
        cards[firstCardId].innerHTML = '';
        cards[secondCardId].innerHTML = '';
        cards[firstCardId].classList.remove('flipped');
        cards[secondCardId].classList.remove('flipped');
    }
    cardValues = [];
    cardIds = [];

    if (cardsWon.length === cards.length / 2) {
        alert('Congratulations! You found all matches!');
        restartGame();
    }
}

function restartGame() {
    // Logic to restart the game, e.g., reshuffle cards or reset state
    cardValues = [];
    cardIds = [];
    cardsWon.length = 0;
    grid.innerHTML = '';
    createBoard();
}

// Initialize the game
createBoard();
