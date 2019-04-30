#!/usr/bin/env node

// const atocha = require("atocha");
const listr = require("listr");

const time = () => new Date().toISOString();

const swear = require("swear");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

const atocha = (command, buffer = 10) => {
  const maxBuffer = buffer * 1024 * 1024;
  return swear(
    exec(command, { maxBuffer }).then(out => {
      console.log(out.stderr);
      if (out.stderr) throw new Error(out.stderr);
      return out.stdout.trim();
    })
  );
};

(async () => {
  try {
    await atocha(`git add . -A`);
    await atocha(`git commit -m "Commited on ${time()}"`);
    await atocha(`git pull origin master`).catch(() => {});
    await atocha(`git push`);
  } catch (error) {
    console.log(error);
  }
})();

const tasks = new listr([
  {
    title: "Adding",
    task: async () => await atocha(`git add . -A`)
  },
  {
    title: "Commiting",
    task: async () => await atocha(`git commit -m "Commited on ${time()}"`)
  },
  {
    title: "Pulling from master",
    task: async () =>
      await atocha(`git pull origin master`).catch(err => {
        // Accept this "error"
        if (/\* branch\s+master\s+-> FETCH_HEAD/.test(err.message)) return;
        throw err;
      })
  },
  {
    title: "Pushing",
    task: async () => await atocha(`git push`)
  }
]);

tasks.run().catch(err => {
  console.error("ERROR:", err);
});
