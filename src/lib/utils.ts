export const bsearch = <T>(arr: T[], isOk: (x: T) => boolean): number => {
  let [ok, ng] = [0, arr.length];
  while (ng - ok > 1) {
    const mid = (ok + ng) >> 1;
    if (isOk(arr[mid])) {
      ok = mid;
    } else {
      ng = mid;
    }
  }
  return ok;
};

export const rle = <T>(arr: ArrayLike<T>): [T, number][] => {
  const res: [T, number][] = [];
  for (let i = 0; i < arr.length; i++) {
    if (res.at(-1)?.[0] === arr[i]) {
      res.at(-1)![1]++;
    } else {
      res.push([arr[i], 1]);
    }
  }
  return res;
};

export function* gridAdjacent(
  x: number,
  y: number,
  H: number,
  W?: number,
): Generator<[number, number]> {
  if (x > 0) yield [x - 1, y];
  if (x < H - 1) yield [x + 1, y];
  if (y > 0) yield [x, y - 1];
  if (y < (W ?? H) - 1) yield [x, y + 1];
}
