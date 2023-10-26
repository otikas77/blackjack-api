import { getRandomNumber, botDrawCardLogic } from "../helpers/index.js";
import { expect } from "chai";

describe("getRandomNumber helper", () => {
  const N = 10;
  it("Returns a number between 1 and N", () => {
    const result = getRandomNumber(N);

    expect(result).to.be.a("number");
    expect(result).to.be.at.least(1).and.to.be.at.most(N);
  });

  it("Returns an integer", () => {
    const result = getRandomNumber(N);

    expect(result % 1).to.equal(0);
  });
});

describe("botDrawCardLogic helper", () => {
  it("Returns true if currentPoints <= 12", () => {
    const result = botDrawCardLogic(10);
    expect(result).to.be.true;
  });

  it("Returns false if currentPoints >= 20", () => {
    const result = botDrawCardLogic(21);
    expect(result).to.be.false;
  });

  it("Returns true or false if currentPoints >= 19", () => {
    const result = botDrawCardLogic(19);
    expect(result).to.be.a("boolean");
  });

  it("Returns true or false if currentPoints currentPoints > 17", () => {
    const result = botDrawCardLogic(18);
    expect(result).to.be.a("boolean");
  });

  it("Returns true or false if none of the conditions apply (default case)", () => {
    const result = botDrawCardLogic(15);
    expect(result).to.be.a("boolean");
  });
});
