import { parseArgs } from "jsr:@std/cli/parse-args";
import { z } from "npm:zod";

export function validateAndParseArgs<Args>(
  argsSchema: z.ZodSchema<Args>,
): Args {
  const args = parseArgs(Deno.args);

  return argsSchema.parse(args);
}
