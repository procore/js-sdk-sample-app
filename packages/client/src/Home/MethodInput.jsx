import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

export function MethodInput(props) {
  function onChange(event) {
    props.onChange(event.target.value);
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Method</FormLabel>
      <RadioGroup row aria-label="gender" name="method" value={props.value} onChange={onChange}>
        <FormControlLabel value="get" control={<Radio />} label="GET" />
        <FormControlLabel value="put" control={<Radio />} label="PUT" />
      </RadioGroup>
    </FormControl>
  );
}
