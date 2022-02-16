import fetch from "node-fetch";

const testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
const testCard = [
  true,
  false,
  true,
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
];

const bingoCardFactory = (order, size) => {
  const cards = [];
  for (let index = 0; index < order; index++) {
    const tracker = [];
    for (let index = 0; index < size; index++) {
      tracker.push(false);
    }
    cards.push(tracker);
  }
  return cards;
};

const checkIfWinner = (card) => {
  let isWinner = false;
  card.forEach((entry, i) => {
    if (i % 5 === 0) {
      if (card[i] && card[i + 1] && card[i + 2] && card[i + 3] && card[i + 4]) {
        isWinner = true;
      }
    }
    if (i < 5) {
      if (
        card[i] &&
        card[i + 5] &&
        card[i + 10] &&
        card[i + 15] &&
        card[i + 20]
      ) {
        isWinner = true;
      }
    }
  });
  return isWinner;
};

const runProgram = async () => {
  const opts = {
    headers: {
      cookie: `session=${process.env.SESSION}`,
    },
  };
  const data = await fetch("https://adventofcode.com/2021/day/4/input", opts);
  const body = await data.text();
  const parsedData = body.split(/\r?\n/);

  const bingoNumbers = parsedData[0].split(",");
  const bingoCards = [];
  let bingoCardTemplate = "";
  let count = 0;
  parsedData.forEach((data, i) => {
    if (i !== 0) {
      if (data !== "") {
        bingoCardTemplate += " " + data;
      } else {
        if (bingoCardTemplate !== "") {
          bingoCards.push(bingoCardTemplate.split(" ").filter((t) => t));
          bingoCardTemplate = "";
        }
      }
    }
  });
  const bingoCardScores = bingoCardFactory(bingoCards.length, 25);
  const hasWon = [];
  let winner = null;
  let winningIndex = null;
  let winningNumber = null;
  bingoNumbers.forEach((bingoNumber) => {
    bingoCards.forEach((card, i) => {
      card.forEach((cardNumber, cardIndex) => {
        if (cardNumber === bingoNumber) {
          if (!hasWon.includes(i)) {
            bingoCardScores[i][cardIndex] = true;
          }
          if (checkIfWinner(bingoCardScores[i])) {
            if (!hasWon.includes(i)) {
              hasWon.push(i);
              winner = card;
              winningIndex = i;
              winningNumber = bingoNumber;
            }
          }
        }
      });
    });
  });
  console.log(
    bingoNumbers,
    hasWon,
    winningNumber,
    winningIndex,
    bingoCardScores[winningIndex]
  );
  let total = 0;
  bingoCardScores[winningIndex].forEach((score, i) => {
    if (!score) {
      console.log(winner[i]);
      total += parseInt(winner[i]);
    }
  });

  console.log(total * winningNumber);
};

runProgram();
