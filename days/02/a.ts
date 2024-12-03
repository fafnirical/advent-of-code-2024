enum Direction {
  ascending,
  descending,
  unknown,
}

function checkSafeLevels(a: number, b: number, expectedDirection: Direction) {
  const difference = a - b;
  const absDifference = Math.abs(difference);

  const direction = absDifference === difference
    ? Direction.ascending
    : Direction.descending;

  if (absDifference < 1 || absDifference > 3) {
    return { isSafe: false, direction };
  }

  if (
    expectedDirection !== Direction.unknown && expectedDirection !== direction
  ) {
    return { isSafe: false, direction };
  }

  return { isSafe: true, direction };
}

export function fn(input: string): number {
  const reports = input.trim().split("\n");

  const totalSafe = reports.reduce((count, report) => {
    const data = report.split(/\s+/g);

    for (
      let i = 1,
        previousDirection: Direction = Direction.unknown;
      i < data.length;
      i++
    ) {
      const current = Number.parseInt(data[i]);
      const previous = Number.parseInt(data[i - 1]);

      const { isSafe, direction } = checkSafeLevels(
        current,
        previous,
        previousDirection,
      );

      if (!isSafe) {
        console.log("Report %s: UNSAFE", report);
        return count;
      }
      previousDirection = direction;
    }

    console.log("Report %s: SAFE", report);
    return count + 1;
  }, 0);

  return totalSafe;
}

Deno.readTextFile("./input.txt").then((input) => {
  console.log(fn(input));
});
