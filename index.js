import express from "express";

import { cors } from "./utils/cors.js";

import blackjackRoute from "./routes/Blackjack.js";
import dealerRoute from './routes/Dealer.js';

const app = express();

const PORT = 8080;

app.use(cors, express.json());

app.use("/blackjack", blackjackRoute);
app.use("/dealer", dealerRoute)

app.use("/", (req, res, next) => {
  next();
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
