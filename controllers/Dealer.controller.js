import { BlackjackBodySchema } from "../schemas/blackJack.js";
import { BlackjackModel } from "../models/BlackjackModel.js";

import { botDrawCardLogic } from "../helpers/index.js";

export const dealerTurn = (req, res, next) => {
  let body;

  try {
    body = BlackjackBodySchema.parse(req.body);
  } catch (error) {
    console.error(error);
    res.status(422).send(error);
  }

  const { cardDeck, hand } = body;

  const currentHandPoints = BlackjackModel.calculateHandValue(hand);
  let tryTakeOneMoreCard = botDrawCardLogic(currentHandPoints);

  if (tryTakeOneMoreCard) {
    do {
      const game = new BlackjackModel(cardDeck, hand);
      game.drawCard();

      const drawnCard = game.drawnCard;
      hand.push(drawnCard);

      const newHandPoints = BlackjackModel.calculateHandValue(hand);
      tryTakeOneMoreCard = botDrawCardLogic(newHandPoints);
    } while (tryTakeOneMoreCard);
  }

  res.status(200).send(hand);
};
