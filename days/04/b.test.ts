import { assertEquals } from "jsr:@std/assert";
import { fn } from "./b.ts";

Deno.test("4b - sample 1", () => {
  const sampleInput1 = `M.S
.A.
M.S`;

  assertEquals(fn(sampleInput1), 1);
});

Deno.test("4b - sample 2", () => {
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
  assertEquals(fn(sampleInput2), 9);
});

Deno.test("4b - sample 2 (replaced with `.`)", () => {
  const sampleInput2Replaced = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`;
  assertEquals(fn(sampleInput2Replaced), 9);
});
