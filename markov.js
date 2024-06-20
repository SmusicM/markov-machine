/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    //empty object
    this.madechain = {}
    for(let i =0;i<this.words.length;i++){
      //curr word from words
      let singleWord = this.words[i]
      //gets next word in line to singleword
      let nextWord = this.words[i+1]
      //if current single word is not in our object , return with empty arr
      if(!(singleWord in this.madechain)){
        this.madechain[singleWord] = []
      }
      //pushes nextword inline onto madechain
      this.madechain[singleWord].push(nextWord)
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    //get all keys from madechain object
    const keys = Object.keys(this.madechain)
    //empty arr for storing put together words
    let textchain = [];
    //gets random key word by objects keys length to ensure its within its possible boundries of arr of keys
    let key = keys[Math.floor(Math.random()*keys.length)]
    //while text arr length is less than specified amount and not null push onto textchain arr
    while(textchain.length < numWords && key != null){
      //push key onto the textchain aka our empty arr for the sentence
      textchain.push(key)
      //next word is staged for index of made chain of possible words
      let nextWordText = this.madechain[key]
      //sets key to next word , at a random index by the length of itself
      key = nextWordText[Math.floor(Math.random() * nextWordText.length)]
    }
    //joins with spaces
    return textchain.join(" ")
  }
 
}
module.exports ={MarkovMachine}

