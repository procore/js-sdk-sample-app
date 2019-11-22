import { Router } from 'express';
import { accountRouter } from './account';
import { authRouter } from './auth';
import { proxyRouter } from './proxy';
import { authProxyRouter } from './authProxy';
import { authorize } from '../middleware';

const router = Router();
const authorizer = authorize({ redirectTo: '/oauth/procore/' });

router.use('/authproxy', authProxyRouter);
router.use('/proxy', authorizer, proxyRouter);
router.use('/account', accountRouter);
router.use('/oauth/procore', authRouter);
router.use(authorizer, (req, res, next) =>
  res.render('index', {
    accessToken: req.session.accessToken,
  })
);

export { router };
