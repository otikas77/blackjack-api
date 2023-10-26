import { expect } from "chai";
import { startGame } from "../controllers/Backjack.controller.js";
import  { CardDeckModel } from '../models/CardDeckModel.js'; 

describe("startGame Controller", () => {
  it("Should return data with status 200", () => {
    const req = {};
    const res = {
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      send: function (data) {
        this.data = data;
      },
    };

    startGame(req, res);

    expect(res.statusCode).to.equal(200);
    expect(res.data).to.be.an("object");
  });
});
