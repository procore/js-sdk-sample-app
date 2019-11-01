import { Router } from 'express';

export const accountRouter = Router();

accountRouter.get('/logout', function logoutSession(req, res) {
  req.session = null;
  res.redirect('/oauth/procore/');
});
