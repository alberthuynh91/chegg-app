import React from 'react'
import { getRepoName, getOwnerName } from '../utils'

const Repository = (props) => {
  const { apiKey, url, selectedRepo, setSelectedRepo, setIssues,  } = props
  const repo = getRepoName(url)
  const owner = getOwnerName(url)
  const isSelectedRepo = url === selectedRepo
  const className = isSelectedRepo ? `repository-item selected` : `repository-item`
  
  const handleClick = (payload) => {
    setSelectedRepo(url)
    const { owner, repo } = payload
    fetch(`/api/git/issues?repo=${repo}&owner=${owner}&apiKey=${apiKey}`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Not able to load issues for selected repository')
        }
      })
      .then(({ data }) => {
        setIssues(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  
  return (
    <div 
      className={className}
      onClick={() => { 
        handleClick({ owner, repo }) 
      }}
    >
        {repo}
    </div>
  )
}

export default Repository