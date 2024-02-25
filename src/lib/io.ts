import * as fs from "node:fs";

type Writable = string | number | bigint;

export default class ProconIO {
  private readonly inputSource: string;

  private inputBuf: string[];

  private outputBuf: string;

  constructor(inputSource: string = "/dev/stdin") {
    this.inputSource = inputSource;
    this.inputBuf = [];
    this.outputBuf = "";
  }

  public readStr(): string {
    if (this.inputBuf.length === 0) this.load();
    return this.inputBuf.pop()!;
  }

  public readInt(): number {
    return this.readNumber();
  }

  public readNumber(): number {
    return Number(this.readStr());
  }

  public readBigInt(): bigint {
    if (this.inputBuf.length === 0) this.load();
    return BigInt(this.readStr());
  }

  public write(value: Writable | Writable[], sep: string = " "): void {
    if (Array.isArray(value)) {
      value.forEach((val, index) => {
        this.outputBuf = this.outputBuf.concat(val.toString());
        if (index < value.length - 1) {
          this.outputBuf = this.outputBuf.concat(sep);
        }
      });
    } else {
      this.outputBuf = this.outputBuf.concat(value.toString());
    }
  }

  public writeln(value: Writable | Writable[], sep: string = " "): void {
    this.write(value, sep);
    this.write("\n");
  }

  public yn(flag: boolean): void {
    if (flag) {
      this.yes();
    } else {
      this.no();
    }
  }

  public yes(): void {
    this.write("Yes\n");
  }

  public no(): void {
    this.write("No\n");
  }

  public flush(): void {
    if (this.outputBuf.length === 0) return;
    console.log(this.outputBuf);
    this.outputBuf = "";
  }

  private load() {
    const str = fs.readFileSync(this.inputSource, "utf-8");
    const newBuf = str.split(/\s+/).reverse();
    this.inputBuf = newBuf.concat(this.inputBuf);
  }
}
