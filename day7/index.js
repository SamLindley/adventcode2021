import fetch from "node-fetch";

const testInput = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

const runProgram = async () => {
  const opts = {
    headers: {
      cookie: `session=${process.env.SESSION}`,
    },
  };
  const data = await fetch("https://adventofcode.com/2021/day/7/input", opts);
  const body = await data.text();
  const parsedData = body.split(",").map((i) => Number(i));
  let max = Math.max(...parsedData);
  let min = Math.min(...parsedData);
  let mostEfficient = { place: "dummy", fuel: 99999999999 };
  for (let index = min; index < max; index++) {
    let fuelUsed = 0;
    parsedData.forEach((num) => {
      fuelUsed += (Math.abs(index - num) * (Math.abs(index - num) + 1)) / 2;
    });
    if (fuelUsed < mostEfficient.fuel) {
      mostEfficient = { place: index, fuel: fuelUsed };
    }
  }
  console.log(mostEfficient);
};

runProgram();
