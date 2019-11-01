import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { EndpointInput } from './EndpointInput';
import { MethodInput } from './MethodInput';
import { QueryParamsInput } from './QueryParamsInput';

const FormContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignSelf: 'center',
  maxWidth: '800px',
  '& > *': {
    marginTop: theme.spacing(2),
  },
}));

export function Form(props) {
  const [endpoint, setEndpoint] = React.useState('/vapid/me');
  const [method, setMethod] = React.useState('get');
  const [qs, setQs] = React.useState([]);

  function onSubmit(event) {
    event.preventDefault();
    props.onSubmit({
      endpoint,
      method,
      qs,
    });
  }

  return (
    <FormContainer noValidate autoComplete="off" onSubmit={onSubmit}>
      <MethodInput value={method} onChange={setMethod} />
      <EndpointInput value={endpoint} onChange={setEndpoint} />
      <QueryParamsInput value={qs} onChange={setQs} />
      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </FormContainer>
  );
}
