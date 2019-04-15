#!/usr/bin/env node

const lib = require("./lib");

const argv = process.argv.splice(2);

main(argv);

async function main(argv) {
  const res = await lib.getCommits(...argv);
  console.log(res.output);
}
