const zod = require("zod");

const CardSchema = require("./card.js");

const BlackjackBodySchema = zod.object({
  cardDeck: zod.array(CardSchema),
  hand: zod.array(CardSchema),
});

module.exports = BlackjackBodySchema;
