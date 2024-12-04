function runOperations(multiplyOperations: string[] | null) {
  if (!multiplyOperations) {
    return 0;
  }

  return multiplyOperations.map((operation) => {
    const operands = operation.match(/(\d+),(\d+)/);
    if (!operands) {
      return 0;
    }
    const [, first, second] = operands;

    return Number.parseInt(first, 10) * Number.parseInt(second, 10);
  }).reduce((a, b) => a + b, 0);
}

export function fn(input: string): number {
  const operationLists = input.split(/(do\(\)|don't\(\))/g);

  let runningTotal = 0;

  for (let i = 0, should = true; i < operationLists.length; i++) {
    const operationList = operationLists[i];

    if (operationList.startsWith("don't()")) {
      should = false;
    } else if (operationList.startsWith("do()")) {
      should = true;
    } else if (should) {
      const multiplyOperations = operationList.match(/mul\(\d+,\d+\)/g);
      runningTotal += runOperations(multiplyOperations);
    }
  }

  return runningTotal;
}

Deno.readTextFile("./input.txt").then((input) => {
  console.log(fn(input));
});
