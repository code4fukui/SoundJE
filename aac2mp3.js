import { convert } from "./ffmpeg.js";

const fn = Deno.args[0];
await convert(fn, fn + ".aac");
