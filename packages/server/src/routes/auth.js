import { Router } from 'express';
import { token, refresh, authorize } from '@procore/js-sdk';

export const authRouter = Router();

authRouter.get('/', (_req, res) => {
  return res.redirect(
    authorize(
      {
        clientId: process.env.CLIENT_ID,
        uri: process.env.REDIRECT_URL,
      },
      process.env.PROCORE_SERVER
    )
  );
});

authRouter.get('/callback', async (req, res) => {
  console.log({ callBackHeaders: req.headers });
  const account = await token(
    {
      id: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET,
      uri: process.env.REDIRECT_URL,
      code: req.query.code,
    },
    process.env.PROCORE_SERVER
  );
  console.log({ account });
  req.session.accessToken = account.access_token;
  req.session.refreshToken = account.refresh_token;
  let redirect = '/';
  const isLocalhost = Boolean(
    process.env.HOSTNAME === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      process.env.HOSTNAME === '[::1]' ||
      // 127.0.0.0/8 are considered localhost for IPv4.
      process.env.HOSTNAME.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  if (!isLocalhost) {
    const protocol = process.env.PROTOCOL || 'http';
    const host = process.env.HOSTNAME;
    const path = process.env.ROOT_PATH || '/';
    redirect = `${protocol}://${host}${path}`;
  }
  return res.redirect(redirect);
});

authRouter.post('/refresh', async (req, res) => {
  const account = await refresh(
    {
      id: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET,
      uri: process.env.REDIRECT_URL,
      token: req.session.accessToken,
      refresh: req.session.refreshToken,
    },
    process.env.PROCORE_SERVER
  );
  req.session.accessToken = account.access_token;
  req.session.refreshToken = account.refresh_token;
  res.json(account);
});
