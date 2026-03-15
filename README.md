# SoundJE - Tools for creating audio materials for learning English

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

## Features

- SoundJE is a tool for macOS to create audio materials for learning English from text files including words or sentences.

## Usage

### Usage - sentences

1. prepare `src/sentenses.txt`
2. run a script
```sh
deno run -A make_sentenses.js sentenses
```
3. learn with the SoundJE audio material!
- [sentenses_je.mp3](https://code4fukui.github.io/SoundJE/dist/sentenses/sentenses_je.mp3)

### Usage - words

1. prepare `src/words.txt` 
2. run a script
```sh
deno run -A make_words.js words
```
3. learn with the SoundJE audio material!
- [words_je.mp3](https://code4fukui.github.io/SoundJE/dist/words/words_je.mp3)

## Dependencies

- [Deno](https://deno.land/)
- [ffmpeg](https://ffmpeg.org/)
- `say` on macOS (download Otoya, Kyoko, Ava, Tom)

## License

MIT License