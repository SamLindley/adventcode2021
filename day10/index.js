import fetch from "node-fetch";
const generateOpenersCounter = () => {
  return { "(": 0, "{": 0, "[": 0, "<": 0 };
};
const closeOpenMap = {
  "}": "{",
  ")": "(",
  "]": "[",
  ">": "<",
};

const testSimpleInput = [
  "[({(<(())[]>[[{[]{<()<>>",
  "[(()[<>])]({[<{<<[]>>(",
  "{([(<{}[<>[]}>{[]{[(<()>",
];

const testInput = [
  "[({(<(())[]>[[{[]{<()<>>",
  "[(()[<>])]({[<{<<[]>>(",
  "{([(<{}[<>[]}>{[]{[(<()>",
  "(((({<>}<{<{<>}{[]{[]{}",
  "[[<[([]))<([[{}[[()]]]",
  "[{[{({}]{}}([{[{{{}}([]",
  "{<[[]]>}<{[{[{[]{()[[[]",
  "[<(<(<(<{}))><([]([]()",
  "<{([([[(<>()){}]>(<<{{",
  "<{([{{}}[<[[[<>{}]]]>[]]]",
];

const runProgram = async () => {
  const opts = {
    headers: {
      cookie: `session=${process.env.SESSION}`,
    },
  };
  const data = await fetch("https://adventofcode.com/2021/day/10/input", opts);
  const body = await data.text();
  const parsedData = body.split(/\r?\n/);
  testSimpleInput.forEach((data, i) => {
    console.log("COUNT", i);
    let chunkTracker = generateOpenersCounter();
    const charArray = data.split("");
    let chunkStart;
    charArray.forEach((char) => {
      if (!chunkStart) {
        chunkStart = char;
      }
      console.log("checking ", char);
      console.log("TRACKER ================", chunkTracker);

      // if it is the closing tag for chunkopener
      //  we need to check if another has been opened
      if (closeOpenMap[char] === chunkStart) {
        // check if the count for openers is 0
        if (chunkTracker[chunkStart] === 1) {
          Object.entries(chunkTracker).some(([key, count]) => {
            console.log(key, count);
            if (count !== 0) {
              console.log("We have a problem", char);
              chunkTracker = generateOpenersCounter();
              chunkStart = null;
              return true;
            }
          });
        } else
          chunkTracker[closeOpenMap[char]] = chunkTracker[
            closeOpenMap[char]
          ] -= 1;
      } else if (Object.keys(chunkTracker).includes(char)) {
        chunkTracker[char] = chunkTracker[char] += 1;
      } else {
        chunkTracker[closeOpenMap[char]] = chunkTracker[
          closeOpenMap[char]
        ] -= 1;
      }
    });
  });
};

runProgram();
