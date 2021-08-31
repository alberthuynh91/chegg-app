import React from 'react'
import { getRepoName, getOwnerName } from '../utils'

const Repository = (props) => {
  
  const { apiKey, url, selectedRepo, setSelectedRepo, setIssues } = props
  const repo = getRepoName(url)
  const owner = getOwnerName(url)
  const isSelectedRepo = url === selectedRepo

  const handleClick = (payload) => {
    const { owner, repo } = payload
    console.log(`what is payload: `, payload)
    fetch(`/api/git/issues?repo=${repo}&owner=${owner}&apiKey=${apiKey}`)
      .then(response => response.json())
      .then(({ data }) => {
        console.log(`got issues data: `, data)
        setIssues(data)
      });
    // setSelectedRepo(url)
  }
  
  return (
    <div 
      className="repository-item"
      onClick={() => { 
        handleClick({ owner, repo }) 
      }}
    >
        {repo}
    </div>
  )
}

export default Repository