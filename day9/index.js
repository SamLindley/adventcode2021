import fetch from "node-fetch";

const testInput = [
  "2199943210",
  "3987894921",
  "9856789892",
  "8767896789",
  "9899965678",
];

const runProgram = async () => {
  const opts = {
    headers: {
      cookie: `session=${process.env.SESSION}`,
    },
  };
  const data = await fetch("https://adventofcode.com/2021/day/9/input", opts);
  const body = await data.text();
  const parsedData = body.split(/\r?\n/);
  const grid = [];
  testInput.forEach((data, i) => {
    grid[i] = [];
    const line = data.split("");
    line.forEach((l, ix) => (grid[i][ix] = l));
  });
  let riskValue = 0;
  grid.forEach((yValue, yIndex) => {
    yValue.forEach((xValue, xIndex) => {
      let isLowest = true;
      if (grid[yIndex - 1] && grid[yIndex - 1][xIndex] <= xValue)
        isLowest = false;
      else if (grid[yIndex + 1] && grid[yIndex + 1][xIndex] <= xValue)
        isLowest = false;
      else if (grid[yIndex][xIndex + 1] && grid[yIndex][xIndex + 1] <= xValue)
        isLowest = false;
      else if (grid[yIndex][xIndex - 1] && grid[yIndex][xIndex - 1] <= xValue)
        isLowest = false;
      if (isLowest) {
        console.log(
          `lowest point found, y: ${yIndex}, x: ${xIndex}, value: ${xValue}`
        );
        riskValue += Number(xValue) + 1;
      }
    });
  });
  const pointsVisted = [];
  const basins = [];
  let currentBasinSize;
  const checkNeighbours = (yIndex, xIndex, grid) => {
    if (!pointsVisted.includes(`${yIndex}, ${xIndex}`)) {
      pointsVisted.push(`${yIndex}, ${xIndex}`);
      if (
        grid[yIndex - 1] &&
        !pointsVisted.includes(`${yIndex - 1}, ${xIndex}`) &&
        grid[yIndex - 1][xIndex] !== "9"
      ) {
        currentBasinSize++;
        checkNeighbours(yIndex - 1, xIndex, grid);
      }
      if (
        grid[yIndex + 1] &&
        !pointsVisted.includes(`${yIndex + 1}, ${xIndex}`) &&
        grid[yIndex + 1][xIndex] !== "9"
      ) {
        currentBasinSize++;
        checkNeighbours(yIndex + 1, xIndex, grid);
      }
      if (
        grid[yIndex][xIndex + 1] &&
        !pointsVisted.includes(`${yIndex}, ${xIndex + 1}`) &&
        grid[yIndex][xIndex + 1] !== "9"
      ) {
        currentBasinSize++;
        checkNeighbours(yIndex, xIndex + 1, grid);
      }
      if (
        grid[yIndex][xIndex - 1] &&
        !pointsVisted.includes(`${yIndex}, ${xIndex - 1}`) &&
        grid[yIndex][xIndex - 1] !== "9"
      ) {
        currentBasinSize++;
        checkNeighbours(yIndex, xIndex - 1, grid);
      }
    }
  };
  grid.forEach((yValue, yIndex) => {
    yValue.forEach((xValue, xIndex) => {
      currentBasinSize = 0;
      if (!pointsVisted.includes(`${yIndex}, ${xIndex}`)) {
        checkNeighbours(yIndex, xIndex, grid);
        basins.push(currentBasinSize);
      }
    });
  });
  const sortedBasins = basins
    .map((basin) => Number(basin))
    .sort((a, b) => b - a);
  console.log(sortedBasins);
  console.log(pointsVisted);
  console.log(sortedBasins[0] * sortedBasins[1] * sortedBasins[2]);
};

runProgram();
