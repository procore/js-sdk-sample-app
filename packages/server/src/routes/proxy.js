import { Router } from 'express';
import { client, oauth } from '@procore/js-sdk';

let pcorClient = undefined;
function getClient(accessToken, defaults, options) {
  if (pcorClient) {
    return pcorClient;
  }
  const authorizer = oauth(accessToken);
  return client(authorizer, defaults, options);
}

export const proxyRouter = Router();

proxyRouter.all('*', async (req, res) => {
  const procore = getClient(req.session.accessToken);

  const method = req.method;
  const path = req.path.slice(1).split('/');
  let [version] = [...path];
  let endpoint = [...path].slice(1);
  if (version === 'rest') {
    [, version] = [...path];
    endpoint = [...path].slice(2);
  }
  [endpoint] = endpoint.join('/').split('?');

  const result = await procore[method.toLowerCase()]({
    base: `/${endpoint}`,
    version: version,
    params: JSON.parse(JSON.stringify(req.query))
  });
  return res.json(result.body);
});
