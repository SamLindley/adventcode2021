import fetch from "node-fetch";

const testInput = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

const runProgram = async () => {
  const opts = {
    headers: {
      cookie: `session=${process.env.SESSION}`,
    },
  };
  const data = await fetch("https://adventofcode.com/2021/day/3/input", opts);
  const body = await data.text();
  const parsedData = body.split(/\r?\n/);
  const findThing = (array, position, least) => {
    if (array.length === 1) {
      return array[0];
    }
    const ones = [];
    const zeroes = [];
    array.forEach((item) => {
      if (item.split("")[position] === "1") {
        ones.push(item);
      } else zeroes.push(item);
    });
    // console.log(zeroes.length);
    // console.log(ones.length);
    if (ones.length >= zeroes.length) {
      if (least) {
        return findThing(zeroes, ++position, least);
      }
      return findThing(ones, ++position);
    } else {
      if (least) {
        return findThing(ones, ++position, least);
      }
      return findThing(zeroes, ++position);
    }
  };
  const first = findThing(parsedData, 0);
  const second = findThing(parsedData, 0, true);
  console.log(parseInt(first, 2) * parseInt(second, 2));
  //   let gamma = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //   parsedData.forEach((data) => {
  //     console.log(data);
  //     const digitArray = data.split("");
  //     digitArray.forEach((digit, i) => {
  //       if (digit === "1") {
  //         gamma[i]++;
  //       } else {
  //         gamma[i]--;
  //       }
  //     });
  //   });
  //   const binary = gamma.map((digit) => {
  //     if (digit > 0) return 1;
  //     return 0;
  //   });
  //   const epsilon = binary.map((digit) => {
  //     if (digit === 1) return 0;
  //     return 1;
  //   });
  //   const binaryString = binary.join("");
  //   console.log(parseInt(binaryString, 2));
  //   const epsilonString = epsilon.join("");
  //   console.log(parseInt(epsilonString, 2));
  //   console.log(parseInt(binaryString, 2) * parseInt(epsilonString, 2));
};
runProgram();
