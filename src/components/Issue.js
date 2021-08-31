import React from 'react'
import { formatCreatedDate, formatUpdatedDate } from '../utils'

const Issue = (props) => {
  const { issue, issues, setIssues, index } = props
  const { title, user, created_at, updated_at } = issue
  const { avatar_url } = user
  const created = formatCreatedDate(created_at)
  const updated = formatUpdatedDate(updated_at)

  const handleUp = () => {
    const cpIssues = [...issues]
    const newIndex = index === 0 ? index : index - 1 
    cpIssues.splice(index, 1)
    cpIssues.splice(newIndex, 0, issue)
    setIssues(cpIssues)
  }

  const handleDown = () => {
    const cpIssues = [...issues]
    const newIndex = index === cpIssues.length - 1 ? index : index + 1
    cpIssues.splice(index, 1)
    cpIssues.splice(newIndex, 0, issue)
    setIssues(cpIssues)
  }

  return (
    <div className="issue-item" onClick={() => {}}>
      <div className="left">
        <div><img className="avatar" src={avatar_url}/></div>
        <div className="dates">Created: {created}</div>
        <div className="dates">Last Updated: {updated}</div>
      </div>
      <div className="right">
        <span className="title">{title}</span>
        <span className="btn-container">
          <button onClick={handleUp}>▲</button>
          <button onClick={handleDown}>▼</button>
        </span>
      </div>
    </div>
  )
}

export default Issue