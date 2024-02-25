import { AsyncReader, BufReader, BufWriter } from "lib/io";

// eslint-disable-next-line
const main = (solve: (rd: BufReader, wt: BufWriter) => void): void => {
  const rd = new BufReader();
  const wt = new BufWriter();
  solve(rd, wt);
  wt.flush();
};

// eslint-disable-next-line
const amain = async (
  solve: (rd: AsyncReader, wt: BufWriter) => Promise<void>,
): Promise<void> => {
  const rd = new AsyncReader();
  const wt = new BufWriter();
  await solve(rd, wt);
  rd.close();
  wt.flush();
};

main((rd, wt) => {});
