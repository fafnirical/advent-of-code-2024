export function fn(input: string): number {
  const locationIDs = input.trim().split("\n");

  const locationIdPairs = locationIDs.map((pair) =>
    pair.trim().split(/\s+/g).map((locationId) => Number.parseInt(locationId))
  );

  const [unsortedLefts, unsortedRights] = locationIdPairs.reduce<
    [number[], number[]]
  >(
    (
      [leftList, rightList],
      [left, right],
    ) => [leftList.concat(left), rightList.concat(right)],
    [[], []],
  );

  const lefts = unsortedLefts.toSorted();
  const rights = unsortedRights.toSorted();

  const distances = lefts.map((id, index) => Math.abs(id - rights[index]));

  const totalDistance = distances.reduce((a, b) => a + b, 0);

  return totalDistance;
}

Deno.readTextFile("./input.txt").then((input) => {
  console.log(fn(input));
});
