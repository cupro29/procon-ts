import { AsyncReader, BufReader, BufWriter, Writable } from "lib/io";

// #region template
// eslint-disable-next-line
const main = (
  solve: (rd: BufReader, wt: BufWriter) => Writable | Writable[] | void,
): void => {
  const rd = new BufReader();
  const wt = new BufWriter();
  const res = solve(rd, wt);
  if (res !== undefined) {
    wt.write(res);
  }
  wt.flush();
};

// eslint-disable-next-line
const amain = async (
  solve: (
    rd: AsyncReader,
    wt: BufWriter,
  ) => Promise<Writable | Writable[] | void>,
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
