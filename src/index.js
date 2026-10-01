import { state, resetState } from './state.js';
import { GAME_CONFIG } from './config.js';
import { createHeader } from './components/header.js';
import { createStats } from './components/stats.js';
import { createBoard } from './components/board.js';

let statsComponent;
let boardComponent;

function handleCardClick(cardId) {
    if (state.isLocked) return;

    const card = state.cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    card.isFlipped = true;
    state.flippedCards.push(card);
    boardComponent.update(state.cards);

    if (state.flippedCards.length < 2) return;

    state.moves += 1;
    statsComponent.updateMoves(state.moves);
    state.isLocked = true;

    const [firstCard, secondCard] = state.flippedCards;

    if (firstCard.value === secondCard.value) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        state.matchedPairs += 1;
        statsComponent.updatePairs(state.matchedPairs);

        state.flippedCards = [];
        state.isLocked = false;
        boardComponent.update(state.cards);

        if (state.matchedPairs === GAME_CONFIG.TOTAL_PAIRS) {
            setTimeout(() => {
                alert(`Victory! You found all the pairs in ${state.moves} moves!`);
            }, 300);
        }
    } else {
        state.timerId = setTimeout(() => {
            firstCard.isFlipped = false;
            secondCard.isFlipped = false;
            state.flippedCards = [];
            state.isLocked = false;
            state.timerId = null;
            boardComponent.update(state.cards);
        }, GAME_CONFIG.FLIP_DELAY);
    }
}

function startNewGame() {
    resetState();
    statsComponent.updateMoves(state.moves);
    statsComponent.updatePairs(state.matchedPairs);
    boardComponent.update(state.cards);
}

function handleShowLeaderboard() {
    console.log('Open LeaderBoard');
}

function initApp() {
    resetState();
    
    const header = createHeader({
        onNewGame: startNewGame,
        onShowLeaderboard: handleShowLeaderboard,
    });

    statsComponent = createStats();
    boardComponent = createBoard({
        cards: state.cards,
        onCardClick: handleCardClick,
    });

    const main = document.createElement('main');
    main.className = 'main-container';
    main.appendChild(statsComponent.element);
    main.appendChild(boardComponent.element);

    document.body.appendChild(header);
    document.body.appendChild(main);
}

document.addEventListener('DOMContentLoaded', initApp);