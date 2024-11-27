const defaultCompare = <T>(l: T, r: T): boolean => l < r;
export default class BinaryHeap<T> {
  private d: T[] = [];

  private compare: (l: T, r: T) => boolean;

  constructor({ compare } = { compare: defaultCompare<T> }) {
    this.compare = compare;
  }

  public get length(): number {
    return this.d.length;
  }

  public get top(): T {
    return this.d[0];
  }

  public push(val: T): void {
    this.d.push(val);
    for (let i = this.length; i > 1; i >>= 1) {
      if (this.compare(this.d[(i >> 1) - 1], this.d[i - 1])) break;
      this.swap(i - 1, (i >> 1) - 1);
    }
  }

  public pop(): T | undefined {
    if (this.length <= 1) return this.d.pop();
    const res = this.d[0];
    const last = this.d.pop()!;
    this.d[0] = last;
    let i = 1;
    while (true) {
      if (
        i * 2 <= this.length &&
        this.compare(this.d[i * 2 - 1], this.d[i - 1]) &&
        (i * 2 === this.length || this.compare(this.d[i * 2 - 1], this.d[i * 2]))
      ) {
        this.swap(i - 1, i * 2 - 1);
        i *= 2;
      } else if (i * 2 + 1 <= this.length && this.compare(this.d[i * 2], this.d[i - 1])) {
        this.swap(i - 1, i * 2);
        i = i * 2 + 1;
      } else {
        break;
      }
    }
    return res;
  }

  private swap(i: number, j: number): void {
    const tmp = this.d[i];
    this.d[i] = this.d[j];
    this.d[j] = tmp;
  }
}
