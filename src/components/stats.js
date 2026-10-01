import { el } from '../utils/dom.js';
import { GAME_CONFIG } from '../config.js';

export function createStats() {
    const movesValue = el('span', { className: 'stats-value' }, '0');
    const pairsValue = el('span', { className: 'stats-value' }, `0 / ${GAME_CONFIG.TOTAL_PAIRS}`);

    const movesBlock = el('div', { className: 'stats-item' },
        el('span', { className: 'stats-label' }, 'Moves: '),
        movesValue
    );

    const pairsBlock = el('div', { className: 'stats-item' },
        el('span', { className: 'stats-label' }, 'Pairs: '),
        pairsValue
    );

    const container = el('section', { className: 'stats-container' },
        movesBlock,
        pairsBlock
    );

    return {
        element: container,
        updateMoves: (moves) => {
            movesValue.textContent = String(moves);
        },
        updatePairs: (pairs) => {
            pairsValue.textContent = `${pairs} / ${GAME_CONFIG.TOTAL_PAIRS}`;
        },
    };
}