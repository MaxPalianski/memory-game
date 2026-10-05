import { el } from '../utils/dom.js';
import { sound } from '../utils/audio.js';

export function createHeader({ onNewGame, onShowLeaderboard, onToggleSound, onToggleTheme }) {
    let isMuted = false;

    const soundBtn = el('button', {
        className: 'btn btn-icon',
        type: 'button',
        'aria-label': 'Toggle Sound',
        onClick: () => {
            isMuted = !isMuted;
            sound.setMuted(isMuted);

            soundBtn.textContent = isMuted ? '🔇' : '🔊';
            if (onToggleSound) {
                onToggleSound(isMuted);
            }
        },
    }, '🔊');

    const themeBtn = el('button', {
        className: 'btn btn-icon',
        type: 'button',
        'aria-label': 'Toggle Theme',
        onClick: () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeBtn.textContent = isLight ? '☀️' : '🌙';
            if (onToggleTheme) onToggleTheme(isLight);
        },
    }, '🌙');

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
        el('div', { className: 'header-container' },
            el('h1', { className: 'title' }, 'Memory Game'),
            el('div', { className: 'header-actions' },
                soundBtn,
                themeBtn,
                newGameBtn,
                leaderboardBtn
            )
        )
    );
    return header;
}