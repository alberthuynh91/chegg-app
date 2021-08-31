import React from 'react'
import Issue from './Issue'

const Issues = (props) => {
  const { issues, setIssues } = props
  if (!issues) {
    return null
  }
  return (
    issues.length > 0 ? 
    issues.map((issue, index) => {
      const { id } = issue
      return (
        <Issue
          className="issues-container"
          key={id}
          index={index}
          issue={issue}
          issues={issues}
          setIssues={setIssues}
        />
      )}) 
      : 
      <div>No issues found for this repository</div>
  )
}

export default Issues