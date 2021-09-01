import React, {useState, useEffect} from 'react'
import Repositories from './components/Repositories'
import Issues from './components/Issues'
import ErrorMsg from './components/ErrorMsg'
import Spinner from './components/Spinner'
import Form from './components/Form'
import './App.css';

const initialFormData = {
  apiKey: ''
}

const App = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [repositories, setRepositories] = useState({})
  const [selectedRepo, setSelectedRepo] = useState({})
  const [issues, setIssues] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [isFetching, setIsFetching] = useState(false)

  const fetchRepos = (apiKey) => {
    if (apiKey !== '' && apiKey !== undefined) {
      setIsFetching(true)
      fetch(`/api/git?apiKey=${apiKey}`)
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error('Oops! Try a different API key!')
          }
        })
        .then(({ data }) => {
          setError(undefined)
          setRepositories(data)
        })
        .catch((error) => {
          setError(error)
        })
        .finally(() => {
          setIsFetching(false)
        })
    }
  }

  const handleSubmit = () => {
    const { apiKey } = formData
    fetchRepos(apiKey)
  }

  const handleClear = () => {
    setFormData(initialFormData)
    setRepositories({})
    setSelectedRepo({})
    setIssues(undefined)
    setError(undefined)
    setIsFetching(false)
    localStorage.removeItem('cachedState')
  }

  useEffect(() => {
    const cachedState = window.localStorage.getItem('cachedState')
    if (cachedState !== 'undefined' && cachedState !== null) {
      const state = JSON.parse(cachedState)
      setFormData(state.formData)
      setRepositories(state.repositories)
      setSelectedRepo(state.selectedRepo)
      setIssues(state.issues)
    }
  }, []);

  useEffect(() => {
    const state = {
      formData,
      repositories,
      selectedRepo,
      issues
    }
    if (issues !== undefined) {
      window.localStorage.setItem('cachedState', JSON.stringify(state));
    }
  }, [issues]);

  useEffect(() => {
    fetchRepos()
  }, [])
  
  return (
    <div className="App">
      <Form
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        error={error}
      />  
      { isFetching ?
          <Spinner />
          : 
          <div className="content-container">
            <div className="content-row">
              <div className="content-left">
                <Repositories
                  formData={formData}
                  repositories={repositories}
                  setIssues={setIssues}
                  selectedRepo={selectedRepo}
                  setSelectedRepo={setSelectedRepo}
                />
              </div>
              <div className="content-right">
                <Issues issues={issues} setIssues={setIssues} />
              </div>
            </div>
          </div>
      }
    </div>
  );
}

export default App;
