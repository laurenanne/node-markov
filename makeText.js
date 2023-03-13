/** Command-line tool to generate Markov text. */

const fs = require("fs");
const process = require("process");
const axios = require("axios");
const markov = require("./markov");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(`Generated text from file ${path}`);
      let mm = new markov.MarkovMachine(data);
      console.log(mm.makeText());
    }
  });
}

async function webCat(url) {
  try {
    let resp = await axios.get(url);
    console.log(`Generated text from url ${url}`);
    let mm = new markov.MarkovMachine(resp.data);
    console.log(mm.makeText());
  } catch (err) {
    console.log(`Error fetching ${url}: ${err}`);
  }
}

if (process.argv[2] === "url") {
  webCat(process.argv[3]);
} else {
  cat(process.argv[3]);
}
