export class BlackjackModel {
  drawnCard;

  constructor(cardDeck, hand) {
    this.cardDeck = cardDeck;
    this.hand = hand;
  }

  static calculateHandValue(drawnCards) {
    let value = 0;

    // Sort all "Ace" cards to end of the list;
    const sortedHand = [...drawnCards].sort(({ value }) =>
      value === "Ace" ? 1 : -1
    );

    for (const card of sortedHand) {
      if (card.value === "Ace") {
        const minAceValue = card.points[0];
        const maxAceValue = card.points[1];

        if (value + maxAceValue <= 21) {
          value += maxAceValue;
        } else {
          value += minAceValue;
        }
      } else {
        value += card.points;
      }
    }

    return value;
  }

  drawCard() {
    const drawnCard = this.cardDeck.shift();
    this.drawnCard = drawnCard;
  }

  combineDrawnCards() {
    return [...this.hand, ...(this.drawnCard ? [this.drawnCard] : [])];
  }

  checkIsBust() {
    const points = this.getPoints();
    return points > 21;
  }

  checkIsBlackjack() {
    const points = this.getPoints();
    return points === 21;
  }

  getPoints() {
    const newDrawnCards = this.combineDrawnCards();
    return this.constructor.calculateHandValue(newDrawnCards);
  }

  getStatus() {
    const isBust = this.checkIsBust();
    const isBlackjack = this.checkIsBlackjack();

    const status = {
      isFinished: false,
    }

    if(isBust || isBlackjack) {
      status.isFinished = true;
      status.reason = isBust ? "bust" : "blackjack"
    }

    return status;
  }
}
