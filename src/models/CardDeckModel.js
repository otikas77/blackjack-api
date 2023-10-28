class CardDeckModel {
  suit = ["Hearts", "Diamonds", "Spades", "Clubs"];
  values = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    Jack: 10,
    Queen: 10,
    King: 10,
    Ace: [1, 11],
  };

  constructor() {
    const _desk = this.generateDeck();
    this.desk = this.shuffleDeck(_desk);
  }

  generateDeck() {
    const deck = [];

    for (const suit of this.suit) {
      for (const value in this.values) {
        const id = `${suit}_${value}`.toLowerCase();
        const points = this.values[value];

        const card = {
          id,
          suit,
          value,
          points,
        };
        deck.push(card);
      }
    }

    return deck;
  }

  shuffleDeck(desk) {
    const _desk = desk;

    for (let i = _desk.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [_desk[i], _desk[j]] = [_desk[j], _desk[i]];
    }

    return _desk;
  }
}

module.exports = CardDeckModel;
