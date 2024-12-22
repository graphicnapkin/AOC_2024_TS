import { readTextFile } from "../utils";

const main = async () => {
  const test = false;
  let rawInput = await readTextFile(__dirname, test);
  let total = 0;
  //handle conditionals
  rawInput = rawInput
    .split("do()")
    .map((r) => r.split("don't()")[0])
    .join();

  const multiplyRegex = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = rawInput.matchAll(multiplyRegex);

  for (const match of matches) {
    let instruction = match[0];
    const [num1, num2] = instruction
      .replace(/mul\(|\)/, "")
      .split(",")
      .map((n) => parseInt(n));

    total += num1 * num2;
  }
  console.log({ total });
};

export default main;
