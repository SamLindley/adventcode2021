import fetch from "node-fetch";

const testInput = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2",
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
  console.log(parsedData);
  let horizontal = 0;
  let vertical = 0;
  let aim = 0;
  parsedData.forEach((data) => {
    switch (data.split(" ")[0]) {
      case "down":
        aim += parseInt(data.split(" ")[1]);
        break;
      case "up":
        aim -= parseInt(data.split(" ")[1]);
        break;
      case "forward":
        horizontal += parseInt(data.split(" ")[1]);
        vertical += parseInt(data.split(" ")[1]) * aim;
        break;
    }
  });
  console.log(horizontal * vertical);
};

runProgram();
