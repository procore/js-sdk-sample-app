import { Router } from 'express';
import { authRouter } from './auth';
import { proxyRouter } from './proxy';
import { authorize } from '../middleware';

const router = Router();
const authorizer = authorize({ redirectTo: '/oauth/procore/' });

router.use('/proxy', proxyRouter);
router.use('/oauth/procore', authRouter);
router.use(authorizer, (req, res, next) => {
  const loginUrl = authorize({
    clientId: process.env.CLIENT_ID,
    uri: process.env.REDIRECT_URI,
  }, {
    apiHostname: process.env.OAUTH_URL
  });

  const main = {
    authenticated: !!req.session.accessToken,
    login: {
      url: loginUrl
    }
  };

  if (main.authenticated) {
    const createdAt = new Date(req.session.createdAt * 1000);
    const expireAt = new Date(createdAt.getTime() + (req.session.expiresIn * 1000));
    main.tokenInfo = {
      accessToken: req.session.accessToken.replace(/^([\w\W]{4}).*([\w\W]{4})$/i, '$1...$2'),
      expiresAt: expireAt.toISOString().slice(0, -5) + "Z",
      expiresIn: req.session.expiresIn,
      refreshToken: req.session.refreshToken.replace(/^([\w\W]{4}).*([\w\W]{4})$/i, '$1...$2')
    };
  }

  return res.render('index', main);
});

export { router };
