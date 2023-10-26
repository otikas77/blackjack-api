import { getRandomNumber } from "./getRandomNumber.js";

export const botDrawCardLogic = (currentPoints) => {
  const chance = getRandomNumber(10);

  switch (true) {
    case currentPoints <= 12:
      return true;
    case currentPoints >= 20:
      return false;
    case currentPoints >= 19:
      return chance > 95;
    case currentPoints > 17:
      return chance > 75;
    default:
      return chance > 50;
  }
};
