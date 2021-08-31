import React, {useState, useEffect} from 'react'
import Repositories from './components/Repositories'
import Issues from './components/Issues'
import ErrorMsg from './components/ErrorMsg'
import Spinner from './components/Spinner'
import './App.css';

const App = () => {
  const [apiKey, setApiKey] = useState('')
  const [repositories, setRepositories] = useState({})
  const [selectedRepo, setSelectedRepo] = useState({})
  const [issues, setIssues] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [isFetching, setIsFetching] = useState(false)

  const handleChange = (event) => {
    setApiKey(event.target.value)
  }

  const fetchRepos = (apiKey) => {
    setIsFetching(true)
    console.log(`what is apiKey in fetchRepos: `, apiKey)
    if (apiKey !== '' && apiKey !== undefined) {
      fetch(`/api/git?apiKey=${apiKey}`)
        .then((res) => {
          console.log(`what is res? : `, res)
          if (res.ok) {
            return res.json()
          } else {
            throw new Error('Oops! Try a different API key!')
          }
        })
        .then(({ data }) => {
          console.log(`setting repositories: `, data)
          setError(undefined)
          setRepositories(data)
          setIsFetching(false)
        })
        .catch((error) => {
          console.log(`error getting api key: `, error)
          setError(error)
          setIsFetching(false)
        })
        //.finally(() => {})
    }
  }

  const handleSubmit = () => {
    console.log(`fetching with: `, apiKey)
    fetchRepos(apiKey)
  }

  const handleClear = () => {
    setApiKey('')
    setRepositories({})
    setSelectedRepo({})
    setIssues(undefined)
    setError(undefined)
    setIsFetching(false)
    localStorage.removeItem('cachedState')
  }

  useEffect(() => {
    const cachedState = window.localStorage.getItem('cachedState')
    // console.log(`what is cachedIssue? : `, cachedIssue)
    if (cachedState !== 'undefined' && cachedState !== null) {
      // console.log(`inside cachedIssue: `, cachedIssue)
      const state = JSON.parse(cachedState)
      console.log(`what is cachedState: `, cachedState)
      console.log(`what is state: `, state)
      setApiKey(state.apiKey)
      setRepositories(state.repositories)
      setSelectedRepo(state.selectedRepo)
      setIssues(state.issues)
    }
  }, []);

  useEffect(() => {
    const state = {
      apiKey,
      repositories,
      selectedRepo,
      issues
    }
    console.log(`what is state in useEffect? : `, state, issues)
    if (issues !== undefined) {
      console.log(`>>>>> setting state in localStorage`)
      window.localStorage.setItem('cachedState', JSON.stringify(state));
    }
    
  }, [issues]);

  useEffect(() => {
    fetchRepos()
  }, [])

  console.log(`what is error in render: `, error)
  
  return (
    <div className="App">
      Enter Github API Key
      <input value={apiKey} onChange={handleChange}></input>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleClear}>Clear</button>
      { isFetching ?
      
          <Spinner />
          : 
          <div>
            { error?.message ? 
              <ErrorMsg message={error} />
              : 
              <div className="row">
                <div className='column'>
                  <Repositories
                    apiKey={apiKey}
                    repositories={repositories}
                    setSelectedRepo={setSelectedRepo}
                    setIssues={setIssues}
                    setIsFetching={setIsFetching}
                  />
                </div>
                <div className='column'>
                  <Issues issues={issues} setIssues={setIssues} />
                </div>
              </div>
            }
          </div>
      }
      
      
    </div>
    
  );
}

export default App;
