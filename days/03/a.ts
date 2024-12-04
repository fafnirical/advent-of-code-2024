export function fn(input: string): number {
  const multiplyOperations = input.match(/mul\(\d+,\d+\)/g);

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

Deno.readTextFile("./input.txt").then((input) => {
  console.log(fn(input));
});
