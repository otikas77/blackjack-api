const express = require("express");

const cors =  require("./src/utils/cors.js");

const blackjackRoute = require("./src/routes/Blackjack.js");

const dealerRoute = require('./src/routes/Dealer.js');

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
