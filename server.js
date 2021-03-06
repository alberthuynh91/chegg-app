const express = require('express');
const bodyParser = require('body-parser');
const { Octokit } = require("@octokit/core");

const isValidAuthKey = (authKey) => {
  return authKey !== "" && authKey !== undefined
}

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/git', async (req, res, next) => {
  let octokit
  const { apiKey: authKey, username } = req.query
  if (isValidAuthKey(authKey)) {
    try {
      // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
        octokit = new Octokit({ auth: authKey });
        const response = await octokit.request('GET /users/{username}/repos', { username })
        res.send({ ...response })
      } catch (error) {
        return next(new Error(error.toString()))
      }
  }
})

app.get('/api/git/issues', async (req, res, next) => {
  let octokit
  const { repo, owner, apiKey: authKey } = req.query
  if (isValidAuthKey(authKey)) {
    try {
        octokit = new Octokit({ auth: authKey });
        const response = await octokit.request('GET /repos/{owner}/{repo}/issues', { owner, repo })
        res.send({ ...response })
      } catch (error) {
        return next(new Error(error.toString()))
      }
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`));