#!/usr/bin/env node

const { table, getBorderCharacters } = require("table");
const Octokit = require("@octokit/rest");

const IGNORE_AUTHOR_NAMES = ["dependabot[bot]", "greenkeeper[bot]", "Renovate Bot"];
const IGNORE_COMMITER_NAMES = ["Mozilla Pontoon", "GitHub"];

const argv = process.argv.splice(2);
const octokit = new Octokit();

main(...argv);

async function main(owner, repo, maxCommits, page=1) {
  if (!owner || !repo) {
    console.error(
      "Missing `owner` or `repo`.\nUSAGE: `node index {owner} {repo}"
    );
    process.exit(1);
    return;
  }

  try {
    const res = await getCommits(owner, repo, page);
    const commits = filterCommits(res.data, maxCommits);
    const output = formatCommits(commits);
    console.log(output);
    if (!maxCommits) {
      console.log(`${commits.length} / ${res.data.length}`);
    }
  } catch (err) {
    console.error(err);
    process.exit(3);
  }
}

async function getCommits(owner, repo, page = 1) {
  try {
    return await octokit.repos.listCommits({
      owner,
      repo,
      page,
      per_page: 100
    });
  } catch (err) {
    console.error(`${err.message}: ${err.request && err.request.url}`);
    process.exit(2);
  }
}

function filterCommits(commits = [], maxCommits = -1) {
  let res = commits.filter(({ commit }) => {
    if (commit.message.startsWith("Pontoon: ")) {
      return false;
    }
    return !(
      IGNORE_AUTHOR_NAMES.includes(commit.author.name) ||
      IGNORE_COMMITER_NAMES.includes(commit.committer.name)
    );
  });
  if (maxCommits > 0) {
    return res.slice(0, maxCommits);
  }
  return res;
}

function formatCommits(commits = []) {
  const data = commits.map(commit => {
    let message = commit.commit.message.replace(/\s+/g, " ").trim();
    if (message.length > 80) {
      message = `${message.substr(0, 80)}...`;
    }
    return [
      new Date(commit.commit.author.date).toLocaleDateString(),
      commit.commit.author.name,
      message
    ];
  });

  const config = {
    border: getBorderCharacters("void"),
    drawHorizontalLine: () => false
  };
  return table(data, config);
}
