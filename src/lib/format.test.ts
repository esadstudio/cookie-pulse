import { describe, expect, it } from "vitest";
import { formatLamports, formatTokenAmount, shortenAddress } from "./format";

describe("shortenAddress", () => {
  it("keeps short values intact", () => {
    expect(shortenAddress("abcd")).toBe("abcd");
  });

  it("truncates long public keys", () => {
    expect(shortenAddress("5Yy5RMNr1E8jpcd4cvdSgParawfyynhTLjTDMUcE4DP7")).toBe(
      "5Yy5…4DP7",
    );
  });
});

describe("formatLamports", () => {
  it("formats whole COOK amounts", () => {
    expect(formatLamports(1_500_000_000)).toBe("1.5");
  });

  it("formats dust using the requested fraction digits", () => {
    expect(formatLamports(1)).toBe("0");
    expect(formatLamports(1, 9)).toBe("0.000000001");
  });
});

describe("formatTokenAmount", () => {
  it("applies decimals to raw token amounts", () => {
    expect(formatTokenAmount("1500000", 6)).toBe("1.5");
  });

  it("returns the raw amount when decimals are zero", () => {
    expect(formatTokenAmount("42", 0)).toBe("42");
  });
});
