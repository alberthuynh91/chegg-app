import React, {useState, useEffect} from 'react'
import { getRepoName, getOwnerName, formatCreatedDate, formatUpdatedDate } from './utils'
import './App.css';

const Issues = (props) => {
  const { issues } = props
  console.log(`what is issues? : `, issues)
  return (
    issues.length > 0 ? issues.map((issue) => {
      const { id } = issue
      return <Issue key={id} className="issues-container" issue={issue} />
    }) : null
  )
}

const Issue = (props) => {
  const { issue } = props
  const { title, user, created_at, updated_at } = issue
  const { avatar_url } = user
  const created = formatCreatedDate(created_at)
  const updated = formatUpdatedDate(updated_at)
  console.log(`what is issue: `, issue)
  return (
    <div className="issue-item" onClick={() => {}}>
      <div><img className="avatar" src={avatar_url}/></div>
      <div>{title}</div>
      <div>{updated}</div>
      <div>{created}</div>
    </div>
  )
}

const Repository = (props) => {
  const { url, setSelectedRepo, setIssues } = props
  const repo = getRepoName(url)
  const owner = getOwnerName(url)

  const handleClick = (payload) => {
    const { owner, repo } = payload
    fetch(`/api/git/issues?repo=${repo}&owner=${owner}`)
      .then(response => response.json())
      .then(({ data }) => {
        setIssues(data)
      });
    // setSelectedRepo(props)

  }

  
  return (
    <div className="repository-item" onClick={() => { handleClick({ owner, repo }) }}>{repo}</div>
  )
}

const Repositories = (props) => {
  const { repositories, setIssues, setSelectedRepo } = props
  return (
    repositories.length > 0 ? repositories.map((item) => {
      return <Repository {...item} setIssues={setIssues} setSelectedRepo={setSelectedRepo} />
    }) : null
  )
}

const App = () => {

  const [apiKey, setApiKey] = useState('')
  const [repositories, setRepositories] = useState({})
  const [selectedRepo, setSelectedRepo] = useState({})
  const [issues, setIssues] = useState({})

  const handleChange = (event) => {
    setApiKey(event.target.value)
  }

  const fetchRepos = () => {
    fetch('/api/git')
    .then(response => response.json())
    .then(({ data }) => {
      setRepositories(data)
    });
  }

  const handleClick = () => {
    // fetchRepos(apiKey).then((data) => {
    //   setData(data)
    // })
  }

  useEffect(() => {
    fetchRepos()
  }, [])

  console.log(`what is repositories in render? : `, repositories)

  return (
    <div className="App">
      Enter Github API Key
      <input onChange={handleChange}></input>
      <button onChange={handleClick}></button>
      <div>
        <Repositories repositories={repositories} setSelectedRepo={setSelectedRepo} setIssues={setIssues} />
        <Issues issues={issues} />

      </div>
    </div>
    
  );
}

export default App;
