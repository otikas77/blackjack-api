const { expect } = require("chai");
const BlackjackModel = require("../src/models/BlackjackModel.js");

describe("BlackjackModel", () => {
  const cardDeck = [
    { value: "Ace", points: [1, 11], id: "spades_ace", suit: "Spades" },
    { value: "King", points: 10, id: "spades_king", suit: "Spades" },
    { value: "Queen", points: 10, id: "spades_queen", suit: "Spades" },
    { value: "Jack", points: 10, id: "spades_jack", suit: "Spades" },
  ];

  describe("calculateHandValue", () => {
    it("Calculates the hand value correctly", () => {
      const result = BlackjackModel.calculateHandValue(cardDeck);
      expect(result).to.equal(31);
    });
  });

  describe("drawCard", () => {
    it("Sets the drawnCard property to a valid card", () => {
      const blackjackModel = new BlackjackModel(cardDeck, []);
      blackjackModel.drawCard();

      expect(blackjackModel.drawnCard)
        .to.be.an("object")
        .that.include.all.keys("value", "points", "suit", "id");
    });

    it("Removes the drawn card from the card deck", () => {
      const blackjackModel = new BlackjackModel(cardDeck, []);
      blackjackModel.drawCard();

      expect(cardDeck).to.not.include(blackjackModel.drawnCard);
    });
  });

  describe("combineDrawnCards", () => {
    it("Combines the hand and drawn card correctly", () => {
      const hand = [
        { value: "Queen", points: 10 },
        { value: "Jack", points: 10 },
      ];

      const blackjackModel = new BlackjackModel(cardDeck, hand);
      blackjackModel.drawCard();
      const result = blackjackModel.combineDrawnCards();

      expect(result).to.be.an("array").that.includes(blackjackModel.drawnCard);
    });
  });

  describe("checkIsBust", () => {
    it("Returns true if hand value is over 21", () => {
      const hand = [
        { value: "King", points: 10 },
        { value: "Queen", points: 10 },
        { value: "Jack", points: 10 },
      ];

      const blackjackModel = new BlackjackModel(cardDeck, hand);
      const result = blackjackModel.checkIsBust();

      expect(result).to.be.true;
    });

    it("Returns false if hand value is 21", () => {
      const hand = [
        { value: "Ace", points: [1, 11] },
        { value: "King", points: 10 },
      ];

      const blackjackModel = new BlackjackModel(cardDeck, hand);
      const result = blackjackModel.checkIsBust();

      expect(result).to.be.false;
    });
  });

  describe("checkIsBlackjack", () => {
    it("Returns true if hand value is 21", () => {
      const hand = [
        { value: "Ace", points: [1, 11] },
        { value: "King", points: 10 },
      ];

      const blackjackModel = new BlackjackModel(cardDeck, hand);
      const result = blackjackModel.checkIsBlackjack();

      expect(result).to.be.true;
    });

    it("Returns false if hand value is not 21", () => {
      const hand = [
        { value: "King", points: 10 },
        { value: "Queen", points: 10 },
        { value: "Jack", points: 10 },
      ];

      const blackjackModel = new BlackjackModel(cardDeck, hand);
      const result = blackjackModel.checkIsBlackjack();

      expect(result).to.be.false;
    });
  });
});
