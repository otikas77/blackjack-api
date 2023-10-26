import { Router } from "express";

import { dealerTurn } from "../controllers/Dealer.controller.js";

const router = Router();

router.post("/", dealerTurn);

export default router;
