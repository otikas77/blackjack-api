const { Router } = require("express");

const {
  drawCard,
  startGame,
} = require("../controllers/Backjack.controller.js");

const router = Router();

router.get("/start-new-game", startGame);

router.post("/drawCard", drawCard);

module.exports = router;
