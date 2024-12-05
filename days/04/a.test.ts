import { assertEquals } from "jsr:@std/assert";
import { fn } from "./a.ts";

Deno.test("4a - sample 1", () => {
  const sampleInput1 = `..X...
.SAMX.
.A..A.
XMAS.S
.X....`;

  assertEquals(fn(sampleInput1), 4);
});

Deno.test("4a - sample 2", () => {
  const sampleInput2 = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
  assertEquals(fn(sampleInput2), 18);
});

Deno.test("4a - sample 2 (replaced with `.`)", () => {
  const sampleInput2Replaced = `....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX`;
  assertEquals(fn(sampleInput2Replaced), 18);
});
