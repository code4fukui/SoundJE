import { writeJapanese, writeEnglish, writeJapaneseConversation, writeEnglishConversation } from "./say.js";

await Deno.mkdir("test", { recursive: true });
await writeJapanese("test/test_ja.aac", "こんにちは");
await writeEnglish("test/test_en.aac", "Hello!");
console.log("done!");

//writeEnglishConversation("test.aac", `"hello I'm Otoya!" "hello I'm Kyoko!"`);
await writeEnglishConversation("test/test1.aac", `check "a" and "b."`);
await writeJapaneseConversation("test/test2.aac", `「こんにちは、きょうこ」「こんにちは、おとや」`);
await writeJapaneseConversation("test/test3.aac", `きょうは「こんにちは、きょうこ」という。`);
await writeJapaneseConversation("test/test4.aac", `一日罰金`);
await writeJapaneseConversation("test/test5.aac", `「なんと」「それは辛い」`);
