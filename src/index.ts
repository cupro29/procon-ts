import { AsyncReader, BufReader, BufWriter, type Writable } from "lib/io";
import { permutations, range } from "lib/utils";

// #region template
const main = (solve: (rd: BufReader, wt: BufWriter) => Writable | Writable[] | boolean | void): void => {
  const rd = new BufReader();
  const wt = new BufWriter();
  const res = solve(rd, wt);
  if (typeof res === "boolean") {
    wt.yn(res);
  } else if (res !== undefined) {
    wt.write(res);
  }
  wt.flush();
};

const amain = async (
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

// #endregion

main((rd, wt) => {});
