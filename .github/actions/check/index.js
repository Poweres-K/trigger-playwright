const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/core");

const run = async () => {
  try {
    const token = core.getInput("TOKEN");
    const branch = core.getInput("branch");

    const octokit = new Octokit({
      auth: token,
    });
    console.log(branch);
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/branches/{branch}",
      {
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        branch,
      }
    );
    console.log(response);
    if (response) {
      return core.setOutput("branch", branch);
    }

    return core.setOutput("branch", "master");
  } catch (error) {
    core.setOutput("branch", "master");
    core.setFailed(error.message);
  }
};

run();
