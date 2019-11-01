import { Router } from 'express';
import { sessionRouter } from './session';
import { authRouter } from './auth';
import { proxyRouter } from './proxy';
import { authorize } from '../middleware';

const router = Router();
const authorizer = authorize({ redirectTo: '/oauth/procore/' });

router.use('/proxy', authorizer, proxyRouter);
router.use('/session', sessionRouter);
router.use('/oauth/procore', authRouter);
router.use(authorizer, (req, res, next) =>
  res.render('index', {
    accessToken: req.session.accessToken,
  })
);

export { router };
