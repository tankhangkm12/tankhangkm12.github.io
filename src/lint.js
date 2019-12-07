const cmd = require("atocha");
const { read } = require("files");

module.exports = cli => ({
  title: "Linting",
  skip: async ctx => {
    if (!ctx.pkg.scripts.lint || ctx.pkg.scripts.linter) return true;
  },
  task: async ctx => {
    return await cmd(ctx.pkg.scripts.lint || ctx.pkg.scripts.linter);
  }
});
