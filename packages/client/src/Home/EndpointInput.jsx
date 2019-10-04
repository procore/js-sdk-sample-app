import React from 'react';
import TextField from '@material-ui/core/TextField';

export function EndpointInput(props) {
  function onChange(event) {
    props.onChange(event.target.value);
  }

  return (
    <TextField
      value={props.value}
      onChange={onChange}
      label="Endpoint"
      variant="filled"
      fullWidth
    />
  );
}
