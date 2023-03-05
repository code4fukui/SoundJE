import { CSV } from "https://js.sabae.cc/CSV.js";

export const convertWords = async (dstcsv, intxt) => {
  const path = dstcsv.substring(0, dstcsv.lastIndexOf("/"));
  await Deno.mkdir(path, { recursive: true });

  const ss = (await Deno.readTextFile(intxt)).split("\n");
  const list = [];
  let no = ss[0];
  let idx = 0;
  for (let i = 1; i < ss.length; i++) {
    if (!ss[i]) {
      break;
    }
    const ss2 = ss[i].split(",");
    if (ss2.length == 1) {
      no = ss2[0];
      continue;
    }
    const en = ss2[0];
    const ja = ss2[1];
    const id = ++idx;
    list.push({ id, no, en, ja });
  }
  console.log(list.length);
  await Deno.writeTextFile(dstcsv, CSV.stringify(list));  
};
