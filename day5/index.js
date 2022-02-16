import fetch from "node-fetch";

const testInput = [
  [
    ["438", "701"],
    ["408", "701"],
  ],
  [
    ["401", "703"],
    ["401", "724"],
  ],
  [
    ["438", "701"],
    ["408", "701"],
  ],
  [
    ["401", "703"],
    ["401", "724"],
  ],
];

const testData = [
  "0,9 -> 5,9",
  "8,0 -> 0,8",
  "9,4 -> 3,4",
  "2,2 -> 2,1",
  "7,0 -> 7,4",
  "6,4 -> 2,0",
  "0,9 -> 2,9",
  "3,4 -> 1,4",
  "0,0 -> 8,8",
  "5,5 -> 8,2",
];

const NORTH_EAST = {
  x: "+",
  y: "+",
};

const NORTH_WEST = {
  x: "-",
  y: "+",
};

const SOUTH_WEST = {
  x: "-",
  y: "-",
};

const SOUTH_EAST = {
  x: "+",
  y: "-",
};

const runProgram = async () => {
  const opts = {
    headers: {
      cookie: `session=${process.env.SESSION}`,
    },
  };
  const data = await fetch("https://adventofcode.com/2021/day/5/input", opts);
  const body = await data.text();
  const takenLocations = [];
  const doubleLocations = [];
  const sameXValues = [];
  const sameYValues = [];
  const parsedData = body.split(/\r?\n/);
  const filteredData = parsedData.map((data) => {
    const splitData = data.split("->");
    const finalData = splitData.map((d) => d.trim().split(","));
    return finalData;
  });
  const anotherFilter = filteredData.filter((t) => t.length > 1);
  anotherFilter.forEach((data) => {
    // x value is the same
    if (data[0][0] === data[1][0]) {
      const firstY = parseInt(data[0][1]);
      const secondY = parseInt(data[1][1]);
      let startIndex;
      let max;
      if (firstY > secondY) {
        startIndex = secondY;
        max = firstY;
      } else {
        startIndex = firstY;
        max = secondY;
      }

      for (let index = startIndex; index <= max; index++) {
        if (takenLocations.includes([data[0][0], index].join(","))) {
          if (!doubleLocations.includes([data[0][0], index].join(","))) {
            doubleLocations.push([data[0][0], index].join(","));
          }
        } else {
          takenLocations.push([data[0][0], index].join(","));
        }
      }
    }
    // y value is the same
    if (data[0][1] === data[1][1]) {
      sameYValues.push(data[0][1]);
      const firstX = parseInt(data[0][0]);
      const secondX = parseInt(data[1][0]);
      let startIndex;
      let max;
      if (firstX > secondX) {
        startIndex = secondX;
        max = firstX;
      } else {
        startIndex = firstX;
        max = secondX;
      }
      for (let index = startIndex; index <= max; index++) {
        if (takenLocations.includes([index, data[0][1]].join(","))) {
          if (!doubleLocations.includes([index, data[0][1]].join(","))) {
            doubleLocations.push([index, data[0][1]].join(","));
          }
        } else {
          takenLocations.push([index, data[0][1]].join(","));
        }
      }
    }
    // is a diagonal
    let startIndex;
    let max;
    const x1 = data[0][0];
    const x2 = data[1][0];
    const y1 = data[1][0];
    const y2 = data[1][1];
    const xDiff = x1 - x2;
    const yDiff = y1 - y2;
    if (xDiff * xDiff === yDiff * yDiff) {
      if (y2 > y1 && x2 > x1) {
        if (x1 > x2) {
          startIndex = x2;
          max = x1;
        } else {
          startIndex = x1;
          max = x2;
        }
        //northeast
      }
      if (y2 < y1 && x2 > x1) {
        //southeast
      }
      if (y2 < y1 && x2 < x1) {
        //southwest
      }
      if (y2 > y1 && x2 < x1) {
        //northwest
      }
    }
  });
  console.log(doubleLocations.length);
};

runProgram();
