import React from 'react'
import Repository from './Repository'

const Repositories = (props) => {
  const { apiKey, repositories, setIssues, selectedRepo, setSelectedRepo } = props
  return (
    repositories?.length > 0 ? repositories?.map((item) => {
      return <Repository {...item} apiKey={apiKey} setIssues={setIssues} selectedRepo={selectedRepo} setSelectedRepo={setSelectedRepo} />
    }) : null
  )
}

export default Repositories
