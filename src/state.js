import { GAME_CONFIG, CARD_ITEMS } from './config.js';
import { shuffle } from './utils/shuffle.js';

export const state = {
    moves: 0,
    matchedPairs: 0,
    isLocked: false,
    flippedCards: [],
    cards: [],
    timerId: null,
};

export function resetState() {
    if (state.timerId) {
        clearTimeout(state.timerId);
        state.timerId = null;
    }

    state.moves = 0;
    state.matchedPairs = 0;
    state.isLocked = false;
    state.flippedCards = [];

    const selectedItems = CARD_ITEMS.slice(0, GAME_CONFIG.TOTAL_PAIRS);
    const pairedItems = [...selectedItems, ...selectedItems];
    const shuffleItems = shuffle(pairedItems);

    state.cards = shuffleItems.map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
    }));
}