import fetch from "node-fetch";

const testInput = [
  "acedgfb",
  "cdfbe",
  "gcdfa",
  "fbcad",
  "dab",
  "cefabd",
  "cdfgeb",
  "eafb",
  "cagedb",
  "ab",
];
const testPattern = ["cdfeb", "fcadb", "cdfeb", "cdbaf"];

const unique = [2, 3, 4, 7];

const mapWithNumberKeys = (map) => {
  return Object.entries(map).reduce((acc, m) => {
    return { ...acc, [m[1]]: m[0] };
  }, {});
};

const getIntersection = (arr1, arr2) => {
  return arr1.filter((x) => !arr2.includes(x));
};

const workOutDisplay = (signal, pattern) => {
  const signalMap = {};
  const knownNumbers = {};
  knownNumbers[signal.find((i) => i.length == 2)] = 1;
  knownNumbers[signal.find((i) => i.length == 3)] = 7;
  knownNumbers[signal.find((i) => i.length == 7)] = 8;
  knownNumbers[signal.find((i) => i.length == 4)] = 4;
  const one = signal.find((i) => i.length == 2);
  const seven = signal.find((i) => i.length == 3);
  const eight = signal.find((i) => i.length == 7);
  signalMap[seven.split("").filter((x) => !one.split("").includes(x))] = "top";
  // signalMap[findDifferences()] = "top";
  const sixCand = signal.filter((t) => t.length === 6);
  const six = sixCand.filter((t) => {
    const arrayOfLinesInOne = one.split("");
    const intersection = arrayOfLinesInOne.filter(
      (x) => !t.split("").includes(x)
    );
    if (intersection.length === 1) {
      signalMap[intersection[0]] = "topRight";
      knownNumbers[t] = 6;
      return true;
    }
  });
  // 1, 4, 6, 7, 8
  // compare 9 and 0 to 4, nine has all matched, 0 has one diff
  const zeroCand = signal.filter(
    (t) => t.length === 6 && t !== mapWithNumberKeys(knownNumbers)[6]
  );
  const zero = zeroCand.filter((t) => {
    const fourString = mapWithNumberKeys(knownNumbers)[4];
    const test = getIntersection(fourString.split(""), t.split(""));
    if (test.length === 1) {
      knownNumbers[t] = 0;
      return true;
    } else {
      knownNumbers[t] = 9;
    }
  });
  // 0, 1, 4, 6, 7, 8, 9
  // 2 3 5 all have 5
  const fiveStickNumbers = signal.filter((t) => t.length === 5);
  // 5 and 6 have no differences && 9 and 3 have no differences
  fiveStickNumbers.forEach((t) => {
    const sixString = mapWithNumberKeys(knownNumbers)[6];
    const nineString = mapWithNumberKeys(knownNumbers)[9];
    const fiveTest = getIntersection(t.split(""), sixString.split(""));
    if (fiveTest.length === 0) {
      knownNumbers[t] = 5;
    }

    const threeTest = getIntersection(t.split(""), nineString.split(""));
    if (threeTest.length === 0 && t !== mapWithNumberKeys(knownNumbers)[5]) {
      knownNumbers[t] = 3;
    }
  });
  const twoString = getIntersection(fiveStickNumbers, [
    mapWithNumberKeys(knownNumbers)[5],
    mapWithNumberKeys(knownNumbers)[3],
  ]);
  knownNumbers[twoString] = 2;
  const alphabetizeNumbers = Object.entries(knownNumbers).reduce(
    (acc, [key, value]) => {
      return {
        ...acc,
        [key.split("").sort().join("")]: value,
      };
    },
    {}
  );
  const answer = pattern.map((p) => {
    return alphabetizeNumbers[p.split("").sort().join("")];
  });
  return answer.reduce((acc, a) => {
    return (acc += a);
  }, "");
};

const runProgram = async () => {
  const opts = {
    headers: {
      cookie: `session=${process.env.SESSION}`,
    },
  };
  const data = await fetch("https://adventofcode.com/2021/day/8/input", opts);
  const body = await data.text();
  const parsedData = body
    .trim()
    .split(/\r?\n/)
    .map((i) => i.split(" | ").map((j) => j.split(" ")));

  const answer = parsedData.reduce((acc, [signal, display], i) => {
    const currentNumber = workOutDisplay(signal, display);
    return (acc += parseInt(currentNumber));
  }, 0);
  console.log(answer);
};

runProgram();
