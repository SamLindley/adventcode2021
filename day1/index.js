import fetch from "node-fetch";

const testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

const runProgram = async () => {
  const opts = {
    headers: {
      cookie: `session=${process.env.SESSION}`,
    },
  };
  const data = await fetch("https://adventofcode.com/2021/day/2/input", opts);
  const body = await data.text();
  const parsedData = body.split(/\r?\n/);
  let answer = 0;
  let previousData = null;
  parsedData.forEach((data, i) => {
    let currentSum = 0;
    if (i < parsedData.length - 2) {
      currentSum =
        parseInt(data) +
        parseInt(parsedData[i + 1]) +
        parseInt(parsedData[i + 2]);
      if (previousData !== null) {
        if (currentSum > previousData) {
          answer++;
        }
      }
    }
    previousData = currentSum;
  });
  console.log(answer);
};

runProgram();
