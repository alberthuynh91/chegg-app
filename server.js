const express = require('express');
const bodyParser = require('body-parser');
const { Octokit } = require("@octokit/core");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

const authKey = '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'
app.get('/api/git', async (req, res) => {
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new Octokit({ auth: authKey });

  const response = await octokit.request('GET /users/{username}/repos', {
    username: 'alberthuynh91'
  })
  res.send({ ...response })
})

app.get('/api/git/issues', async (req, res) => {
  const { repo, owner } = req.query
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new Octokit({ auth: authKey });
  if (repo, owner) {
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner,
      repo
    })
    res.send({ ...response })
  }
  res.send({ ...response })
})

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));