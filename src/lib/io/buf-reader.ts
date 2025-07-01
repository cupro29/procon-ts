import * as fs from "node:fs";

type Tuple<T, C extends number> = C extends 0
  ? []
  : C extends 1
    ? [T]
    : C extends 2
      ? [T, T]
      : C extends 3
        ? [T, T, T]
        : C extends 4
          ? [T, T, T, T]
          : C extends 5
            ? [T, T, T, T, T]
            : C extends 6
              ? [T, T, T, T, T, T]
              : C extends 7
                ? [T, T, T, T, T, T, T]
                : C extends 8
                  ? [T, T, T, T, T, T, T, T]
                  : C extends 9
                    ? [T, T, T, T, T, T, T, T, T]
                    : C extends 10
                      ? [T, T, T, T, T, T, T, T, T, T]
                      : T[];

export default class BufReader {
  private buf: string[];

  constructor(inputSource = "/dev/stdin") {
    this.buf = fs.readFileSync(inputSource, "utf8").split(/\s+/).reverse();
  }

  public get str(): string {
    return this.buf.pop()!;
  }

  public strs<C extends number>(n: C): Tuple<string, C> {
    return Array(n)
      .fill(null)
      .map(() => this.str) as Tuple<string, C>;
  }

  public get num(): number {
    return Number(this.buf.pop()!);
  }

  public nums<C extends number>(n: C): Tuple<number, C> {
    return Array(n)
      .fill(null)
      .map(() => this.num) as Tuple<number, C>;
  }

  public num2d<C extends number, D extends number>(n: C, m: D): Tuple<Tuple<number, D>, C> {
    return Array(n)
      .fill(null)
      .map(() => this.nums(m)) as Tuple<Tuple<number, D>, C>;
  }

  public get int(): number {
    return this.num;
  }

  public ints = this.nums;

  public int2d = this.num2d;

  public get ind(): number {
    return this.num - 1;
  }

  public inds<C extends number>(n: C): Tuple<number, C> {
    return Array(n)
      .fill(null)
      .map(() => this.ind) as Tuple<number, C>;
  }

  public ind2d<C extends number, D extends number>(n: C, m: D): Tuple<Tuple<number, D>, C> {
    return Array(n)
      .fill(null)
      .map(() => this.inds(m)) as Tuple<Tuple<number, D>, C>;
  }

  public get bint(): bigint {
    return BigInt(this.buf.pop()!);
  }

  public bints<C extends number>(n: C): Tuple<bigint, C> {
    return Array(n)
      .fill(null)
      .map(() => this.bint) as Tuple<bigint, C>;
  }

  public bint2d<C extends number, D extends number>(n: C, m: D): Tuple<Tuple<bigint, D>, C> {
    return Array(n)
      .fill(null)
      .map(() => this.bints(m)) as Tuple<Tuple<bigint, D>, C>;
  }
}
