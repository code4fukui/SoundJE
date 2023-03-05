import { CSV } from "https://js.sabae.cc/CSV.js";

export const convertSentenses = async (dstcsv, intxt) => {
  const path = dstcsv.substring(0, dstcsv.lastIndexOf("/"));
  await Deno.mkdir(path, { recursive: true });

  const ss = (await Deno.readTextFile(intxt)).split("\n");
  const list = [];
  for (let i = 0; i < ss.length; i += 2) {
    const en = ss[i];
    if (!en) {
      break;
    }
    const ja = ss[i + 1];
    const no = (i / 2) + 1;
    list.push({ no, en, ja });
  }
  console.log(list.length);
  await Deno.writeTextFile(dstcsv, CSV.stringify(list));
  //await Deno.writeTextFile("dist/sentenses/sentenses.en.txt", list.map(s => s.no + ". " + s.en).join("\n\n"));
  //await Deno.writeTextFile("dist/sentenses/sentenses.ja.txt", list.map(s => s.no + ". " + s.ja).join("\n\n"));
};
