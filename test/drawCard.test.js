const { expect } = require("chai");

const { drawCard } = require("../src/controllers/Backjack.controller"); // Import your controller function

describe("drawCard Controller", () => {
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

  it("should handle valid input and return a response", () => {

    drawCard(req, res);

    // Assertions
    expect(res.statusCode).to.equal(200);
    expect(res.sentData).to.have.property("status");
    expect(res.sentData).to.have.property("drawnCard");
    expect(res.sentData).to.have.property("drawnCardPoints");
  });

  it("should handle invalid input and return a 422 status code", () => {
    req.body.cardDeck = "Invalid cardDeck";

    drawCard(req, res);

    expect(res.statusCode).to.equal(422);
  });
});
