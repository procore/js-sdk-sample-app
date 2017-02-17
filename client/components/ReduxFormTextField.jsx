import React from 'react'
import TextField from 'material-ui/TextField'

const ReduxFormTextField = ({ hintText, fullWidth, input, meta }) => {
  return (
    <TextField
      hintText={hintText}
      value={input.value}
      fullWidth
      onChange={(event, value) => input.onChange(value)}
    />
  )
}

export default ReduxFormTextField
