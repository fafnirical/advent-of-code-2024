export function fn(input: string): number {
  const [pageOrderingRulesSection, pageNumbersSection] = input.trim().split(
    "\n\n",
  ).map((
    section,
  ) => section.trim());

  const pageOrderingMap = pageOrderingRulesSection.split("\n").reduce<
    Record<number, number[]>
  >(
    (map, pageOrderingRule) => {
      const [firstPage, secondPage] = pageOrderingRule.split("|")
        .map((page) => Number.parseInt(page, 10));

      if (!Array.isArray(map?.[firstPage])) {
        map[firstPage] = [];
      }
      map[firstPage].push(secondPage);

      return map;
    },
    {},
  );

  const pageNumberLists = pageNumbersSection.split("\n").map((pageNumberList) =>
    pageNumberList.split(",").map((page) => Number.parseInt(page, 10))
  );
  const validPageOrders = pageNumberLists.filter((pages) => {
    for (let pageIndex = 0; pageIndex < pages.length - 1; pageIndex++) {
      const firstPageToCheck = pages[pageIndex];
      const pageOrderingRule = pageOrderingMap[firstPageToCheck] ?? [];

      if (
        pages.slice(pageIndex + 1).some((page) =>
          !pageOrderingRule.includes(page)
        )
      ) {
        return false;
      }
    }

    return true;
  });

  const middleSum = validPageOrders
    .map((pages) => pages.at(pages.length / 2) as number)
    .reduce((a, b) => a + b, 0);

  return middleSum;
}

Deno.readTextFile("./input.txt").then((input) => {
  console.log(fn(input));
});
