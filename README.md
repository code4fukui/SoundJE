# SoundJE - Tools for creating audio materials for learning English

- SoundJE is a tool for macOS to create audio materials for learing English from text files including words or sentenses.
- SoundJEは、英語学習用の音声教材を生成するmacOS用のツールです

## Usage

### Usage - sentenses

1. prepare src/sentenses.txt
```
今日はいい天気です
Today is sunny.
明日は何曜日ですか？
What day is tomorrow?
```

2. run a script
```sh
deno run -A make_sentenses.js sentenses
```

3. learn with the SoundJE audio material!
- [sentenses_je.mp3](https://code4fukui.github.io/SoundJE/dist/sentenses/sentenses_je.mp3)

### Usage - words

1. prepare src/words.txt
```
1
Today,今日
2
day,曜日
tomorrow,明日
3
Hi,こんにちは
```

2. run a script
```sh
deno run -A make_words.js words
```

3. learn with the SoundJE audio material!
- [words_je.mp3](https://code4fukui.github.io/SoundJE/dist/words/words_je.mp3)

## Dependencies

- [Deno](https://deno.land/)
- [ffmpeg](https://ffmpeg.org/)
- say on macOS (download Otoya, Kyoko, Ava, Tom)

## Appendix

### about say command on Mac

```sh
say -v '?' | grep en_

# very good (female)
Ava                 en_US    # Hello, my name is Ava. I am an American-English voice.
# good (male)
Tom                 en_US    # Hello, my name is Tom. I am an American-English voice.

# so so
Samantha            en_US    # Hello, my name is Samantha. I am an American-English voice.
# not bad
Allison             en_US    # Hello, my name is Allison. I am an American-English voice.
Susan               en_US    # Hello, my name is Susan. I am an American-English voice.
# old computer voice
Agnes               en_US    # Isn't it nice to have a computer that will talk to you?
Fred                en_US    # I sure like being inside this fancy computer
Alex                en_US    # Most people recognize me by my voice.
Victoria            en_US    # Isn't it nice to have a computer that will talk to you?
Vicki               en_US    # Isn't it nice to have a computer that will talk to you?

# not US English
Moira               en_IE    # Hello, my name is Moira. I am an Irish-English voice.
Rishi               en_IN    # Hello, my name is Rishi. I am an Indian-English voice.
Karen               en_AU    # Hello, my name is Karen. I am an Australian-English voice.
Daniel              en_GB    # Hello, my name is Daniel. I am a British-English voice.
Veena               en_IN    # Hello, my name is Veena. I am an Indian-English voice.
Tessa               en_ZA    # Hello, my name is Tessa. I am a South African-English voice.
```

#### test

say -v Fred 'Hello, my name is Tom. I am an American-English voice.'

#### file-format

```sh
say --file-format '?'
3gp2  3GPP-2 Audio         (.3g2) [Qclp,aac,aace,aacf,aacg,aach,aacl,aacp]
3gpp  3GP Audio            (.3gp) [Qclp,aac,aace,aacf,aacg,aach,aacl,aacp]
AIFC  AIFC                 (.aifc,.aiff,.aif) [lpcm,ulaw,alaw,ima4,Qclp]
AIFF  AIFF                 (.aiff,.aif) [lpcm]
BW64  WAVE (BW64 for length over 4 GB) (.wav) [lpcm,ulaw,alaw]
NeXT  NeXT/Sun             (.snd,.au) [lpcm,ulaw,alaw]
RF64  WAVE (RF64 for length over 4 GB) (.wav) [lpcm,ulaw,alaw]
Sd2f  Sound Designer II    (.sd2) [lpcm]
W64f  Wave64               (.w64) [lpcm,ulaw,alaw]
WAVE  WAVE                 (.wav) [lpcm,ulaw,alaw]
adts  AAC ADTS             (.aac,.adts) [aac,aach,aacp]
caff  CAF                  (.caf) [Qclp,aac,aace,aacf,aacg,aach,aacl,aacp,alac,alaw,flac,ilbc,ima4,lpcm,opus,ulaw]
flac  FLAC                 (.flac) [flac]
loas  LATM/LOAS            (.loas,.latm,.xhe) [aac,aace,aacf,aacg,aach,aacl,aacp]
m4af  Apple MPEG-4 Audio   (.m4a,.m4r) [aac,aace,aacf,aacg,aach,aacl,aacp,alac,flac,lpcm]
m4bf  Apple MPEG-4 AudioBooks (.m4b) [aac,aace,aacf,aacg,aach,aacl,aacp]
mp4f  MPEG-4 Audio         (.mp4) [aac,aace,aacf,aacg,aach,aacl,aacp,alac,flac,lpcm]
```

#### data-format

```sh
say --file-format m4af --data-format '?'
aac   AAC, 1 channels
aace  MPEG-4 AAC Enhanced Low Delay, 1 channels
aacf  MPEG-4 AAC Enhanced Low Delay with SBR, 1 channels
aacg  MPEG-4 AAC Enhanced Low Delay V2, 1 channels, 24000 Hz
aach  MPEG-4 HE AAC, 1 channels
aacl  MPEG-4 AAC Low Delay, 1 channels
aacp  MPEG-4 HE AAC V2, 1 channels
alac  Apple Lossless
flac  FLAC
lpcm  Linear PCM
```

#### output as wav

```
say --file-format m4af --data-format '?'
say --file-format adts --data-format '?'
  aac   AAC, 1 channels
  aach  MPEG-4 HE AAC, 1 channels
  aacp  MPEG-4 HE AAC V2, 1 channels
say --file-format wave --data-format '?'
  lpcm  Linear PCM
  ulaw  μ-Law 2:1
  alaw  A-Law 2:1
say --file-format wave --data-format=lpcm はろー
Syntax of format strings is: {format|[BE|LE]{F|I|UI}{8|16|24|32|64}}[@sample_rate_hz][/format_flags]
say --file-format wave --data-format=LEI16@48000 -o test.wav -v Otoya はろー

say --file-format lpcm --data-format=LEI16@48000 -o test.wav -v Otoya はろー
say --file-format adts -o test.aac -v Otoya はろー
say -o test.wav --data-format=LEF32@22050 -v Otoya こんにちは
say -o test.wav --data-format=LEI16@48000 -v Otoya こんにちは
say -o test.aac -v Otoya こんにちは

say -o test2.wav --data-format=LEI16@48000 -v Otoya やほ

ffmpeg -i test.wav -i test2.wav -filter_complex "concat=n=2:v=0:a=1" test3.wav
```
