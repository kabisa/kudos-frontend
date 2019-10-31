import { tokenIsUsable } from "../../../../src/support/tokenIsUsable";

const TOKEN_STRING =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwiZXhwaXJlc19pbiI6MTU3MjUzMTg4MH0.Cq1OL8HYiar-LR94QwC7PqdcWC4tFQSznRq9V5n5KZU";
const TOKEN_EXPIRES_IN = 1572531880 * 1000;

const seconds = seconds => {
  return seconds * 1000;
};

const minutes = minutes => {
  return minutes * seconds(60);
};

const hours = hours => {
  return hours * minutes(60);
};

describe("tokenIsUsable", () => {
  describe("when given null", () => {
    it("returns false", () => {
      expect(tokenIsUsable(null, new Date(TOKEN_EXPIRES_IN - hours(2)))).to.be
        .false;
    });
  });

  describe("when given invalid JWT string", () => {
    it("returns false", () => {
      expect(tokenIsUsable("invalid", new Date(TOKEN_EXPIRES_IN - hours(2)))).to
        .be.false;
    });
  });

  describe("when token expires in more than a minute", () => {
    it("returns true", () => {
      expect(tokenIsUsable(TOKEN_STRING, new Date(TOKEN_EXPIRES_IN - hours(2))))
        .to.be.true;
    });
  });

  describe("when token expires this minute", () => {
    it("returns false", () => {
      expect(
        tokenIsUsable(TOKEN_STRING, new Date(TOKEN_EXPIRES_IN - seconds(30)))
      ).to.be.false;
    });
  });

  describe("when token has expired", () => {
    it("returns false", () => {
      expect(tokenIsUsable(TOKEN_STRING, new Date(TOKEN_EXPIRES_IN + hours(2))))
        .to.be.false;
    });
  });
});
