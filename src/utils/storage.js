import { GAME_CONFIG } from '../config.js';

export function getLeaderboard() {
    try {
        const data = localStorage.getItem(GAME_CONFIG.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Error', e);
        return [];
    }
}

export function saveResult(moves) {
    const leaderboard = getLeaderboard();

    const newEntry = {
        moves,
        date: new Date().toLocaleDateString('en-EN', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }),
    };

    leaderboard.push(newEntry);

    leaderboard.sort((a, b) => a.moves - b.moves);

    const trimmed = leaderboard.slice(0, GAME_CONFIG.MAX_LEADERS);

    try {
        localStorage.setItem(GAME_CONFIG.STORAGE_KEY, JSON.stringify(trimmed));
    } catch (e) {
        console.error('Error', e);
    }

    return trimmed;
}