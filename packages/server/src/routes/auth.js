import { Router } from 'express';
import { token, refresh, authorize, revoke, info } from '@procore/js-sdk';
import { oauthClientOptions } from '../clientOptions';

function setSession(req, result) {
  req.session.accessToken = result.access_token;
  req.session.refreshToken = result.refresh_token;
  req.session.expiresIn = result.expires_in;
  req.session.createdAt = result.created_at;
}

async function revokeAccessToken(req) {
  await revoke({
    token: req.session.accessToken,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  req.session = null;
}

export const authRouter = Router();

authRouter.get('/', (_req, res) => {
  return res.redirect(
    authorize({
      clientId: process.env.CLIENT_ID,
      uri: process.env.REDIRECT_URI
    },
    oauthClientOptions
    )
  );
});

authRouter.get('/info', async (req, res) => {
  const result = await info(req.session.accessToken);
  return res.json(result);
});

authRouter.get('/callback', async (req, res) => {
  const result = await token({
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    uri: process.env.REDIRECT_URI,
    code: req.query.code
  },
  oauthClientOptions
  );
  setSession(req, result);
  return res.redirect('/');
});

authRouter.get('/refresh', async (req, res) => {
  const result = await refresh({
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    uri: process.env.REDIRECT_URI,
    token: req.session.accessToken,
    refresh: req.session.refreshToken
  });
  setSession(req, result);
  return res.redirect('/');
});

authRouter.get('/revoke', async (req, res) => {
  await revokeAccessToken(req);
  return res.redirect(`/`);
});

authRouter.get('/signout', async (req, res) => {
  await revokeAccessToken(req);
  return res.redirect(`${process.env.OAUTH_URL}/account/logout`);
});
