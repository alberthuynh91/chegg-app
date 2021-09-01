import React from 'react'
import Repository from './Repository'

const Repositories = (props) => {
  const { formData, repositories, setIssues, selectedRepo, setSelectedRepo } = props
  if (repositories === undefined) {
    return null
  }
  return (
    repositories?.length > 0 ? repositories?.map((item) => {
      return (
        <Repository
          key={item.id}
          {...item}
          formData={formData}
          setIssues={setIssues}
          selectedRepo={selectedRepo}
          setSelectedRepo={setSelectedRepo}
        />
      )
    }) : <div>No repositories found</div>
  )
}

export default Repositories
