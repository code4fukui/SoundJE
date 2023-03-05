import { concatSound } from "./concatSound.js";

await Deno.mkdir("test", { recursive: true });

await concatSound("test/concattest.aac", ["test_en.aac", "test_ja.aac"]);
