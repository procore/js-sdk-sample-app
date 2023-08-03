import { Router } from 'express';
import { client, oauth } from '@procore/js-sdk';
import { clientOptions } from '../clientOptions';
const fs = require('fs');
var FormData = require('form-data');

let pcorClient = undefined;
function getClient(accessToken, defaults) {
  if (pcorClient) {
    return pcorClient;
  }
  const authorizer = oauth(accessToken);
  return client(authorizer, defaults, clientOptions);
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
  endpoint = 'schedule_integration';

  var inner = {
    file: fs.createReadStream('/Users/vfeshchenko/temp/abcd.xml'),
    options: {
      filename: 'abcd.xml',
      contentType: 'multipart/form-data',
      'Content-Type': 'multipart/form-data'
    }
  };
  const formData = new FormData();
  formData.append('schedule_integration', JSON.stringify(inner));

  req.query = {
    'project_id': 1884702,
    'schedule_integration[file]': fs.createReadStream('/Users/vfeshchenko/temp/abcd.xml')
    // 'schedule_integration': inner
  };
  
  try {
    const result = await procore[method.toLowerCase()]({
      base: `/${endpoint}`,
      version: version,
      qs: JSON.parse(JSON.stringify(req.query))
    },
    {},
    // { 'schedule_integration[file]': fs.createReadStream('/Users/vfeshchenko/temp/abcd.xml')
    // { schedule_integration: {
        // file: fs.createReadStream('/Users/vfeshchenko/temp/abcd.xml')
      // }
    // },
    {
      headers: {
        'content-type': 'multipart/form-data',
        'test-header': 'is_passed?'
      }
    }
    );
    return res.json(result.body);
  } catch (error) {
    return res.json(error.body);
  }
});
