export const convert = async (outfn, infn) => {
  // ffmpeg -i input.mp3 output.mp3
  const cmd = ["ffmpeg", "-y", "-i", infn];
  if (outfn.endsWith(".mp3")) {
    cmd.concat(["-vn", "-ar", "48000", "-ac", "1", "-b:a", "98k"]);
  }
  cmd.push(outfn);
  const p = await Deno.run({ cmd });
  await p.status();
};
