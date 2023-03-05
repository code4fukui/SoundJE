import { convertWords } from "./cnv_words.js";
import { makeSoundJE } from "./makeSoundJE.js";

const name = Deno.args[0] || "words";

const srctxt = `src/${name}.txt`;
const dstcsv = `dist/${name}/${name}.csv`;
const dstmp3 = `dist/${name}/${name}_je.mp3`;

await convertWords(dstcsv, srctxt);
await makeSoundJE(dstmp3, dstcsv);
