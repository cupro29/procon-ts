const bitCeil = (n: number): number => {
  let x = 1;
  while (x < n) x *= 2;
  return x;
};

export default abstract class SegmentTree<T> {
  private n;

  private size: number;

  private log: number;

  private d: T[];

  constructor(n: number);

  constructor(a: T[]);

  constructor(arg: number | T[]) {
    if (typeof arg === "number") {
      this.n = arg;
      this.size = bitCeil(arg);
      this.log = Math.ceil(Math.log2(this.size));
      this.d = Array(this.size * 2).fill(this.e());
    } else {
      this.n = arg.length;
      this.size = bitCeil(arg.length);
      this.log = Math.ceil(Math.log2(this.size));
      this.d = Array(this.size * 2).fill(this.e());
      for (let i = 0; i < arg.length; i++) {
        this.d[this.size + i] = arg[i];
      }
      for (let i = this.size - 1; i > 0; i--) {
        this.d[i] = this.op(this.d[i * 2], this.d[i * 2 + 1]);
      }
    }
  }

  abstract e(): T;

  abstract op(l: T, r: T): T;

  set(p: number, x: T): void {
    let i = p + this.size;
    this.d[i] = x;
    for (i >>= 1; i > 0; i >>= 1) {
      this.d[i] = this.op(this.d[i * 2], this.d[i * 2 + 1]);
    }
  }

  get(p: number): T {
    return this.d[p + this.size];
  }

  prod(l: number, r: number): T {
    let sml = this.e();
    let smr = this.e();
    let li = l + this.size;
    let ri = r + this.size;
    while (li < ri) {
      if (li & 1) sml = this.op(sml, this.d[li++]);
      if (ri & 1) smr = this.op(this.d[--ri], smr);
      li >>= 1;
      ri >>= 1;
    }
    return this.op(sml, smr);
  }

  allProd(): T {
    return this.d[1];
  }

  maxRight(l: number, f: (x: T) => boolean): number {
    if (l === this.n) return this.n;
    let li = l + this.size;
    let sm = this.e();
    do {
      while (~li & 1) li >>= 1;
      if (!f(this.op(sm, this.d[li]))) {
        while (li < this.size) {
          li <<= 1;
          const cur = this.op(sm, this.d[li]);
          if (f(cur)) {
            sm = cur;
            li++;
          }
        }
        return li - this.size;
      }
      sm = this.op(sm, this.d[li]);
      li++;
    } while ((li & -li) !== li);
    return this.n;
  }

  minLeft(r: number, f: (x: T) => boolean): number {
    if (r === 0) return 0;
    let ri = r + this.size;
    let sm = this.e();
    do {
      ri--;
      while (ri > 1 && ri & 1) ri >>= 1;
      if (!f(this.op(this.d[ri], sm))) {
        while (ri < this.size) {
          ri = (ri << 1) | 1;
          const cur = this.op(this.d[ri], sm);
          if (f(cur)) {
            sm = cur;
            ri--;
          }
        }
        return ri + 1 - this.size;
      }
      sm = this.op(this.d[ri], sm);
    } while ((ri & -ri) !== ri);
    return 0;
  }
}
