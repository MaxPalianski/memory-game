import { el } from '../utils/dom.js';

export function createBoard({ cards, onCardClick }) {
  const board = el('div', { className: 'board' });
  let cardMap = new Map();

  function render(currentCards) {
    if (cardMap.size !== currentCards.length) {
      board.replaceChildren();
      cardMap.clear();

      currentCards.forEach((card) => {
        const front = el('div', { className: 'card-front' }, '?');
        const back = el('div', { className: 'card-back' }, card.value);
        const inner = el('div', { className: 'card-inner' }, front, back);

        const cardElement = el('div', {
          className: getCardClass(card),
          'data-id': card.id,
          onClick: () => onCardClick(card.id),
        }, inner);

        cardMap.set(card.id, cardElement);
        board.appendChild(cardElement);
      });
      return;
    }

    currentCards.forEach((card) => {
      const cardElement = cardMap.get(card.id);
      if (cardElement) {
        cardElement.className = getCardClass(card);
      }
    });
  }

  function getCardClass(card) {
    const classes = ['card'];
    if (card.isFlipped) classes.push('flipped');
    if (card.isMatched) classes.push('matched');
    return classes.join(' ');
  }

  render(cards);

  return {
    element: board,
    update: render,
  };
}