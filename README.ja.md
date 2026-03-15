# SoundJE - 英語学習用音声教材作成ツール

SoundJEは、英語学習用の音声教材を生成するmacOS用のツールです。テキストファイルから単語や文章の音声を作成できます。

## 使い方

### 文章の使い方

1. `src/sentenses.txt`ファイルを準備
2. スクリプトを実行
```sh
deno run -A make_sentenses.js sentenses
```
3. 生成された音声教材を学習
- [sentenses_je.mp3](https://code4fukui.github.io/SoundJE/dist/sentenses/sentenses_je.mp3)

### 単語の使い方

1. `src/words.txt`ファイルを準備
2. スクリプトを実行
```sh
deno run -A make_words.js words
```
3. 生成された音声教材を学習 
- [words_je.mp3](https://code4fukui.github.io/SoundJE/dist/words/words_je.mp3)

## 必要環境

- [Deno](https://deno.land/)
- [ffmpeg](https://ffmpeg.org/)
- macOSの`say`コマンド (Otoya、Kyoko、Ava、Tomをインストール)

## ライセンス

MIT License