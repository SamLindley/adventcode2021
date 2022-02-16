import fetch from "node-fetch";

const testInput = [3, 4, 3, 1, 2];

const runProgram = async () => {
  const opts = {
    headers: {
      cookie: `session=${process.env.SESSION}`,
    },
  };
  const data = await fetch("https://adventofcode.com/2021/day/6/input", opts);
  const body = await data.text();
  console.log(body);
  let fishes = body
    .trim()
    .split(",")
    .reduce((acc, n) => ({ ...acc, [n]: (acc[n] || 0) + 1 }), {});

  for (const i in [...Array(256)]) {
    const nBirths = fishes["0"] || 0;
    fishes = Object.entries(fishes).reduce((acc, [k, v]) => {
      //console.log(nBirths);
      const newKey = k === "0" ? "6" : Number(k) - 1;
      const newValue = k === "7" ? v + nBirths : v;
      return { ...acc, [newKey]: newValue };
    }, {});
    console.log(fishes[8]);
    fishes[8] = nBirths;

    console.log(fishes);
    console.log(Object.values(fishes).reduce((sum, n) => sum + n, 0));
  }
};

runProgram();
