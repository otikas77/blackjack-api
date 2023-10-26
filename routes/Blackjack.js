import { Router } from "express";

import { drawCard, startGame } from "../controllers/Backjack.controller.js";

const router = Router();

router.get("/start-new-game", startGame);

router.post("/drawCard", drawCard);

export default router;
