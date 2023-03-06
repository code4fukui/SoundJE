import { makeSoundJE } from "./makeSoundJE.js";

const name = Deno.args[0] || "questions";

const srccsv= `src/${name}.csv`;
const dstcsv = `dist/${name}/${name}.csv`;
const dstmp3 = `dist/${name}/${name}_je.mp3`;

await Deno.mkdir(`dist/${name}`, { recursize: true });
await Deno.writeFile(dstcsv, await Deno.readFile(srccsv));
await makeSoundJE(dstmp3, dstcsv);
