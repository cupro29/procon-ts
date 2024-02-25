import * as readline from "node:readline";

export default class AsyncReader extends EventTarget {
  private stream;

  private buf: string[] = [];

  constructor() {
    super();
    this.stream = readline.createInterface({ input: process.stdin });

    this.stream.on("line", (line) => {
      this.buf = line.split(/\s+/).reverse().concat(this.buf);
      this.dispatchEvent(new CustomEvent("line"));
    });
  }

  public async str(): Promise<string> {
    if (this.buf.length > 0) return this.buf.pop()!;
    await this.load();
    return this.buf.pop()!;
  }

  public async strs(n: number): Promise<string[]> {
    while (this.buf.length < n) {
      // eslint-disable-next-line no-await-in-loop
      await this.load();
    }

    return Array(n)
      .fill(null)
      .map(() => this.buf.pop()!);
  }

  public async num(): Promise<number> {
    return Number(await this.str());
  }

  public async nums(n: number): Promise<number[]> {
    return (await this.strs(n)).map((val) => Number(val));
  }

  public async bint(): Promise<bigint> {
    return BigInt(await this.str());
  }

  public async bints(n: number): Promise<bigint[]> {
    return (await this.strs(n)).map((val) => BigInt(val));
  }

  public close() {
    this.stream.close();
  }

  private async load() {
    return new Promise((resolve) => {
      this.addEventListener("line", resolve, { once: true });
    });
  }
}
