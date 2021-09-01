import React from 'react'

const ErrorMsg = (props) => {
  const { message } = props
  return (
    message ? <div className="error-msg">{message.toString()}</div> : null
    
  )
}

export default ErrorMsg