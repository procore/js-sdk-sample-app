import React from 'react';
import { styled } from '@material-ui/core/styles';
import Inspector from 'react-inspector';
import axios from 'axios';

import { AppBar } from '../AppBar';
import { TokenInfo } from './TokenInfo';
import { Form } from './Form';

function hashFromTuples(tuples) {
  return tuples.reduce((acc, tuple) => {
    acc[tuple.key] = tuple.value;
    return acc;
  }, {});
}

function getVersion(version) {
  const [, restVersion = undefined] = version.match(/(^v[1-9]\d*\.\d+$)/) || [];
  const [, vapidVersion = undefined] = version.match(/(^vapid)\/?$/) || [];

  if (restVersion) {
    return `rest/${restVersion}`;
  } else if (vapidVersion) {
    return vapidVersion;
  } else {
    throw new Error(`'${version}' is an invalid Procore API version`);
  }
}

function getEndpoint(endpoint) {
  const [, ep = undefined] = endpoint.match(/^[\/]{0,1}(.*?)[\/]{0,1}$/) || [];
  return ep;
}

async function sendRequest({ endpoint, method, qs, version }) {
  try {
    const response = await axios[method](`/proxy/${getVersion(version)}/${getEndpoint(endpoint)}`, {
      params: hashFromTuples(qs)
    });

    return response.data;
  } catch (err) {
    alert(err);
  }
}

const HomeContainer = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column'
});

const InspectorContainer = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  maxWidth: '90vw',
  width: '100%',
  marginTop: theme.spacing(3)
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
      <TokenInfo />
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
