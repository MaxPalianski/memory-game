import { sound } from './utils/audio.js';
import { state, resetState } from './state.js';
import { GAME_CONFIG } from './config.js';
import { createHeader } from './components/header.js';
import { createStats } from './components/stats.js';
import { createBoard } from './components/board.js';
import { createModal } from './components/modal.js';
import { getLeaderboard, saveResult } from './utils/storage.js';
import { el } from './utils/dom.js';

let statsComponent;
let boardComponent;
let modalComponent;

function handleCardClick(cardId) {
    if (state.isLocked) return;

    const card = state.cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    if (state.flippedCards.some((c) => c.id === cardId)) return;

    card.isFlipped = true;
    sound.playFlip();

    state.flippedCards.push(card);
    boardComponent.update(state.cards);

    if (state.flippedCards.length < 2) return;

    state.isLocked = true;
    state.moves += 1;

    statsComponent.updateMoves(state.moves);
    

    const [firstCard, secondCard] = state.flippedCards;

    if (firstCard.value === secondCard.value) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        state.matchedPairs += 1;
        statsComponent.updatePairs(state.matchedPairs);

        sound.playMatch();

        state.flippedCards = [];
        state.isLocked = false;
        boardComponent.update(state.cards);

        if (state.matchedPairs === GAME_CONFIG.TOTAL_PAIRS) {
            setTimeout(() => {
                saveResult(state.moves);
                showVictoryModal();
            }, 300);
        }
    } else {
        sound.playMismatch();


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

function showVictoryModal() {
    const content = el('div', {},
        el('p', { style: 'text-align: center; margin-bottom: 16px;' },
            `Congratulations! You completed the game in ${state.moves} moves!`
        ),
        el('div', { className: 'modal-actions' },
            el('button', {
                className: 'btn btn-new-game',
                type: 'button',
                onClick: () => {
                    modalComponent.hide();
                    startNewGame();
                },
            }, 'Play again')
        )
    );

    modalComponent.show('🎉 You win!', content);
}

function handleShowLeaderboard() {
    const leaderboard = getLeaderboard();

    let body;
    if (leaderboard.length === 0) {
        body = el('p', { style: 'text-align: center;' }, 'No records yet. Be the first!');
    } else {
        const items = leaderboard.map((entry, index) =>
            el('li', { className: 'leaderboard-item' },
                el('span', {}, `#${index + 1} — ${entry.moves} moves`),
                el('span', { style: 'color: var(--text-muted);' }, entry.date)
            )
        );
        body = el('ul', { className: 'leaderboard-list' }, ...items);
    }
    
    modalComponent.show('🏆 Leaderboard', body);
}

function startNewGame() {
    if (state.timerId) {
        clearTimeout(state.timerId);
    }
    resetState();
    statsComponent.updateMoves(state.moves);
    statsComponent.updatePairs(state.matchedPairs);
    boardComponent.update(state.cards);
}

function initApp() {
    resetState();
    modalComponent = createModal();

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
initApp();