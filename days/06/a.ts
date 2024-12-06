/**
 * / -> Y
 * |
 * v
 * X
 */

enum Direction {
  up,
  right,
  down,
  left,
}

type Position = {
  x: number;
  y: number;
};

function move(
  position: Position,
  direction: Direction,
  grid: string[][],
): Position | null {
  const { x, y } = position;

  const maxX = grid.length;
  const maxY = grid[x].length;

  switch (direction) {
    case Direction.up:
      // x-1
      return x === 0 ? null : {
        x: x - 1,
        y: y,
      };
    case Direction.right:
      return y === maxY - 1 ? null : {
        x,
        y: y + 1,
      };
    case Direction.down:
      return x === maxX - 1 ? null : {
        x: x + 1,
        y: y,
      };
    case Direction.left:
      return y === 0 ? null : {
        x: x,
        y: y - 1,
      };
  }
}

function turn(currentDirection: Direction): Direction {
  switch (currentDirection) {
    case Direction.up:
      return Direction.right;
    case Direction.right:
      return Direction.down;
    case Direction.down:
      return Direction.left;
    case Direction.left:
      return Direction.up;
  }
}

function getCurrentPosition(
  grid: string[][],
): { position: Position | null; direction: Direction | null } {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const cell = grid[x][y];
      const position: Position = { x, y };

      switch (cell) {
        case "^":
          return { position, direction: Direction.up };
        case ">":
          return { position, direction: Direction.right };
        case "v":
          return { position, direction: Direction.down };
        case "<":
          return { position, direction: Direction.left };
        default:
          continue;
      }
    }
  }

  return {
    position: null,
    direction: null,
  };
}

export function fn(input: string): number {
  const grid = input.trim().split("\n").map((row) => row.trim().split(""));

  let { position, direction } = getCurrentPosition(grid);
  if (position === null || direction === null) {
    return 0;
  }

  let nextMove = undefined;

  while (true) {
    // console.table(grid);
    const { x, y } = position;

    nextMove = move(position, direction, grid);
    if (nextMove === null) {
      break;
    }
    while (grid[nextMove.x][nextMove.y] === "#") {
      direction = turn(direction);
      nextMove = move(position, direction, grid);
      if (nextMove === null) {
        break;
      }
    }
    if (nextMove === null) {
      break;
    }

    // Mark the current spot.
    grid[x][y] = "X";

    position = nextMove;
    switch (direction) {
      case Direction.up:
        grid[position.x][position.y] = "^";
        break;
      case Direction.right:
        grid[position.x][position.y] = ">";
        break;
      case Direction.down:
        grid[position.x][position.y] = "v";
        break;
      case Direction.left:
        grid[position.x][position.y] = "<";
        break;
    }
  }

  const uniquePositions = grid.reduce(
    (count, row) =>
      count + row.filter(
        (cell) => ["X", "^", ">", "v", "<"].includes(cell),
      ).length,
    0,
  );

  return uniquePositions;
}

Deno.readTextFile("./input.txt").then((input) => {
  console.log(fn(input));
});
