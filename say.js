import { concatSound } from "./concatSound.js";

const fixmap = {
  "罰金": "ばっきん",
  "一日": "いちにち",
  "一目惚れ": "ひとめぼれ",
  "で彼だと": "でかれだと", //?
  "臭い": "くさい",
  "年金": "ねんきん",
  "漏らして": "もらして",
  "一言一句": "いちごんいっく",
  "近づいちゃ": "ちかづいちゃ",
  "引っ張って行った": "ひっぱっていった",
  "行ったり来たり": "いったりきたり",
  "逃げて行った": "にげていった",
  "2、3日": "にさんにち",
  "辛い食べ物": "からいたべもの",
  "辛い": "つらい",
  "熱帯雨林": "ねったいうりん",
  "酸性雨": "さんせいう",
  "背後": "はいご",
  "後で": "あとで",
  "ご希望の方": "ごきぼうのかた",
  "の方は": "のほうは",
  "歳入源": "さいにゅうげん",
  "完璧": "かんぺき",
  "先見の明": "せんけんのめい",
  "基金": "ききん",
  "瀕して": "ひんして",
  "何です": "なんです",  
};

export const VOICE_EN_FEMALE = "Ava";
export const VOICE_EN_MALE = "Tom";

export const VOICE_JA_FEMALE = "Kyoko";
export const VOICE_JA_MALE = "Otoya";

const VOICE_JA = VOICE_JA_MALE;
const VOICE_EN = VOICE_EN_MALE;

const write = async (fn, text, voice = VOICE_EN, wpm) => {
  const cmd = ["say", "-v", voice, "-o", fn];
  if (fn.endsWith(".wav")) {
    cmd.push("--data-format=LEI16@48000");
  }
  if (wpm) {
    cmd.push("-r");
    cmd.push(wpm);
  }
  cmd.push(text);
  const p = await Deno.run({ cmd });
  await p.status();
};

export const writeJapanese = async (fn, text, wpm, voice = VOICE_JA) => {
  for (const org in fixmap) {
    text = text.replace(new RegExp(org, "g"), fixmap[org])
  }
  await write(fn, text, voice, wpm);
};

export const writeEnglish = async (fn, text, wpm) => await write(fn, text, VOICE_EN, wpm);

export const writeEnglishConversation = async (fn, text, wpm) => {
  if (!text.startsWith('"') || !text.endsWith('"')) {
    return await writeEnglish(fn, text, wpm);
  }
  const ext = fn.substring(fn.lastIndexOf("."));
  const ss = text.split('"');
  await Deno.mkdir("temp", { recursive: true });
  const voices = [VOICE_EN_MALE, VOICE_EN_FEMALE];
  let nvoice = 0;
  const list = [];
  let i = 0;
  for (const s of ss) {
    if (s.trim() == "") continue;
    const voice = voices[nvoice];
    if (s.endsWith(".") || s.endsWith("!") || s.endsWith("?")) {
      nvoice = 1 - nvoice;
    }
    const fnt = "temp/temp" + i++ + ext;
    await write(fnt, s, voice, wpm);
    list.push(fnt);    
  }
  await concatSound(fn, list);
  for (const fnt of list) {
    await Deno.remove(fnt);
  }
};

export const writeJapaneseConversation = async (fn, text, wpm) => {
  if (!text.startsWith("「") || !text.endsWith("」")) {
    return await writeJapanese(fn, text, wpm);
  }
  const ss = text.split(/[「」]/);
  const ext = fn.substring(fn.lastIndexOf("."));
  await Deno.mkdir("temp", { recursive: true });
  const voices = [VOICE_JA_MALE, VOICE_JA_FEMALE];
  let nvoice = 0;
  const list = [];
  let i = 0;
  for (const s of ss) {
    if (s.trim() == "") continue;
    const voice = voices[nvoice];
    //if (s.endsWith(".") || s.endsWith("!") || s.endsWith("?")) {
      nvoice = 1 - nvoice;
    //}
    const fnt = "temp/temp" + i++ + ext;
    await writeJapanese(fnt, s, wpm, voice);
    list.push(fnt);    
  }
  await concatSound(fn, list);
  for (const fnt of list) {
    await Deno.remove(fnt);
  }
};
