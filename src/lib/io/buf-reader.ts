import * as fs from "node:fs";

export default class BufReader {
  private buf: string[];

  constructor(inputSource = process.stdin.fd) {
    this.buf = fs.readFileSync(inputSource, "utf8").split(/\s+/).reverse();
  }

  public str(): string {
    return this.buf.pop()!;
  }

  public strs(n: number): string[] {
    return Array(n)
      .fill(null)
      .map(() => this.str());
  }

  public num(): number {
    return Number(this.buf.pop()!);
  }

  public nums(n: number): number[] {
    return Array(n)
      .fill(null)
      .map(() => this.num());
  }

  public bint(): bigint {
    return BigInt(this.buf.pop()!);
  }

  public bints(n: number): bigint[] {
    return Array(n)
      .fill(null)
      .map(() => this.bint());
  }
}
