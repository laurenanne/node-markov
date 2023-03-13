/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      if (chains.has(this.words[i])) {
        if (this.words[i + 1] === undefined) {
          chains.get(this.words[i]).push(null);
        } else {
          chains.get(this.words[i]).push(this.words[i + 1]);
        }
      } else {
        if (this.words[i + 1] === undefined) {
          chains.set(this.words[i], [null]);
        } else {
          chains.set(this.words[i], [this.words[i + 1]]);
        }
      }
    }
    this.chains = chains;
  }

  /** return random text from chains */
  makeText(numWords = 100) {
    let str = "";
    let num = Math.floor(Math.random() * this.words.length);
    let firstWord = this.words[num];
    str += firstWord;

    for (let i = 1; i < numWords; i++) {
      let nextWordArr = this.chains.get(firstWord);
      let randomVal = Math.floor(Math.random() * nextWordArr.length);
      let nextWord = nextWordArr[randomVal];
      if (nextWord === null) {
        return str;
      } else {
        str = str + " " + nextWord;
      }
      firstWord = nextWord;
    }
    return str;
  }
}

module.exports = {
  MarkovMachine,
};
