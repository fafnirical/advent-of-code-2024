export function fn(input: string): number {
  const letters = input.trim().split("\n").map((line) => line.split(""));

  let count = 0;

  for (let rowIndex = 0; rowIndex < letters.length; rowIndex++) {
    const row = letters[rowIndex];

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const character = row[columnIndex];

      if (character !== "X") {
        continue;
      }

      const hasRoomRight = columnIndex < row.length - 3;
      const hasRoomLeft = columnIndex >= 3;
      const hasRoomDown = rowIndex < letters.length - 3;
      const hasRoomUp = rowIndex >= 3;

      // Check right (forward)
      if (
        hasRoomRight &&
        row[columnIndex + 1] === "M" &&
        row[columnIndex + 2] === "A" &&
        row[columnIndex + 3] === "S"
      ) {
        count++;
      }

      // Check left (backward)
      if (
        hasRoomLeft &&
        row[columnIndex - 1] === "M" &&
        row[columnIndex - 2] === "A" &&
        row[columnIndex - 3] === "S"
      ) {
        count++;
      }

      // Check down
      if (
        hasRoomDown &&
        letters[rowIndex + 1][columnIndex] === "M" &&
        letters[rowIndex + 2][columnIndex] === "A" &&
        letters[rowIndex + 3][columnIndex] === "S"
      ) {
        count++;
      }

      // Check up
      if (
        hasRoomUp &&
        letters[rowIndex - 1][columnIndex] === "M" &&
        letters[rowIndex - 2][columnIndex] === "A" &&
        letters[rowIndex - 3][columnIndex] === "S"
      ) {
        count++;
      }

      // Check diagonal right-down
      if (
        hasRoomRight &&
        hasRoomDown &&
        letters[rowIndex + 1][columnIndex + 1] === "M" &&
        letters[rowIndex + 2][columnIndex + 2] === "A" &&
        letters[rowIndex + 3][columnIndex + 3] === "S"
      ) {
        count++;
      }

      // Check diagonal right-up
      if (
        hasRoomRight &&
        hasRoomUp &&
        letters[rowIndex - 1][columnIndex + 1] === "M" &&
        letters[rowIndex - 2][columnIndex + 2] === "A" &&
        letters[rowIndex - 3][columnIndex + 3] === "S"
      ) {
        count++;
      }

      // Check diagonal left-down
      if (
        hasRoomLeft &&
        hasRoomDown &&
        letters[rowIndex + 1][columnIndex - 1] === "M" &&
        letters[rowIndex + 2][columnIndex - 2] === "A" &&
        letters[rowIndex + 3][columnIndex - 3] === "S"
      ) {
        count++;
      }

      // Check diagonal left-up
      if (
        hasRoomLeft &&
        hasRoomUp &&
        letters[rowIndex - 1][columnIndex - 1] === "M" &&
        letters[rowIndex - 2][columnIndex - 2] === "A" &&
        letters[rowIndex - 3][columnIndex - 3] === "S"
      ) {
        count++;
      }
    }
  }

  return count;
}

Deno.readTextFile("./input.txt").then((input) => {
  console.log(fn(input));
});
