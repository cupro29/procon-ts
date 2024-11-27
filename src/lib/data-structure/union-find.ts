export default class UnionFind {
  private n: number;

  private d: number[];

  constructor(n = 0) {
    this.n = n;
    this.d = new Array(n).fill(-1);
  }

  public leader(v: number): number {
    if (this.d[v] < 0) return v;
    this.d[v] = this.leader(this.d[v]);
    return this.d[v];
  }

  public merge(u: number, v: number): boolean {
    let x = this.leader(u);
    let y = this.leader(v);
    if (x === y) return false;

    if (-this.d[x] < -this.d[y]) {
      [x, y] = [y, x];
    }
    this.d[x] += this.d[y];
    this.d[y] = x;
    return true;
  }

  public same(u: number, v: number): boolean {
    return this.leader(u) === this.leader(v);
  }

  public size(u: number): number {
    return -this.d[this.leader(u)];
  }
}
