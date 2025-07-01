import { AsyncReader, BufReader, BufWriter, type Writable } from "./io";

export const main = (solve: (rd: BufReader, wt: BufWriter) => Writable | Writable[] | boolean | void): void => {
  const rd = new BufReader();
  using wt = new BufWriter();
  const res = solve(rd, wt);
  if (typeof res === "boolean") {
    wt.yn(res);
  } else if (res !== undefined) {
    wt.write(res);
  }
};

export const amain = async (
  solve: (rd: AsyncReader, wt: BufWriter) => Promise<Writable | Writable[] | void>,
): Promise<void> => {
  const rd = new AsyncReader();
  const wt = new BufWriter();
  const res = await solve(rd, wt);
  if (res !== undefined) {
    wt.write(res);
  }
  rd.close();
  wt.flush();
};
