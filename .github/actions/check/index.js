const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/core");

const run = async () => {
  try {
    const token = core.getInput("TOKEN");

    // const octokit = github.getOctokit(token);

    const octokit = new Octokit({
      auth: token,
    });

    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/branches/{branch}",
      {
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        branch: "test",
      }
    );

    core.setOutput("branch", JSON.stringify(response.data));
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
