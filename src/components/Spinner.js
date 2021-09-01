import React from 'react'
import spinner from './images/spinner.gif'

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={spinner} width="100px" alt="spinner icon" />
    </div>
  )
}

export default Spinner