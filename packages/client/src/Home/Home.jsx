import React from 'react';
import { styled } from '@material-ui/core/styles';
import Inspector from 'react-inspector';

import { AppBar } from '../AppBar';
import { httpClient } from '../httpClient';
import { Form } from './Form';

function hashFromTuples(tuples) {
  return tuples.reduce((acc, tuple) => {
    acc[tuple.key] = tuple.value;
    return acc;
  }, {});
}

async function sendRequest({endpoint, method, qs, version}) {
  const response = await httpClient[method]({
    base: `${endpoint}`,
    qs: hashFromTuples(qs),
    params: {},
    apiVersion: version,
  });

  return response.body;
}

const HomeContainer = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

const InspectorContainer = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  maxWidth: '90vw',
  width: '100%',
  marginTop: theme.spacing(3),
}));

function Home() {
  const [response, setResponse] = React.useState(null);

  async function onSubmit(data) {
    const response = await sendRequest(data);
    setResponse(response);
  }

  return (
    <HomeContainer>
      <AppBar />
      <Form onSubmit={onSubmit} />
      {response && (
        <InspectorContainer>
          <Inspector data={response} />
        </InspectorContainer>
      )}
    </HomeContainer>
  );
}

export default Home;
