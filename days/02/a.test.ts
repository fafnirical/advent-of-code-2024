import { assertEquals } from "jsr:@std/assert";
import { fn } from "./a.ts";

Deno.test("2a", () => {
  const sampleInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

  assertEquals(fn(sampleInput), 2);
});
