// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());

let playerPoints = 5000;

app.post("/roll-dice", (req, res) => {
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const total = dice1 + dice2;
  res.json({ dice1, dice2, total });
});

app.post("/calculate-result", (req, res) => {
  const { betAmount, betType, total } = req.body;

  let result = { win: false, amount: playerPoints };

  if (total === 7 && betType === "lucky7") {
    result.win = true;
    result.amount = playerPoints + betAmount * 5;
  } else if (total < 7 && betType === "7down") {
    result.win = true;
    result.amount = playerPoints + betAmount * 2;
  } else if (total > 7 && betType === "7up") {
    result.win = true;
    result.amount = playerPoints + betAmount * 2;
  } else {
    result.amount = playerPoints - betAmount;
  }

  playerPoints = result.amount;
  res.json(result);
});

app.post("/get-points", (req, res) => {
  res.json({ points: playerPoints });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
