const markov = require("./markov");

describe("test make chains", function () {
  let text = "the cat in the hat";
  let mm = new markov.MarkovMachine(text);

  test("gets correct chain", function () {
    let output = mm.chains.get("the");
    expect(output).toEqual(["cat", "hat"]);
  });

  test("gets null", function () {
    let output = mm.chains.get("hat");
    expect(output).toEqual([null]);
  });
});

describe("test make text", function () {
  let text = "the cat in the hat";
  let mm = new markov.MarkovMachine(text);

  test("gets any string", function () {
    let output = mm.makeText();
    expect(output).toEqual(expect.any(String));
  });
});
