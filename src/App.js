import React, {useState, useEffect} from 'react'
import { getRepoName, getOwnerName, formatCreatedDate, formatUpdatedDate } from './utils'
import { useDrop } from 'react-dnd'
import './App.css';

//TODO ADD ERROR MESSAGE IF TOKEN IS INVALID

const Issues = (props) => {
  const { issues, setIssues } = props
  console.log(`what is issues? : `, issues)
  if (!issues) {
    return null
  }
  return (
    issues.length > 0 ? issues.map((issue, index) => {
      const { id } = issue
      return <Issue key={id} index={index} className="issues-container" issue={issue} issues={issues} setIssues={setIssues} />
    }) : <div>No issues found for this repository</div>
  )
}

const Issue = (props) => {
  const { issue, issues, setIssues, index } = props
  const { title, user, created_at, updated_at } = issue
  const { avatar_url } = user
  const created = formatCreatedDate(created_at)
  const updated = formatUpdatedDate(updated_at)
  console.log(`what is issues: `, issues)

  const handleUp = () => {
    const cpIssues = [...issues]
    const newIndex = index === 0 ? index : index - 1 
    cpIssues.splice(index, 1)
    cpIssues.splice(newIndex, 0, issue)
    setIssues(cpIssues)
  }

  const handleDown = () => {
    const cpIssues = [...issues]
    const newIndex = index === cpIssues.length - 1 ? index : index + 1
    cpIssues.splice(index, 1)
    cpIssues.splice(newIndex, 0, issue)
    setIssues(cpIssues)
  }

  return (
    <div className="issue-item" onClick={() => {}}>
      <div><img className="avatar" src={avatar_url}/></div>
      <div>{title}</div>
      <div>{updated}</div>
      <div>{created}</div>
      <div>
        <button onClick={handleUp}>Move up</button>
        <button onClick={handleDown}>Move down</button>
      </div>
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
  const [issues, setIssues] = useState(undefined)

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
      <div className="row">
        <div className='column'>
          <Repositories repositories={repositories} setSelectedRepo={setSelectedRepo} setIssues={setIssues} />
        </div>
        <div className='column'>
          <Issues issues={issues} setIssues={setIssues} />
        </div>
      </div>
    </div>
    
  );
}

export default App;
