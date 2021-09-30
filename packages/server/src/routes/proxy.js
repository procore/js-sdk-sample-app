import { Router } from 'express';
import { client, oauth } from '@procore/js-sdk';

let pcorClient = undefined;
function getClient(accessToken, defaults) {
  if (pcorClient) {
    return pcorClient;
  }
  const authorizer = oauth(accessToken);
  const options = {
    apiHostname: process.env.BASE_URL
  };
  console.log(`defaults: ${defaults} options: ${options}`);
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

  try {
    const result = await procore[method.toLowerCase()]({
      base: `/${endpoint}`,
      version: version,
      qs: JSON.parse(JSON.stringify(req.query))
    });
    return res.json(result.body);
  } catch (error) {
    return res.json(error.body);
  }
});
