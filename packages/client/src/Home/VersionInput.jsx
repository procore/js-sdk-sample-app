import React from 'react';
import TextField from '@material-ui/core/TextField';

export function VersionInput(props) {
  function onChange(event) {
    props.onChange(event.target.value);
  }

  return (
    <TextField
      value={props.value}
      onChange={onChange}
      label="API version"
      helperText="API version is optional parameter"
      variant="filled"
      fullWidth
    />
  );
}
