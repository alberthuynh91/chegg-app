import React from 'react'
import Repository from './Repository'

const Repositories = (props) => {
  const { formData, repositories, setIssues, selectedRepo, setSelectedRepo } = props
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
    }) : null
  )
}

export default Repositories
