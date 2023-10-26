import { BlackjackModel } from "../models/BlackjackModel.js";
import { CardDeckModel } from "../models/CardDeckModel.js";
import { BlackjackBodySchema } from "../schemas/blackJack.js";

export const startGame = (req, res, next) => {
  const cardDeck = new CardDeckModel();

  const data = cardDeck.desk.reduce(
    (acc, item, index) => {
      if (index === 0 || index === 1) {
        acc.dealerHand.push(item);
      } else if (index === 2 || index === 3) {
        acc.userHand.push(item);
      } else {
        acc.remainingCardDeck.push(item);
      }

      return acc;
    },
    {
      dealerHand: [],
      userHand: [],
      remainingCardDeck: [],
    }
  );

  res.status(200).send(data);
};

export const drawCard = (req, res, next) => {
  let body;

  try {
    body = BlackjackBodySchema.parse(req.body);
  } catch (error) {
    console.error(error);
    res.status(422).send(error);
  }

  const { cardDeck, hand } = body;

  const game = new BlackjackModel(cardDeck, hand);
  game.drawCard();

  const status = game.getStatus();
  const drawnCardPoints = game.getPoints();
  const drawnCard = game.drawnCard;

  res.status(200).send({
    status,
    drawnCard,
    drawnCardPoints,
  });
};
