import { Router } from 'express';
import { token, refresh, authorize, revoke } from '@procore/js-sdk';

export const authRouter = Router();

authRouter.get('/', (_req, res) => {
  return res.redirect(
    authorize({
      clientId: process.env.CLIENT_ID,
      uri: process.env.REDIRECT_URI,
    })
  );
});

authRouter.get('/callback', async (req, res) => {
  const result = await token({
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    uri: process.env.REDIRECT_URI,
    code: req.query.code,
  });
  req.session.accessToken = result.access_token;
  req.session.refreshToken = result.refresh_token;
  req.session.expiresIn = result.expires_in;
  return res.redirect('/');
});

authRouter.get('/refresh', async (req, res) => {
  const result = await refresh({
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    uri: process.env.REDIRECT_URI,
    token: req.session.accessToken,
    refresh: req.session.refreshToken,
  });
  req.session.accessToken = result.access_token;
  req.session.refreshToken = result.refresh_token;
  req.session.expiresIn = result.expires_in;
  return res.redirect('/');
});

authRouter.get('/revoke', async (req, res) => {
  const result = await revoke({
    token: req.session.accessToken,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  req.session = null;
  return res.redirect(`/`);
});

authRouter.get('/signout', async (req, res) => {
  const result = await revoke({
    token: req.session.accessToken,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  req.session = null;
  return res.redirect(`${process.env.OAUTH_URL}/logout`);
});
