export function fn(input: string): number {
  const letters = input.trim().split("\n").map((line) => line.split(""));

  let count = 0;

  for (let rowIndex = 1; rowIndex < letters.length - 1; rowIndex++) {
    const row = letters[rowIndex];

    for (let columnIndex = 1; columnIndex < row.length - 1; columnIndex++) {
      const character = row[columnIndex];

      if (character !== "A") {
        continue;
      }

      // Check top-left, right-down
      const validTopLeft = (
        letters[rowIndex - 1][columnIndex - 1] === "M" &&
        letters[rowIndex + 1][columnIndex + 1] === "S"
      ) ||
        (
          letters[rowIndex - 1][columnIndex - 1] === "S" &&
          letters[rowIndex + 1][columnIndex + 1] === "M"
        );

      const validBottomLeft = (
        letters[rowIndex + 1][columnIndex - 1] === "M" &&
        letters[rowIndex - 1][columnIndex + 1] === "S"
      ) ||
        (
          letters[rowIndex + 1][columnIndex - 1] === "S" &&
          letters[rowIndex - 1][columnIndex + 1] === "M"
        );

      if (validTopLeft && validBottomLeft) {
        count++;
      }
    }
  }

  return count;
}

Deno.readTextFile("./input.txt").then((input) => {
  console.log(fn(input));
});
