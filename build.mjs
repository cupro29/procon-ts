import * as esbuild from "esbuild";

async function main() {
  await esbuild.build({
    entryPoints: ["./src/index.ts"],
    outfile: "./a.out.js",
    bundle: true,
    minify: true,
    platform: "node",
    target: "node18.16",
  });
}

main();
