import { oauth, client, refresher } from '@procore/js-sdk';

const refreshToken = () => fetch('/oauth/procore/refresh', { method: 'POST' });

const authorizer = oauth(
  document.head.querySelector('[name=accessToken]').getAttribute('content')
);

export const httpClient = client(
  refresher(authorizer, refreshToken),
  {},
  { apiHostname: '/proxy', defaultVersion: 'v1.0' }
);
