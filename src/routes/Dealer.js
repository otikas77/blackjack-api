const { Router } = require("express");

const { dealerTurn } = require("../controllers/Dealer.controller.js");

const router = Router();

router.post("/", dealerTurn);

module.exports = router;
