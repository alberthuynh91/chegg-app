import React from 'react'
import ErrorMsg from './ErrorMsg'

const Form = (props) => {
  const { error, formData, setFormData, handleSubmit = () => {}, handleClear = () => {} } = props
  const { apiKey } = formData

  const handleChange = (event, formKey) => {
    setFormData({ ...formData, [formKey]: event.target.value })
  }
  
  return (
    <div className="form-container">
      <form>
        <label>
          Enter Github API Key
          <input type="text" value={apiKey} onChange={(event) => handleChange(event, 'apiKey')}></input>
        </label>
      </form>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleClear}>Clear</button>
      <ErrorMsg message={error} />
    </div>
  )
}

export default Form