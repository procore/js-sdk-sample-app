import React from 'react';
import { styled } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

const QueryParamInputContainer = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

const QueryParamTextField = styled(TextField)({
  flex: 1
});

function QueryParamBaseInput(props) {
  function onKeyChange(event) {
    props.onChange({
      key: event.target.value,
      value: props.value.value
    });
  }

  function onValueChange(event) {
    props.onChange({
      key: props.value.key,
      value: event.target.value
    });
  }

  return (
    <QueryParamInputContainer>
      <QueryParamTextField label="Key" value={props.value.key} onChange={onKeyChange} margin="dense" />
      <QueryParamTextField label="Value" value={props.value.value} onChange={onValueChange} margin="dense" />
      {props.children}
    </QueryParamInputContainer>
  );
}

function QueryParamInput(props) {
  return (
    <QueryParamBaseInput {...props}>
      <IconButton onClick={props.onDelete}>
        <DeleteIcon />
      </IconButton>
    </QueryParamBaseInput>
  );
}

function QueryParamInputAdder(props) {
  const [value, setValue] = React.useState({ key: '', value: '' });

  function onAdd() {
    props.onAdd(value);
    setValue({ key: '', value: '' });
  }

  return (
    <QueryParamBaseInput value={value} onChange={setValue}>
      <IconButton onClick={onAdd}>
        <AddIcon />
      </IconButton>
    </QueryParamBaseInput>
  );
}

export function QueryParamsInput(props) {
  function onChange(index) {
    return (value) => {
      const newValue = [...props.value.slice(0, index), value, ...props.value.slice(index + 1)];
      props.onChange(newValue);
    };
  }

  function onAdd(newValue) {
    props.onChange([...props.value, newValue]);
  }

  function onDelete(index) {
    return () => {
      const newValue = props.value.slice(0, index).concat(props.value.slice(index + 1));

      props.onChange(newValue);
    };
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Query Params</FormLabel>
      {props.value.map((value, index) => (
        <QueryParamInput
          value={value}
          onChange={onChange(index)}
          onDelete={onDelete(index)}
          showDeleteButton={index !== 0}
          key={index}
        />
      ))}
      <QueryParamInputAdder onAdd={onAdd} />
    </FormControl>
  );
}
