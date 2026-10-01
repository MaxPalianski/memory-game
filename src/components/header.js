import { el } from '../utils/dom.js';

export function createHeader({ onNewGame, onShowLeaderboard }) {
    const newGameBtn = el('button', {
        className: 'btn btn-new-game',
        type: 'button',
        'aria-label': 'New Game',
        onClick: onNewGame,
    }, '🔄 New Game');

    const leaderboardBtn = el('button', {
        className: 'btn btn-leaderboard',
        type: 'button',
        'aria-label': 'Open LeaderBoard',
        onClick: onShowLeaderboard,
    }, '🏆 LeaderBoard');

    const header = el('header', { className: 'header' },
        el('div', {className: 'header-container' },
            el('h1', { className: 'title' }, 'Memory Game'),
            el('div', { className: 'header-actions' },
                newGameBtn,
                leaderboardBtn
            )
        )
    );
    return header;
}