import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';

const App = () => {

  const [apiKey, setApiKey] = useState('')
  const [data, setData] = useState({})

  const handleChange = (event) => {
    console.log(`what is event: `, event)
    console.log(`what is event.target.value: `, event.target.value)
    setApiKey(event.target.value)
  }

  const handleClick = () => {
    // fetchRepos(apiKey).then((data) => {
    //   setData(data)
    // })
  }

  useEffect(() => {
    // make api call
  }, [])

  return (
    <div className="App">
      Enter Github API Key
      <input onChange={handleChange}></input>
      <button onChange={handleClick}></button>
    </div>
  );
}

export default App;
