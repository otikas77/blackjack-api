const chai = require("chai");
const expect = chai.expect;

const BlackjackModel = require("../src/models/BlackjackModel");
const { dealerTurn } = require("../src/controllers/Dealer.controller");

describe("dealerTurn Function", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        cardDeck: [
          { value: "Ace", points: [1, 11], id: "spades_ace", suit: "Spades" },
          { value: "King", points: 10, id: "spades_king", suit: "Spades" },
          { value: "Queen", points: 10, id: "spades_queen", suit: "Spades" },
          { value: "Jack", points: 10, id: "spades_jack", suit: "Spades" },
        ],
        hand: [
          { value: "10", points: 10, id: "spades_10", suit: "Spades" },
          { value: "9", points: 9, id: "spades_9", suit: "Spades" },
        ],
      },
    };
    res = {
      status: (statusCode) => {
        res.statusCode = statusCode;
        return res;
      },
      send: (data) => {
        res.sentData = data;
      },
    };
  });

  it("should handle a dealer turn with valid input and return a response", () => {
    dealerTurn(req, res);

    expect(res.statusCode).to.equal(200);
    expect(res.sentData).to.be.an("array");

    const card = res.sentData[0];
    expect(card).to.be.an("object");
    expect(card).to.have.property("value").that.is.a("string");
    expect(card).to.have.property("id").that.is.a("string");
    expect(card).to.have.property("suit").that.is.a("string");
    expect(card).to.have.property("points");
  });

  it("should handle a dealer turn with invalid input and return a 422 status code", () => {
    req.body.cardDeck = "Invalid cardDeck";

    dealerTurn(req, res);

    expect(res.statusCode).to.equal(422);
  });

  it("should draw additional cards while botDrawCardLogic returns true", () => {
    const initialHand = req.body.hand;

    const hand = [...initialHand];
    let drawnCard;

    dealerTurn(req, res);

    for (const card of res.sentData) {
      expect(hand.length).to.be.above(initialHand.length);
      expect(hand).to.deep.include(card);

      if (drawnCard) {
        expect(card).to.deep.equal(drawnCard);
      }

      drawnCard = card;
    }
  });

  it("should stop drawing cards when botDrawCardLogic returns false", () => {
    req.body.cardDeck = [
      { value: "Ace", points: [1, 11], id: "spades_ace", suit: "Spades" },
      { value: "2", points: 2, id: "spades_2", suit: "Spades" },
    ];

    dealerTurn(req, res);

    const initialHandLength = req.body.hand.length;

    expect(res.sentData).to.be.an("array");
    expect(res.sentData).to.have.lengthOf.at.most(12); // Assuming a reasonable limit for card draws
    expect(req.body.hand.length).to.be.at.most(initialHandLength + 11); // Maximum additional cards
  });

  it("should draw additional cards while botDrawCardLogic returns true", () => {
    const cardDeck = req.body.cardDeck;
    const initialHand = req.body.hand;
  
    const hand = [...initialHand];
  
    let drawnCards = [];
    let tryTakeOneMoreCard = botDrawCardLogic(0);
  
    while (tryTakeOneMoreCard) {
      dealerTurn(req, res);
      const card = res.sentData[0];
  
      expect(hand.length).to.be.above(initialHand.length);
      expect(hand).to.deep.include(card);
      expect(drawnCards).to.not.deep.include(card);
  
      drawnCards.push(card);
  
      tryTakeOneMoreCard = botDrawCardLogic(
        BlackjackModel.calculateHandValue(hand)
      );
    }
  });  
});
