const { expect } = require("chai");
const CardDeckModel = require('../src/models/CardDeckModel.js') ;

describe('CardDeckModel', () => {
  let cardDeck;

  before(() => {
    cardDeck = new CardDeckModel();
  });

  it('Has a deck property', () => {
    expect(cardDeck).to.have.property('desk').that.is.an('array');
  });

  it('Has 52 cards in the deck', () => {
    expect(cardDeck.desk).to.have.lengthOf(52);
  });

  it('Has all the required card properties', () => {
    const card = cardDeck.desk[0];
    expect(card).to.have.all.keys('id', 'suit', 'value', 'points');
  });

  it('Shuffled deck is different from the initial deck', () => {
    const initialDeck = cardDeck.generateDeck();
    expect(cardDeck.desk).to.not.deep.equal(initialDeck);
  });
});