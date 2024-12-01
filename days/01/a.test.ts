import { assertEquals } from "jsr:@std/assert";
import { fn } from "./a.ts";

Deno.test("1a", () => {
  const sampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

  assertEquals(fn(sampleInput), 11);
});
