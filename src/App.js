import React, {useState, useEffect} from 'react'
import Repositories from './components/Repositories'
import Issues from './components/Issues'
import Spinner from './components/Spinner'
import Form from './components/Form'
import './App.css';

const initialFormData = {
  apiKey: ''
}

const defaultUserName = 'alberthuynh91'

const App = (props) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object && Object.fromEntries && Object.fromEntries(urlSearchParams.entries()) || {}
  const { username = defaultUserName } = params
  const [formData, setFormData] = useState(props.formData || initialFormData)
  const [repositories, setRepositories] = useState(props.repositories)
  const [selectedRepo, setSelectedRepo] = useState('')
  const [issues, setIssues] = useState(props.issues || undefined)
  const [error, setError] = useState(undefined)
  const [isFetching, setIsFetching] = useState(false)
  const [userName, setUserName] = useState(username)
  const fetchRepos = (apiKey) => {
    if (apiKey !== '' && apiKey !== undefined) {
      setIsFetching(true)
      fetch(`/api/git?apiKey=${apiKey}&username=${userName}`)
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
          handleInvalidInput()
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

  const handleInvalidInput = () => {
    setRepositories(undefined)
    setSelectedRepo({})
    setIssues(undefined)
    localStorage.removeItem('cachedState')
  }

  const handleClear = () => {
    setFormData(initialFormData)
    setRepositories(undefined)
    setSelectedRepo({})
    setIssues(undefined)
    setError(undefined)
    setIsFetching(false)
    setUserName(defaultUserName)
    localStorage.removeItem('cachedState')
    window.location.replace('/')
  }

  useEffect(() => {
    const cachedState = window.localStorage.getItem('cachedState')
    if (cachedState !== 'undefined' && cachedState !== null) {
      const state = JSON.parse(cachedState)
      if (state.userName === userName) {
        setFormData(state.formData)
        setRepositories(state.repositories)
        setSelectedRepo(state.selectedRepo)
        setIssues(state.issues)
        setUserName(state.userName)
      }
    }
  }, []);

  useEffect(() => {
    const state = {
      formData,
      repositories,
      selectedRepo,
      issues,
      userName
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
