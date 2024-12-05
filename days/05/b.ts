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
  const invalidPageOrders = pageNumberLists.filter((pages) => {
    for (let pageIndex = 0; pageIndex < pages.length - 1; pageIndex++) {
      const firstPageToCheck = pages[pageIndex];
      const pageOrderingRule = pageOrderingMap[firstPageToCheck] ?? [];

      if (
        pages.slice(pageIndex + 1).some((page) =>
          !pageOrderingRule.includes(page)
        )
      ) {
        return true;
      }
    }

    return false;
  });
  const validatedPageOrders = invalidPageOrders.map((pages) => {
    return pages.toSorted((a, b) => {
      const aOrderingRule = pageOrderingMap[a] ?? [];
      const bOrderingRule = pageOrderingMap[b] ?? [];

      if (aOrderingRule.includes(b)) {
        return -1;
      }
      if (bOrderingRule.includes(a)) {
        return 1;
      }
      return 0;
    });
  });

  const middleSum = validatedPageOrders
    .map((pages) => pages.at(pages.length / 2) as number)
    .reduce((a, b) => a + b, 0);

  return middleSum;
}

Deno.readTextFile("./input.txt").then((input) => {
  console.log(fn(input));
});
