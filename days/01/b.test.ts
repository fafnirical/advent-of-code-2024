import { assertEquals } from "jsr:@std/assert";
import { fn } from "./b.ts";

Deno.test("1b", () => {
  const sampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

  assertEquals(fn(sampleInput), 31);
});
