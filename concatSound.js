export const concatSound = async (outfn, infns) => {
  if (infns.length < 100) {
    return await concatSoundShort(outfn, infns);
  }
  const ext = outfn.substring(outfn.lastIndexOf("."));
  await Deno.mkdir("temp", { recursive: true });
  const list = [];
  for (let i = 0; i < infns.length; i += 100) {
    const tempfn = "temp/concat" + (i / 100) + ext;
    const tfn = [];
    for (let j = 0; j < 100; j++) {
      const n = i + j;
      if (n >= infns.length) break;
      tfn.push(infns[n]);
    }
    await concatSoundShort(tempfn, tfn);
    list.push(tempfn);
  }
  const res = await concatSoundShort(outfn, list);
  for (const fn of list) {
    await Deno.remove(fn);
  }
  return res;
};

export const concatSoundShort = async (outfn, infns) => {
  // ffmpeg -i input1.mp3 -i input2.mp3 -filter_complex "concat=n=2:v=0:a=1" output.mp3
  const cmd = ["ffmpeg"];
  for (const infn of infns) {
    cmd.push("-i");
    cmd.push(infn);
  }
  cmd.push("-filter_complex");
  cmd.push(`concat=n=${infns.length}:v=0:a=1`);
  cmd.push("-y");
  cmd.push(outfn);
  const p = await Deno.run({ cmd });
  await p.status();
};
