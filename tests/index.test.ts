import { expect } from "chai";
import { namehash, normalize } from "../src";

describe("testing 'index' file", () => {
  describe("'normalize' function", () => {
    it("should ok", () => {
      const tests: [string, [boolean, string]][] = [
        ["1234.seedao", [true, "1234.seedao"]],
        ["1234ab.seedao", [true, "1234ab.seedao"]],
        ["abcd.seedao", [true, "abcd.seedao"]],
        ["AbcD.seedao", [true, "abcd.seedao"]],
        ["!abc", [true, "!abc"]],
        ["$abc", [true, "$abc"]],
        ["(abc", [true, "(abc"]],
        [")abc", [true, ")abc"]],
        ["*abc", [true, "*abc"]],
        ["+abc", [true, "+abc"]],
        ["-abc", [true, "-abc"]],
        ["_abc", [true, "_abc"]],
        //
        ["#abc", [false, ""]],
        ["%abc", [false, ""]],
        ["'abc", [false, ""]],
        [":abc", [false, ""]],
        ["@abc", [false, ""]],
        ["[abc", [false, ""]],
        ["<abc", [false, ""]],
        ["{abc", [false, ""]],
        ["|abc", [false, ""]],
      ];
      for (const tt of tests) {
        expect(normalize(tt[0])).to.eql([tt[1][0], tt[1][1]]);
      }
    });
  });

  describe("'namehash' function", () => {
    it("should ok", () => {
      const tests: [string, string][] = [
        [
          "seedao",
          "0x5e55419d79fa352b3401db837903c9d6425f83393880fd079b57ad5f232def51",
        ],
        [
          "baiyu.seedao",
          "0xf6f4c6b561092c29a877e94011088977faca0eaddc5654d0f036599de86bcdc4",
        ],
      ];

      for (const test of tests) {
        expect(namehash(test[0])).to.be.equal(test[1]);
      }
    });
  });
});
