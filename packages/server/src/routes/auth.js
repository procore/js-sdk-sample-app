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
  const account = await token(
    {
      id: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET,
      uri: process.env.REDIRECT_URL,
      code: req.query.code,
    },
    process.env.PROCORE_SERVER
  );
  req.session.accessToken = account.access_token;
  req.session.refreshToken = account.refresh_token;
  const port =
    process.env.NODE_ENV === 'production' ? `:${process.env.PORT}` : '';
  const path = process.env.ROOT_PATH || '/';
  return res.redirect(`http://${process.env.HOSTNAME}${port}${path}`);
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
