import { assertEquals } from "jsr:@std/assert";
import { fn } from "./a.ts";

Deno.test("3a", () => {
  const sampleInput =
    `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

  assertEquals(fn(sampleInput), 161);
});
