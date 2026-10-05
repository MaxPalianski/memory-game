import { el } from '../utils/dom.js'

export function createModal() {
    const closeBtn = el('button', {
        className: 'modal-close',
        type: 'button',
        onClick: hide,
    }, 'x');

    const titleEl = el('h2', { className: 'modal-title' });
    const contentEl = el('div', { className: 'modal-content' });

    const modalWindow = el('div', { className: 'modal-window' },
        closeBtn,
        titleEl,
        contentEl,
    );

    const overlay = el('div', {
        className: 'modal-overlay',
        onClick: (e) => {
            if (e.target === overlay) hide();
        },
    }, modalWindow);

    function handleKeyDown(e) {
        if (e.key === 'Escape') hide();
    }

    function show(title, bodyNode) {
        titleEl.textContent = title;
        contentEl.replaceChildren(bodyNode);
        document.body.appendChild(overlay);
        document.addEventListener('keydown', handleKeyDown);
    }

    function hide() {
        if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
        document.removeEventListener('keydown', handleKeyDown);
    }

    return { show, hide };
}