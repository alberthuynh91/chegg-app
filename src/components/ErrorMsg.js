import React from 'react'

const ErrorMsg = (props) => {
  console.log(`what is props in error?: `, props)
  const { message } = props
  return (
    message ? <div className="error-msg">{message.toString()}</div> : null
    
  )
}

export default ErrorMsg