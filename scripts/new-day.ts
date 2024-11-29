import { z } from "npm:zod";
import { validateAndParseArgs } from "./helpers/validate-and-parse-args.ts";

const args = validateAndParseArgs(
  z.object({
    _: z.array(z.coerce.number().int().gte(1).lte(25)).nonempty().length(1),
  }),
);

// ---

const baseDirectory = "days";

if (args) {
  newDay(args._[0]);
}

async function newDay(day: number) {
  try {
    await Deno.mkdir(baseDirectory);
  } catch (error) {
    if (!(error instanceof Deno.errors.AlreadyExists)) {
      throw error;
    }
  }

  const paddedDay = day.toString(10).padStart(2, "0");
  const dayDirectory = `${baseDirectory}/${paddedDay}`;

  try {
    await Deno.mkdir(dayDirectory);
  } catch (error) {
    // Throw if the day has already been initialized (we don't want to overwrite it).
    if (error instanceof Deno.errors.AlreadyExists) {
      console.error(
        "%c❌ Error: Day %s has already been initialized.",
        "color: red",
        day,
      );
      Deno.exit(1);
    }
  }
  await Deno.writeTextFile(`${dayDirectory}/deno.json`, "{}");
}
