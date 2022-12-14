import { Parser } from "./block.js";

describe("Parser", () => {
  it("parses paragraphs", () => {
    let events = [];
    for (const event of new Parser("hello *world*\n\nfoo", () => {})) {
      events.push(event);
    }
    expect(events).toStrictEqual([
      { startpos: 0, endpos: 0, annot: "+para" },
      { startpos: 0, endpos: 5, annot: "str" },
      { startpos: 6, endpos: 6, annot: "+strong" },
      { startpos: 7, endpos: 11, annot: "str" },
      { startpos: 12, endpos: 12, annot: "-strong" },
      { startpos: 13, endpos: 13, annot: "-para" },
      { startpos: 14, endpos: 14, annot: "blankline" },
      { startpos: 15, endpos: 15, annot: "+para" },
      { startpos: 15, endpos: 17, annot: "str" },
      { startpos: 18, endpos: 18, annot: "-para" }
    ]);
  });

  it("parses blockquotes", () => {
    let events = [];
    for (const event of new Parser("> hello\n> there\nlazy\n>\n> hi\n", () => {})) {
      //                            01234567 89012345 67890 12 345678
      events.push(event);
    }
    expect(events).toStrictEqual([
      { startpos: 0, endpos: 0, annot: "+blockquote" },
      { startpos: 2, endpos: 2, annot: "+para" },
      { startpos: 2, endpos: 6, annot: "str" },
      { startpos: 7, endpos: 7, annot: "softbreak" },
      { startpos: 10, endpos: 14, annot: "str" },
      { startpos: 15, endpos: 15, annot: "softbreak" },
      { startpos: 16, endpos: 19, annot: "str" },
      { startpos: 21, endpos: 21, annot: "-para" },
      { startpos: 22, endpos: 22, annot: "blankline" },
      { startpos: 25, endpos: 25, annot: "+para" },
      { startpos: 25, endpos: 26, annot: "str" },
      { startpos: 27, endpos: 27, annot: "-para" },
      { startpos: 28, endpos: 28, annot: "-blockquote" }
    ]);
  });


});

