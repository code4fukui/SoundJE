import { CSV } from "https://js.sabae.cc/CSV.js";
import { writeEnglishConversation, writeJapaneseConversation } from "./say.js";
import { concatSound } from "./concatSound.js";
import { convert } from "./ffmpeg.js";

const ext = ".aac";
//const ext = ".wav";

//const outext = ".mp3";
//const outext = ".aac";

export const makeSoundJE = async (outfn, infn) => {
  const basepath = outfn.substring(0, outfn.lastIndexOf("/"));
  await Deno.mkdir(basepath, { recursive: true });
  const path = basepath + "/sound/";
  await Deno.mkdir(path, { recursive: true });
  
  const list = await CSV.fetchJSON(infn);
  const fns = [];
  const fns2 = [];
  for (let i = 0; i < list.length; i++) {
    const w = list[i];
    const pre = w.no + (w.id ? "-" + w.id : "");
    const jafn = path + pre + ".ja" + ext;
    const enfn = path + pre + ".en" + ext;
    await writeJapaneseConversation(jafn, w.ja, 300);
    await writeEnglishConversation(enfn, w.en);
    fns.push(enfn);
    fns.push(jafn);
    fns2.push(jafn);
    fns2.push(enfn);
  }
  const outext = outfn.substring(outfn.lastIndexOf("."));
  if (outext != ext) {
    const outfn2 = outfn.substring(0, outfn.lastIndexOf(".")) + ext;
    await concatSound(outfn2, fns2); // jaen
    //await concatSound("temp/enja" + ext, fns);
    //await concatSound("temp/jaen" + ext, fns2);
    //await convert("dist/sentenses_enja" + outext, "temp/enja" + ext);
    await convert(outfn, outfn2);
    await Deno.remove(outfn2);
    //await Deno.remove("temp/enja" + ext);
    //await Deno.remove("temp/jaen" + ext);
  } else {
    await concatSound(outfn, fns2); // jaen
  }
};
